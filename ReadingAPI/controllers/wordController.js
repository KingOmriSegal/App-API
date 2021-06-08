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
        await wordService.addNewWord(req.body.word);
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/deleteWord', async (req, res) => {
    try {
        await wordService.deleteWord(req.body.wordId);
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
})

module.exports = router;