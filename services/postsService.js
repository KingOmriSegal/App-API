const pool = require('../db/config');


const addPost = async (post) => {
    const insertQuery = "INSERT INTO posts (profile, content, post_date, likes) VALUES('EisenSkrrrrrrrrrrrrr', 'TEST', '2021-02-02 00:00:00', 5 returning *"
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
