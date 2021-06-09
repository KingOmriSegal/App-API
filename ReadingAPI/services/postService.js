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
    let dataToReturn = [];

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
    const dbDateOutputs = output.rows.map(row => {
        return {
            date: moment(row.date).format('YYYY-MM-DD'),
            count: row.count}
    });

    let currentDate = moment().format('YYYY-MM-DD');
    let pastDate = moment().subtract(28, 'day').format('YYYY-MM-DD');
    const datesBetween = getDates(pastDate, currentDate);

    datesBetween.forEach(date => {
        let currDateData = {date, count: 0};

        dbDateOutputs.forEach(dateOutput => {
            if (dateOutput.date == date) {
                currDateData = {
                    date, 
                    count: parseInt(dateOutput.count)
                };
            }
        })

        dataToReturn.push(currDateData);
    });

    return dataToReturn;

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