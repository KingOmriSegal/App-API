const express = require('express');
const router = express.Router();

const postsService = require('../services/postsService');

router.post('', (req, res) => {
    try {
        res.send(postsService.addPost(req.body));
    } catch(err) {
        res.status(500).send();
    }
})

module.exports = router;