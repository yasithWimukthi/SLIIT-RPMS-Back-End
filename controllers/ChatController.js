import mongoose from "mongoose";
import GroupChat from "../models/GroupChat.js";
import ResearchGroup from "../models/ResearchGroup.js";
import SupervisorRequest from "../models/SupervisorRequest.js";

export const addMessage = async (req, res, next) => {
  const { groupId, senderId, senderName, message } = req.body;

  try {
    const group = await GroupChat.findOneAndUpdate(
      { groupId },
      {
        $push: {
          messages: {
            senderId: mongoose.Types.ObjectId(senderId),
            senderName,
            message,
            date: new Date().getTime(),
          },
        },
      }
    ).exec();

    res.status(200).json({
      message: "Message Sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Send Failed",
      error,
    });
  }
};

export const getGroupMessages = async (req, res, next) => {
  const { groupId } = req.body;

  try {
    const groupChat = await GroupChat.find(
      { groupId },
      { messages: true, _id: false }
    ).exec();

    res.status(200).json({
      messages: groupChat,
    });
  } catch (error) {
    res.status(500).json({
      message: "Send Failed",
      error,
    });
  }
};

export const getSupervisorMessages = async (req, res, next) => {
  const { supervisorId } = req.body;

  try {
    const groups = await SupervisorRequest.find(
      { supervisorId: mongoose.Types.ObjectId(supervisorId) },
      { _id: false, groupId: true }
    );

    const groupIds = groups.map((group) => group.groupId);

    const groupChat = await GroupChat.find(
      { groupId: { $in: groupIds } },
      { messages: true, _id: false }
    ).exec();

    const data = groupChat.map((chat,index)=>({...chat._doc,groupId:groupIds[index]}))
    res.status(200).json({
      messages: data
    });
  } catch (error) {
    res.status(500).json({
      message: " Failed",
      error,
    });
  }
};
