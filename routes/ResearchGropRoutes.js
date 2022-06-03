import express from 'express'
import {
    addPanelMembers,
    addResearchGroup,
    addSupervisors,
    getResearchGroupRegistration,
    requestCoSupervisor,
    requestSupervisor,
    submitTopic,
    getResearchGroupDetails,
    getSubmitTopicDetails,
    topicSubmitionDetailsOfStaffMember,
    acceptTopic,
    declineTopic
} from '../controllers/researchGroupController.js'
import {
    coSupervisorRequestAccept,
    coSupervisorRequestDecline,
    supervisorRequestAccept,
    supervisorRequestDecline,
} from '../controllers/AcademicStaffController.js'

const router = express.Router();

router.post('/add-group', addResearchGroup);

router.post('/add-panel', addPanelMembers);

router.post('/request-supervisor', requestSupervisor);

router.post('/request-cosupervisor', requestCoSupervisor);

router.post('/accept-supervisor', supervisorRequestAccept);

router.post('/accept-cosupervisor', coSupervisorRequestAccept);

router.post('/decline-supervisor', supervisorRequestDecline);

router.post('/decline-cosupervisor', coSupervisorRequestDecline);

router.get('/user-details', getResearchGroupRegistration);

router.get('/group-details', getResearchGroupDetails);

router.post('/add-supervisor', addSupervisors);


//router.get('/group-details',getResearchGroupDetails);

router.post('/submit-topic', submitTopic);


router.post('/submit-topic-details', getSubmitTopicDetails);

router.post('/topicsOfPanelMember', topicSubmitionDetailsOfStaffMember);

router.post('/acceptTopic', acceptTopic);

router.post('/declineTopic', declineTopic);

export default router
