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

    exports.postsWithBadWords = async () => {
            const postQuery = `SELECT profile.firstname, profile.lastname, post.post_date, STRING_AGG(word.content, ' ') AS bad_words FROM posts AS post
            JOIN post_word_links AS link ON post.post_id = link.post_id 
            JOIN words AS word ON word.word_id = link.word_id
            JOIN profiles AS profile ON profile.fb_username = post.profile
            WHERE post_date >= (now() - '1 day'::interval)
            GROUP BY post.post_id, profile.firstname, profile.lastname
            ORDER BY post_date desc`;
            return (await pool.query(postQuery)).rows
    }