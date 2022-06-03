import SupervisorRequest from "../models/SupervisorRequest.js";
import CoSupervisorRequest from "../models/CoSuervisorRequest.js";
import mongoose from "mongoose";
import Submission from "../models/Submission.js";


export const supervisorRequestAccept = async (req, res, next) => {
  const { requestId } = req.body;

  try {
    const request = await SupervisorRequest.findById(requestId);
    request.status = "Accepted";
    await request.save();
    res.status(201).json({
      message: "Request accepted successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error accepting request",
      error,
    });
    next(error);
  }
};

export const coSupervisorRequestAccept = async (req, res, next) => {
  const { requestId } = req.body;

  try {
    const request = await CoSupervisorRequest.findById(requestId);
    request.status = "Accepted";
    await request.save();
    res.status(201).json({
      message: "Request accepted successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error accepting request",
      error,
    });
    next(error);
  }
};

export const supervisorRequestDecline = async (req, res, next) => {
  const { requestId } = req.body;

  try {
    const request = await SupervisorRequest.findById(requestId);
    request.status = "Declined";
    await request.save();
    res.status(201).json({
      message: "Request declined successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error declining request",
      error,
    });
    next(error);
  }
};

export const coSupervisorRequestDecline = async (req, res, next) => {
  const { requestId } = req.body;

  try {
    const request = await CoSupervisorRequest.findById(requestId);
    request.status = "Declined";
    await request.save();
    res.status(201).json({
      message: "Request declined successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error declining request",
      error,
    });
    next(error);
  }
};

export const getSupervisorRequestsOfSupervisor = async (req, res, next) => {
  const { supervisorId } = req.body;

  try {
    const requests = await SupervisorRequest.find({
      supervisorId: mongoose.Types.ObjectId(supervisorId),
    })
      .populate("groupId")
      .exec();
    res.status(201).json({
      message: "Requests fetched successfully",
      requests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching requests",
      error,
    });
  }
};

export const getAllSupervisorRequests = async (req, res, next) => {
    try {
        const requests = await SupervisorRequest.find({}).populate(
            'supervisorId'
        )
        res.status(201).json({
            message: 'Requests fetched successfully',
            requests,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching requests',
            error,
        })
        next(error)
    }
}

export const getAllCoSupervisorRequests = async (req, res, next) => {
    try {
        const requests = await CoSupervisorRequest.find({}).populate(
            'coSupervisorId'
        )
        res.status(201).json({
            message: 'Requests fetched successfully',
            requests,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching requests',
            error,
        })
        next(error)
    }
}
  // try {
  //   const requests = await SupervisorRequest.find({}).exec();
  //   res.status(201).json({
  //     message: "Requests fetched successfully",
  //     requests,
  //   });
  // } catch (error) {
  //   res.status(500).json({
  //     message: "Error fetching requests",
  //     error,
  //   });
  //   next(error);
  // }
// };

// export const getAllCoSupervisorRequests = async (req, res, next) => {
//   try {
//     const requests = await CoSupervisorRequest.find({}).exec();
//     res.status(201).json({
//       message: "Requests fetched successfully",
//       requests,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching requests",
//       error,
//     });
//     next(error);
//   }
// };

export const getAllCoSupervisorRequestsOfCosupervisor = async (
  req,
  res,
  next
) => {
  const { coSupervisorId } = req.body;

  try {
    const requests = await CoSupervisorRequest.find({
      coSupervisorId,
    })
      .populate("groupId")
      .exec();
    res.status(201).json({
      message: "Requests fetched successfully",
      requests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching requests",
      error,
    });
    next(error);
  }
};

export const getPresentations = async (req, res, next) => {
  const { id } = req.body;

  try {
    const submissions = await Submission.aggregate([
      { $match: { type: "Presentation" } },
      {
        $match: {
          $or: [{ "submissions.Panelmembers._id": id }],
        },
      },
    ]).exec();
    res.status(201).json({
      submissions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching requests",
      error,
    });
  }
};

export const setMarks = async (req, res, next) => {
  const {  groupSubmissonId, grade } = req.body;

  try {
    const submissions = await Submission.updateOne(
      {
        "submissions._id": mongoose.Types.ObjectId(groupSubmissonId) 
      },{
        $set:{'submissions.$.grade':grade}
      }
    ).exec();
    res.status(201).json({
      submissions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching requests",
      error,
    });
  }
};

export const getDocumetSubmissions = async (req, res, next) => {
  const { id } = req.body;

  try {
    const submissions = await Submission.aggregate([
      { $match: { type: "Document" } },
      {
        $match: {
          $or: [
            { "submissions.supervisorID": mongoose.Types.ObjectId(id) },
            { "submissions.CosupervisorID": mongoose.Types.ObjectId(id) },
          ],
        },
      },
    ]).exec();
    res.status(201).json({
      submissions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching requests",
      error,
    });
  }
};
