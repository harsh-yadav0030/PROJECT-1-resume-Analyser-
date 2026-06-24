import {Router} from "express";
import  {authMiddleware}  from "../middlewares/auth.middleware.js";
import {generateInterviewReportController,getInterviewReportByIdController,generateResumePdfController,getAllInterviewReportsController} from "../controller/interview.controller.js";
import {upload} from "../middlewares/file.middleware.js";
import { reportLimit } from "../middlewares/reportLimit.js";
import { pdfLimitMiddleware } from "../middlewares/pdfratelimit.js";

const interviewRouter=new Router();

/**
 *  @route POST /api/interview
 * @generate new interview resume on the basis of user selfdescription , resume pdf and job description
 * @access Private
 */
interviewRouter.post('/',authMiddleware,reportLimit, upload.single("resume"),generateInterviewReportController);

/**
 *  @route POST /api/interview/report/:interviewId
 * @generate get interview report by interview id 
 * @access Private
 */
interviewRouter.get("/report/:interviewId",authMiddleware,getInterviewReportByIdController);

/**
 *  @route POST /api/interview/report/:interviewId
 * @generate get all interview report 
 * @access Private
 */

interviewRouter.get("/", authMiddleware,getAllInterviewReportsController)


/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId",authMiddleware,pdfLimitMiddleware,generateResumePdfController)

export default interviewRouter;