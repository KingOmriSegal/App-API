const express = require('express');
const router = express.Router();

const postService = require('../services/postService');

router.get('/id/:ssn/postsLastWeek', async (req, res) => {
    try {
        const output = await postService.countPostsLastWeek(req.params.ssn);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/id/:ssn/postsLastMonth', async (req, res) => {
    try {
        const output = await postService.countPostsLastMonth(req.params.ssn);
        res.send(output);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// router.get('/all/suspects/lastDay', async (req, res) => {
//     const output = await postService.postsWithBadWords();
//     res.send(output);
// })

module.exports = router;