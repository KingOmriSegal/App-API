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

module.exports = router;