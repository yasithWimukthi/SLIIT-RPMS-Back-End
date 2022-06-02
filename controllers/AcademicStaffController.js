import SupervisorRequest from '../models/SupervisorRequest.js'
import CoSupervisorRequest from '../models/CoSuervisorRequest.js'
import mongoose from 'mongoose'

export const supervisorRequestAccept = async (req, res, next) => {
    const { requestId } = req.body

    try {
        const request = await SupervisorRequest.findById(requestId)
        request.status = 'Accepted'
        await request.save()
        res.status(201).json({
            message: 'Request accepted successfully',
            request,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error accepting request',
            error,
        })
        next(error)
    }
}

export const coSupervisorRequestAccept = async (req, res, next) => {
    const { requestId } = req.body

    try {
        const request = await CoSupervisorRequest.findById(requestId)
        request.status = 'Accepted'
        await request.save()
        res.status(201).json({
            message: 'Request accepted successfully',
            request,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error accepting request',
            error,
        })
        next(error)
    }
}

export const supervisorRequestDecline = async (req, res, next) => {
    const { requestId } = req.body

    try {
        const request = await SupervisorRequest.findById(requestId)
        request.status = 'Declined'
        await request.save()
        res.status(201).json({
            message: 'Request declined successfully',
            request,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error declining request',
            error,
        })
        next(error)
    }
}

export const coSupervisorRequestDecline = async (req, res, next) => {
    const { requestId } = req.body

    try {
        const request = await CoSupervisorRequest.findById(requestId)
        request.status = 'Declined'
        await request.save()
        res.status(201).json({
            message: 'Request declined successfully',
            request,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error declining request',
            error,
        })
        next(error)
    }
}

export const getSupervisorRequestsOfSupervisor = async (req, res, next) => {
    const { supervisorId } = req.body


    try {
        const requests = await SupervisorRequest.find({
            supervisorId:mongoose.Types.ObjectId(supervisorId)
        }).populate('groupId').exec()
        res.status(201).json({
            message: 'Requests fetched successfully',
            requests,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching requests',
            error,
        })
       
    }
}

export const getAllSupervisorRequests = async (req, res, next) => {
    try {
        const requests = await SupervisorRequest.find({}).exec()
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
        const requests = await CoSupervisorRequest.find({}).exec()
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

export const getAllCoSupervisorRequestsOfCosupervisor = async (
    req,
    res,
    next
) => {
    const { coSupervisorId } = req.body

    try {
        const requests = await CoSupervisorRequest.find({
            coSupervisorId,
        }).populate('groupId').exec()
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
