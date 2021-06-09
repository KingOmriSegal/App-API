const express = require('express');
const router = express.Router();
const { authAdminUser } = require('../middlewares/auth');
const profileService = require('../services/profileService');

router.get('/id/:ssn', async (req, res) => {
    try {
        const output = await profileService.sendDataById(req.params.ssn);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.get('/all/total', async (req, res) => {
    try {
        const output = await profileService.sendAllProfiles();
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
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

router.get('/id/:ssn/isSuspect', async (req, res) => {
    try {
        const output = await profileService.sendIsSuspectById(req.params.ssn);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.patch('/id/:ssn/change/wantedState', authAdminUser, async (req, res) => {
    try {
        await profileService.updateWantedState(req.params.ssn);
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;