import mongoose from 'mongoose';

const {Schema} = mongoose;

const submissionSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type:String,
        trim:true,
        required: true,
        unique: true
    },
    deadlineDate:{
        type: String,
        trim: true,
        required: true
    },
    deadlineTime:{
        type:String,
        trim:true,
        required: true,
    }

},{timestamps:true});

export default mongoose.model('Submission',submissionSchema);