import mongoose from "mongoose";

const { Schema } = mongoose;

const submissionSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      trim: true,
      required: true,
    },
    deadlineDate: {
      type: String,
      trim: true,
      required: true,
    },
    deadlineTime: {
      type: String,
      trim: true,
      required: true,
    },
    wordLimit: {
      type: String,
      trim: true,
      required: false,
    },
    maxNofFiles: {
      type: String,
      trim: true,
      required: true,
    },
    maxSubmissionSize: {
      type: String,
      trim: true,
      required: true,
    },
    acceptedFileTypes: [
      {
        type: String,
        trim: true,
        required: true,
      },
    ],
    markingScheme: {
      type: String,
      trim: true,
      required: true,
    },
    submissions: [
      {
        groupID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ResearchGroup",
        },
        submittedDate: {
          type: String,
          trim: true,
          required: true,
        },
        documents: [
          {
            name: {
              type: String,
              trim: true,
              required: true,
            },
            file: {
              type: String,
              trim: true,
              required: true,
            },
          },
        ],
        grade: {
          type: String,
          trim: true,
          required: true,
        },
        note: {
          type: String,
          trim: true,
          required: true,
        },
        supervisorID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "AcademicStaff",
        },
        CosupervisorID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "AcademicStaff",
        },
        Panelmembers: [],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);
