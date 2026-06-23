 /* eslint-disable no-unused-vars */
import { generateInterviewReport, generateInterviewReportById ,getAllInterviewReports} from "../services/interview.services";
import { useContext,useEffect } from "react";
import { useParams } from "react-router";
import { InterviewContext } from "../interview.context";


export const useInterview = () => {
   const context = useContext(InterviewContext);
    const { interviewId } = useParams();

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

        const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
         let response = null
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            setReport(response.interviewReport)
          } catch (error) {
             console.log(error)
          } finally {
            setLoading(false)
          }
        //   console.log("response =", response);
          return response.interviewReport
        }

        const getReportById = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let response = null
        try {
            response = await generateInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return response.interviewReport
        }
         
        const generateReports = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let response = null
        try {
            response = await generateInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return response.interviewReport
        }

        const getReports = async () => {
        setLoading(true)
        let response = null
        try {
            response = await getAllInterviewReports()
            setReports(response.interviewReports)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

        return response.interviewReports
        }

        return {loading,report,reports,generateReport,getReportById,getReports};
};