const pool = require('../db/config');


const addPost = async (post) => {
    const insertQuery = "SELECT * FROM posts"
    const values = [post.username, post.content, post.postDate, post.likes];
    pool.query(insertQuery, (err, res) => {
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
