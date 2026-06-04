import * as pdfParse from "pdf-parse";
import { generateInterviewReport } from "../services/ai.service.js";
import {interviewReportModel} from "../models/interviewReport.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const generateInterviewReportController = async (req, res) => {
  console.log(req.file);
  console.log(req.body);

  const parsedPdf = await (
  new pdfParse.PDFParse(
    Uint8Array.from(req.file.buffer)
  )
).getText();

const resumeContent = parsedPdf.text;
const { selfDescription, jobDescription } = req.body;

const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent,
    selfDescription,
    jobDescription,
});

const user=req.user;

const interviewReport = await interviewReportModel.create({
      user:req.user.id,
      resume:resumeContent,
      selfDescription,
      jobDescription,
      ...interviewReportByAi
})

console.log(interviewReport);


return res.status(200).json(
      new ApiResponse(
        200,
        user,
        "Interview report generated successfully"
    )
  );
};

export { generateInterviewReportController };

