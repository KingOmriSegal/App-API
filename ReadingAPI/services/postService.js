const pool = require('../dbConnection/db');
const { sendAllWords } = require('../services/wordService');

exports.countPostsLastWeek = async (profileSSN) => {
    const postQuery = `SELECT count(*) as post_count
                        FROM posts as post
                        INNER JOIN profiles as profile
                        ON post.profile = profile.fb_username
                        WHERE (post.post_date >= now() - '1 week'::interval) AND
                        (post.post_date <= now()) AND
                        (profile.ssn = $1);`;
    const values = [profileSSN];
    
    const output = await pool.query(postQuery, values);

    return {
        postCountLastWeek: output.rows[0].post_count
    };
};

// exports.postsWithBadWords = async () => {
//     let postsLastDay;
//     const allBadWords = await sendAllWords;

//     const postQuery = `SELECT prof.firstname, prof.lastname, prof.ssn, prof.image_url, post.post_date, post.content
//                         FROM profiles as prof
//                         INNER JOIN posts as post
//                         ON prof.fb_username = post.profile
//                         WHERE (post.post_date >= now() - '1 day'::interval) AND
//                         (post.post_date <= now());`;
//     const output = pool.query(postQuery)
//         .then(pgRes => {
//             postsLastDay = pgRes.rows;
//         });
    
//     return 'hi';
// }