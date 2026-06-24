import * as pdfParse from "pdf-parse";
import {generateInterviewReport,generateResumePdf} from "../services/ai.service.js";
import { interviewReportModel } from "../models/interviewReport.model.js";
import { ApiError } from "../utils/ApiError.js";

const generateInterviewReportController = async (req, res) => {
  let resumeContent = "";
  if(req.file){
     const parsedPdf = await new pdfParse.PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();
      resumeContent = parsedPdf.text;
  }

  const { selfDescription, jobDescription } = req.body;

const interviewReportByAi = await generateInterviewReport({
  resume: resumeContent,
  selfDescription,
  jobDescription,
});

const interviewReport = await interviewReportModel.create({
  user: req.user.id,
  resume: resumeContent,
  selfDescription,
  jobDescription,
  ...interviewReportByAi,
});

const user = req.user;
user.reportGenerationCount++;
await user.save();

return res.status(200).json({
  message: "Interview report generated successfully.",
  interviewReport,
});
};

const getInterviewReportByIdController = async (req, res) => {
  const { interviewId } = req.params;
  const interviewReport = await interviewReportModel.findOne({
    _id: interviewId,
    user: req.user._id,
  });
  if (!interviewReport) {
    throw new ApiError(401, "Interview Report Not found ");
  }

  res.status(200).json({
    message: "interview report fetched successfully",
    interviewReport,
  });
};

const getAllInterviewReportsController = async (req, res) => {
  const interviewReports = await interviewReportModel
    .find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
    );

  res.status(200).json({
    message: "Interview reports fetched successfully.",
    interviewReports,
  });
};

const generateResumePdfController = async (req, res) => {
  const { interviewReportId } = req.params;

//verify that the report is of current user or someone else so that  any person can't download any one person file
const interviewReport =await interviewReportModel.findOne({
        _id: interviewReportId,
        user: req.user._id
});

if (!interviewReport) {
  return res.status(404).json({
    message: "Interview report not found.",
  });
}

const { resume, jobDescription, selfDescription } = interviewReport;
const pdfBuffer = await generateResumePdf({
  resume,
  jobDescription,
  selfDescription,
});

  req.user.pdfGenerationCount++;
  await req.user.save();

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
  });

  res.send(pdfBuffer);
};

export {
  generateInterviewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController,
};
