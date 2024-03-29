import mongoose from 'mongoose';

const {Schema, ObjectId} = mongoose;

const studentSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    studentId:{
        type:String,
        trim:true,
        required: true,
        unique: true
    },
    email:{
        type:String,
        trim:true,
        required: true,
        unique: true
    },
    specialization:{
        type: String,
        trim: true,
        required: true
    },
    faculty:{
        type: String,
        trim: true,
        required: true
    },
    contactNumber:{
        type: String,
        trim: true,
        required: true
    },
    researchGroup:{
        type: ObjectId,
        ref: "ResearchGroup"
    },
    image:{
        url : String,
        public_id : String
    },
    login : {type: ObjectId,ref : "Login"},

},{timestamps:true});

export default mongoose.model('Student',studentSchema);