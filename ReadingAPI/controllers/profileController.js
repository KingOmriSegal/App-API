const express = require('express');
const router = express.Router();

const profileService = require('../services/profileService');

router.get('/id/:ssn', (req, res) => {
    res.send(profileService.sendDataById(req.params.ssn));
})

router.get('/all/total', (req, res) => {
    res.send(profileService.sendAllProfiles());
});

router.get('/all/number/suspectsRequested', async (req, res) => {
    try {
        const output = await profileService.sendNumberSuspectsRequested();
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/all/suspectsRequested', async (req, res) => {
    try {
        const output = await profileService.sendSuspectsRequested();
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/id/:ssn/isSuspect', (req, res) => {
    res.send(profileService.sendIsSuspectById(req.params.ssn));
});

router.patch('/id/:ssn/change/wantedState', async (req, res) => {
    try {
        await profileService.updateWantedState(req.params.ssn);
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;