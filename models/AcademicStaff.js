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
    designation:{
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
    supervisorRequests:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SupervisorRequest"
        }
    ],
    coSupervisorRequests:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SupervisorRequest"
        }
    ],

},{timestamps:true});

export default mongoose.model('AcademicStaff',academicStaffSchema);