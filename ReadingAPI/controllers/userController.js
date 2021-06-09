const express = require('express');
const router = express.Router();
// const { authUser } = require('../middlewares/auth');
const userService = require('../services/userService');

// router.get('/me', authUser, (req, res) => {
//     userService.getSelf(req, res);
// });

// router.post('/login', (req, res) => {
//     userService.login(req, res);
// });

router.get('/all/adminsRegUsers', async (req, res) => {
    try {
        const output = await userService.sendAdminsRegUsers();
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;