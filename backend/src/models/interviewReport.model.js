import mongoose from "mongoose";
import { User } from "./user.model.js";

/**
 * - Job description schema
 * - resume text
 * - self description
 * - techinical question []
 * - skill gaps ; [{
 *  skill:"",
 *  level:{
 *     type :string,
 *     enum:[low,medium,high
 * ]}
 * }]
 * - preparation plan ; [{
 *   day:Number
 *   focus:String,
 * tasks:[String]
 * }]
 */
const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical question is required"],
    },

    intention: {
      type: String,
      required: [true, "Intention is required"],
    },

    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  {
    _id: false,
  },
);

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  {
    _id: false,
  },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },

    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is required"],
    },
  },
  {
    _id: false,
  },
);

const preparationPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, "Day is required"],
  },

  focus: {
    // topic of that day
    type: String,
    required: [true, "Focus is required"],
  },

  tasks: [
    {
      type: String,
      required: [true, "Task is required"],
    },
  ],
});

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "Job description required "],
    },
    resume: {
      type: String,
      required: [true, "Resume is required"],
    },
    selfDescription: {
      type: String,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuestion: [technicalQuestionSchema],
    behavioralQuestion: [behavioralQuestionSchema],
    skillGap: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const  interviewReportModel = mongoose.model(
  "interviewReportModel",
  interviewReportSchema,
);

export {interviewReportModel};
