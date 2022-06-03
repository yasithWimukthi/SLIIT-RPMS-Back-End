import mongoose from 'mongoose';

const {Schema, ObjectId} = mongoose;

const loginSchema = new Schema({
    type:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type:String,
        trim:true,
        required: true,
        unique: true
    },
    password:{
        type:String,
        trim:true,
    },
    student : {type: ObjectId,ref : "Student"},
    academicStaff : {type: ObjectId,ref : "AcademicStaff"},
},{timestamps:true});

export default mongoose.model('Login',loginSchema);