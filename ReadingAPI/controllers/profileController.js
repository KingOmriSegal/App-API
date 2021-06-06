const express = require('express');
const router = express.Router();

const profileService = require('../services/profileService');

router.get('/test', (req, res) => {
    res.send(profileService.sendTestData());
});

router.get('/:ssn', (req, res) => {
    console.log(req.params.ssn);
    profileService.sendDataById(req.params.ssn);
    res.send('hi')
})

// router.get('/msg/:userMsg', (req, res) => {
//     res.send(`first endpoint - ${req.params.userMsg}`);
// });

module.exports = router;