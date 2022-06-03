import mongoose from "mongoose";

const { Schema } = mongoose;

const GroupChatSchema = new Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ResearchGroup",
    },
    messages: [
      {
        senderId: {
          type: mongoose.Schema.Types.ObjectId,
          required:true
        },
        senderName: {
          type: String,
          trim: true,
          required: true,
        },
        message: {
          type: String,
          trim: true,
          required: true,
        },
        date: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("GroupChat", GroupChatSchema);
