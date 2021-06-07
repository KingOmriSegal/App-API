const pool = require('../db/config');

const addPost = (post) => {
    const insertQuery = "INSERT INTO posts (profile, content, post_date, likes) VALUES($1, $2, TO_DATE($3,'YYYY-MM-DD HH:mm:SS'), $4) RETURNING post_id"
    const values = [post.username, post.content, post.postDate, post.likes];
    pool.query(insertQuery, values);
}

module.exports = {
    addPost,
};