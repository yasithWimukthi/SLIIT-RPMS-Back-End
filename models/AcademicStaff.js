import mongoose from 'mongoose';

const {Schema} = mongoose;

const academicStaffSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    academicStaffId:{
        type:String,
        trim:true,
        required: true,
        unique: true
    },
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

export default mongoose.model('AcademicStaff',academicStaffSchema);