const pool = require('../db/config');


const addPost = async (post) => {
    const insertQuery = "SELECT * FROM posts"
    const values = [post.username, post.content, post.postDate, post.likes];
    pool.query(insertQuery, values, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.row[0]);
        }
    });
}

module.exports = {
    addPost,
};
