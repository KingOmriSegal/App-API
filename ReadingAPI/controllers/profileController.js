const express = require('express');
const router = express.Router();

const profileService = require('../services/profileService');

router.get('/id/:ssn', (req, res) => {
    res.send(profileService.sendDataById(req.params.ssn));
})

router.get('/all/total', (req, res) => {
    res.send(profileService.sendAllProfiles());
});

router.get('/all/number/suspectsRequested', (req, res) => {
    res.send(profileService.sendNumberSuspectsRequested());
});

router.get('/all/suspectsRequested', (req, res) => {
    res.send(profileService.sendSuspectsRequested());
});

router.get('/id/:ssn/isSuspect', (req, res) => {
    res.send(profileService.sendIsSuspectById(req.params.ssn));
});

router.patch('/id/:ssn/change/wantedState', (req, res) => {
    res.send(profileService.updateWantedState(req.params.ssn));
});

module.exports = router;