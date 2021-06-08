const express = require('express');
const router = express.Router();

const postsService = require('../services/postsService');

router.post('', (req, res) => {
    res.send(postsService.addPost(req.body));
})

module.exports = router;