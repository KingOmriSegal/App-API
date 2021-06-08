// const posts = require('../data/posts');
// const pool = require('../dbConnection/db');

// exports.countPostsLastWeek = async (profileSSN) => {
//     const postQuery = `SELECT count(*) as post_count
//                         FROM posts as post
//                         INNER JOIN profiles as profile
//                         ON post.profile = profile.fb_username
//                         WHERE (post.post_date >= now() - '1 week'::interval) AND
//                         (post.post_date <= now()) AND
//                         (profile.ssn = '211576129');'
//                         return 'hi'`;
// }