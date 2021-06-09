const express = require('express');
const router = express.Router();
const { authUser, authAdminUser } = require('../middlewares/auth');
const userService = require('../services/userService');

router.get('/me', authUser, (req, res) => {
    userService.getSelf(req, res);
});

router.post('/login', (req, res) => {
    userService.login(req, res);
});

router.get('/all/adminsRegUsers', async (req, res) => {
    try {
        const output = await userService.sendAdminsRegUsers();
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/addUser', async (req, res) => {
    try {
        const newUser = {
            username: req.body.username,
            password: req.body.password,
            isAdmin: req.body.isAdmin
        }

        await userService.addNewUser(newUser);
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/deleteUser/:userId', async (req, res) => {
    try {
        await userService.deleteUser(req.params.userId);
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;