import mongoose from 'mongoose';

const {Schema} = mongoose;

const CoSupervisorRequestSchema = new Schema({
    groupId:        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ResearchGroup"
    },
    coSupervisorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicStaff"
    },
    topic:{
        type:String,
        trim:true,
        required: true,
    },
    domain:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        trim: true,
        required: true
    },
    status:{
        type: String,
        trim: true,
    }

},{timestamps:true});

export default mongoose.model('CoSupervisorRequest',CoSupervisorRequestSchema);