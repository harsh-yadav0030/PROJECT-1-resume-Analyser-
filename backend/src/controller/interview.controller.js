import * as pdfParse from "pdf-parse";
import { generateInterviewReport } from "../services/ai.service.js";
import { interviewReportModel } from "../models/interviewReport.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const generateInterviewReportController = async (req, res) => {
  const parsedPdf = await new pdfParse.PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();

  const resumeContent = parsedPdf.text;
  const { selfDescription, jobDescription } = req.body;

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent,
    selfDescription,
    jobDescription,
  });

  const user = req.user;
  console.log(interviewReportByAi);

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent,
    selfDescription,
    jobDescription,
    ...interviewReportByAi,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, user, "Interview report generated successfully"),
    );
};

const getInterviewReportByIdController = async (req, res) => {
  const   {interviewId} = req.params;
  const interviewReport = await interviewReportModel.findOne({_id:interviewId,user:req.user._id});
  if(!interviewReport){
  throw new ApiError(401,"Interview Report Not found ");
 }


 res.status(200).json({
     message:"interview report fetched successfully"
     ,
     interviewReport
 })

};

const getAllInterviewReportsController = async ( req , res ) => {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}

export { generateInterviewReportController,getInterviewReportByIdController, getAllInterviewReportsController};
