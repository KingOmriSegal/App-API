const express = require('express');
const router = express.Router();

const wordService = require('../services/wordService');

router.get('/all', (req, res) => {
    res.send(wordService.sendAllWords());
});

module.exports = router;