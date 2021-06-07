const pool = require('../db/config');


const addPost = async (post) => {
    const insertQuery = "INSERT INTO posts (profile, content, post_date, likes) \n VALUES($1, $2, TO_DATE($3,'YYYY-MM-DD HH:mm:SS'), $4) RETURNING *"
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