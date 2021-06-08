const pool = require('../db/config');


const addPost = async (post) => {
    const insertQuery = "INSERT INTO posts (profile, content, post_date, likes) VALUES($1, $2, $3, $4) return post_id"
    const values = [post.username, post.content, post.postDate, post.likes];
    pool.query(insertQuery, values, (err, res) => {
        if (err) {
            console.log(err.stack);
        }
        else {
            console.log(res);
        }
    });
}

module.exports = {
    addPost,
};
