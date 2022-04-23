import mongoose from 'mongoose';

const {Schema} = mongoose;

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
    password:{
        type:String,
        trim:true,
        min:6,
        max:64
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
    image:{
        url : String,
        public_id : String
    },

},{timestamps:true});

export default mongoose.model('Student',studentSchema);