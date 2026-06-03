import {Router} from "express";
import  {authMiddleware}  from "../middlewares/auth.middleware.js";
import {generateInterviewReportController} from "../controller/interview.controller.js";
const interviewRouter=new Router();

/**
 *  @route POST /api/interview
 * @generate new interview resume on the basis of user selfdescription , resume pdf and job description
 * @access Private
 */

interviewRouter.post('/',authMiddleware,generateInterviewReportController);


export default interviewRouter;