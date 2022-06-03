import ResearchGroup from '../models/ResearchGroup.js'
import Student from '../models/Student.js'
import AcademicStaff from '../models/AcademicStaff.js'
import SupervisorRequest from '../models/SupervisorRequest.js'
import CoSupervisorRequest from '../models/CoSuervisorRequest.js'
import GroupChat from '../models/GroupChat.js'

export const addResearchGroup = async (req, res, next) => {
    const {
        leaderId,
        secondMemberId,
        thirdMemberId,
        fourthMemberId,
        groupName,
        topic,
        topicDescription,
    } = req.body


    const members = [leaderId, secondMemberId, thirdMemberId, fourthMemberId]


    try {
        const researchGroup = new ResearchGroup({
            members,
            groupName,
            topic,
            topicDescription,
            topicState: 'Initial',
        })
        await researchGroup.save()

        const leader = await Student.findById(leaderId)
        leader.researchGroup = researchGroup._id
        await leader.save()

        const secondMember = await Student.findById(secondMemberId)
        secondMember.researchGroup = researchGroup._id
        await secondMember.save()

        const thirdMember = await Student.findById(thirdMemberId)
        thirdMember.researchGroup = researchGroup._id
        await thirdMember.save()

        const fourthMember = await Student.findById(fourthMemberId)
        fourthMember.researchGroup = researchGroup._id
        await fourthMember.save()


        await new GroupChat({
            groupId:researchGroup._id,
            messages:[]
        }).save();

        res.status(201).json({
            message: 'Research Group added successfully',
            researchGroup,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error adding Research Group',
            error,
        })
        // next(error) do not call next after send response
    }
}

export const addSupervisors = async (req, res, next) => {
    const { groupId, cosupervisorId, supervisorId } = req.body

    try {
        const researchGroup = await ResearchGroup.findById(groupId)
        researchGroup.cosupervisor = cosupervisorId
        researchGroup.supervisor = supervisorId
        await researchGroup.save()
        res.status(201).json({
            message: 'Supervisors added successfully',
            researchGroup,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error adding Supervisors',
            error,
        })
        next(error)
    }
}

export const addPanelMembers = async (req, res, next) => {
    const {
        groupId,
        firstPanelMemberId,
        secondPanelMemberId,
        thirdPanelMemberId,
    } = req.body

    const panelMembers = [
        firstPanelMemberId,
        secondPanelMemberId,
        thirdPanelMemberId,
    ]

    try {
        const researchGroup = await ResearchGroup.findById(groupId)
        researchGroup.panelMembers = panelMembers
        await researchGroup.save()
        res.status(201).json({
            message: 'Panel members added successfully',
            researchGroup,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error adding panel members',
            error,
        })
        next(error)
    }
}

export const getResearchGroupRegistration = async (req, res, next) => {
    try {
        const students = await Student.find()
        const academicStaffs = await AcademicStaff.find()
        res.status(200).json({
            message: 'Research Groups retrieved successfully',
            students,
            academicStaffs,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving Research Groups',
            error,
        })
        next(error)
    }
}

export const getResearchGroupDetails = async (req, res, next) => {
    try {
        const researchGroup = await ResearchGroup.find({}).populate(
            'panelMembers members cosupervisor supervisor'
        )

        res.status(200).json({
            message: 'Research Groups retrieved successfully',
            researchGroup,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving Research Groups',
            error,
        })
        next(error)
    }
}

export const requestSupervisor = async (req, res, next) => {
    const { groupId, supervisorId, domain, topic, description } = req.body

    try {
        const supervisorRequest = new SupervisorRequest({
            groupId,
            supervisorId,
            domain,
            topic,
            description,
            status: 'Pending',
        })
        await supervisorRequest.save()
        const supervisor = await AcademicStaff.findById(supervisorId).exec()

        supervisor.supervisorRequests.push(supervisorRequest)
        await supervisor.save()
        res.status(201).json({
            message: 'Supervisor request added successfully',
            supervisorRequest,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error adding supervisor request',
            error,
        })
        next(error)
    }
}

export const requestCoSupervisor = async (req, res, next) => {
    const { groupId, coSupervisorId, domain, topic, description } = req.body

    try {
        const coSupervisorRequest = new CoSupervisorRequest({
            groupId,
            coSupervisorId,
            domain,
            topic,
            description,
            status: 'Pending',
        })
        await coSupervisorRequest.save()
        const coSupervisor = await AcademicStaff.findById(coSupervisorId).exec()
        coSupervisor.coSupervisorRequests.push(coSupervisorRequest)
        coSupervisor.save()
        res.status(201).json({
            message: 'Co-Supervisor request added successfully',
            coSupervisorRequest,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error adding co-supervisor request',
            error,
        })
        next(error)
    }
}

//to submit topic
export const submitTopic = async (req, res, next) => {
    const {
        groupId,
        memberOnePart,
        memberTwoPart,
        memberThreePart,
        memberFourPart,
        supervisorID,
        coSupervisorID,
        topic,
        topicDescription,
    } = req.body

    const memberWorks = [
        memberOnePart,
        memberTwoPart,
        memberThreePart,
        memberFourPart,
    ]

    try {
        const researchGroup = await ResearchGroup.findById(groupId).exec()
        researchGroup.memberWorks = memberWorks
        researchGroup.supervisor = supervisorID
        researchGroup.cosupervisor = coSupervisorID
        researchGroup.topic = topic
        researchGroup.topicDescription = topicDescription
        researchGroup.topicState = 'Pending'
        await researchGroup.save()

        res.status(201).json({
            message: 'Topic Registered successfully',
            researchGroup,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Topic Registeration Error',
            error,
        })
    }
}

//details required to submit topic

export const getSubmitTopicDetails = async (req, res, next) => {
    const { groupId } = req.body
    console.log(groupId)

    try {
        const acceptedSupervisorRequests = await SupervisorRequest.find(
            {
                groupId,
                status: 'Accepted',
            },
            { supervisorId: true }
        )
            .populate('supervisorId')
            .exec()

        const members = await ResearchGroup.findById(groupId, {
            members: true,
        }).populate('members')

        const filteredMemberDetails = members.members.map((member) => ({
            name: member.name,
            id: member._id,
        }))
        const filteredSupervisorrDetails = acceptedSupervisorRequests.map(
            (supervisor) => ({
                id: supervisor.supervisorId._id,
                name: supervisor.supervisorId.name,
            })
        )

        const acceptedCoSupervisorRequests = await CoSupervisorRequest.find(
            {
                groupId,
                status: 'Accepted',
            },
            { coSupervisorId: true }
        )
            .populate('coSupervisorId')
            .exec()

        const filteredCoSupervisorrDetails = acceptedCoSupervisorRequests.map(
            (supervisor) => ({
                id: supervisor.coSupervisorId._id,
                name: supervisor.coSupervisorId.name,
            })
        )

        res.status(201).json({
            message: 'Details retrieved successfully',
            superviosrs: filteredSupervisorrDetails,
            coSupervisors: filteredCoSupervisorrDetails,
            members: filteredMemberDetails,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            error,
        })
    }
}

//get details of topic submissons of staff member

export const topicSubmitionDetailsOfStaffMember = async (req, res, next) => {
    const { academicStaffId } = req.body

    try {
        const topicSubmissons = await ResearchGroup.find({
            panelMembers: academicStaffId,
        }).exec()

        res.status(201).json({
            message: 'Retrieved successfully',
            topicSubmissons,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            error,
        })
    }
}

//accept topic
export const acceptTopic = async (req, res, next) => {
    const { groupId } = req.body

    try {
        const topicSubmissons = await ResearchGroup.findOneAndUpdate(
            {
                _id: groupId,
            },
            { topicState: 'Accepted' }
        ).exec()

        res.status(201).json({
            message: 'Accepted successfully',
            topicSubmissons,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            error,
        })
    }
}


//accept topic
export const declineTopic = async (req, res, next) => {
    const { groupId } = req.body

    try {
        const topicSubmissons = await ResearchGroup.findOneAndUpdate(
            {
                _id: groupId,
            },
            { topicState: 'Declined' }
        ).exec()

        res.status(201).json({
            message: 'Declined successfully',
            topicSubmissons,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            error,
        })
    }
}