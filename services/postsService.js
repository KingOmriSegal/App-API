const pool = require('../db/config');


const addPost = (post) => {
    if (checkIfUnique(post)) {
        const insertQuery = "INSERT INTO posts (profile, content, post_date, likes) VALUES($1, $2, $3, $4) RETURNING *"
        const values = [post.username, post.content, post.postDate, post.likes];
        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.log(err.stack);
            }
            else {
                flaggedWordsInPost(res.rows[0]);
            }
        });
    }
}

const flaggedWordsInPost = async (post) => {
    try {
        const selectWordsQuery = "SELECT * FROM words";
        const words = (await pool.query(selectWordsQuery)).rows;

        const selectProfilesQuery = "SELECT * FROM profiles WHERE fb_username = $1";
        const values = [post.profile];
        const postsProfile = (await pool.query(selectProfilesQuery, values)).rows[0];

        words.forEach(word => {
            if (post.content.includes(word.content)) {
                addPostWordLink(post.post_id, word.word_id);
                if (postsProfile.wanted_state === 0) {
                    makeProfileSuspect(postsProfile);
                }
            }
        });
    }
    catch (err) {
        console.log(err.stack)
    }
}

const addPostWordLink = (post_id, word_id) => {
    const insertQuery = "INSERT INTO post_word_links (post_id, word_id) VALUES ($1, $2)";
    const values = [post_id, word_id]

    pool.query(insertQuery, values, (err, res) => {
        if (err) {
            console.log(err.stack);
        }
    });
}

const makeProfileSuspect = (profile) => {
    const updateQuery = "UPDATE profiles SET wanted_state = 1 WHERE prof_id = $1";
    const values = [profile.prof_id];

    pool.query(updateQuery, values, (err, res) => {
        if (err) {
            console.log(err.stack);
        }
    });
}

const checkIfUnique = (post) => {
    const countQuery = "SELECT COUNT(*) FROM posts WHERE profile = $1 AND content = $2 AND post_date = $3"
    const values = [post.username, post.content, post.postDate]
    
    pool.query(countQuery, values, (err, res) => {
        if (err) {
            console.log(err.stack);
        }
        else {
           return (res.rows[0].count < 1)
        }
    });
}
module.exports = {
    addPost,
};
