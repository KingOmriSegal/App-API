const pool = require('../dbConnection/db');
const moment = require('moment');

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

exports.countPostsLastMonth = async (profileSSN) => {
    const postQuery = `SELECT DATE(post.post_date), count(*)
                        FROM posts as post
                        INNER JOIN profiles as prof
                        ON post.profile = prof.fb_username
                        WHERE (DATE(post.post_date) >= DATE(now()) - '28 days'::interval) AND
                        (DATE(post.post_date) <= DATE(now())) AND
                        (prof.ssn = $1)
                        GROUP BY DATE(post.post_date)
                        ORDER BY DATE(post.post_date) DESC;;`
    const values = [profileSSN];
    const output = await pool.query(postQuery, values);

    let currentDate = moment();
    console.log(currentDate);
    return 'hi';

};

const getDates = (startDate, stopDate) => {
    let dateArray = [];
    let currentDate = moment(startDate);
    stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
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