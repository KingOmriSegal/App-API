const express = require('express');
const router = express.Router();
const { authAdminUser } = require('../middlewares/auth');
const wordService = require('../services/wordService');

router.get('/all', async (req, res) => {
    try {
        const output = await wordService.sendAllWords();
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/addWord', async (req, res) => {
    try {
        await wordService.addNewWord(req.body.word);
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/deleteWord/:wordId', async (req, res) => {
    try {
        await wordService.deleteWord(req.params.wordId);
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/updateWord', async (req, res) => {
    try {
        await wordService.updateWord(req.body.wordId, req.body.word);
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/wordStats', async (req, res) => {
    try {
        const output = await wordService.sendWordStats();
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
