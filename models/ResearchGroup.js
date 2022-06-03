import mongoose from 'mongoose'

const { Schema } = mongoose

const researchGroupSchema = new Schema(
    {
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
            },
        ],
        cosupervisor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AcademicStaff',
        },
        supervisor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AcademicStaff',
        },
        panelMembers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'AcademicStaff',
            },
        ],
        groupName: {
            type: String,
            trim: true,
            required: true,
        },
        topic: {
            type: String,
            trim: true,
            required: true,
        },
        topicDescription: {
            type: String,
            trim: true,
            required: true,
        },
        topicState: {
            type: String,
            trim: true,
            required: true,
        },
        memberWorks:[{
            type: String,
            trim:true
        }],
    },
    { timestamps: true }
)

export default mongoose.model('ResearchGroup', researchGroupSchema)