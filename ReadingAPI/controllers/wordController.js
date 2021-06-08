const express = require('express');
const router = express.Router();

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
        // const output = await wordService.sendAllWords();
        // res.send(output);
        await wordService.addNewWord(req.body.word);
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;