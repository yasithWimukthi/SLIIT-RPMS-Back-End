import mongoose from 'mongoose';


const templateSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    type:{
        type: String,
        trim: true,
        required: true
    },
    file:{
        type: String,
        trim: true,
        required: true
    },
},{timestamps:true});

export default mongoose.model('Template',templateSchema);