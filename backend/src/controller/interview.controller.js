import { PDFParse } from 'pdf-parse';
import { generateInterviewReport } from "../services/ai.service.js";
import {interviewReportModel} from "../models/interviewReport.model.js"

const generateInterviewReportController = async (req, res) => {
  const resumeFile = req.file;

  const pdfData = await pdfParse(resumeFile.buffer);
  const resumeContent = pdfData.text;

  const { selfDescription, jobDescription } = req.body;

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent,
    selfDescription,
    jobDescription,
  });

  const interviewReportSchema = await interviewReportModel.create({
      user:req.user.id,
      resume:resumeContent,
      selfDescription,
      jobDescription,
      ...interviewReportByAi
  })
   
  return res.status(200).json(
      new ApiResponse(
        200,
        user,
        "Interview report generated successfully"
      )
    );
};

export { generateInterviewReportController };

