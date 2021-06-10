// const words = require('../data/words');
const pool = require('../dbConnection/db');

exports.sendAllWords = async () => {
    const wordQuery = "SELECT word_id as wordId, content as word FROM words";

    return await pool.query(wordQuery)
                    .then(pgRes => {
                        return pgRes.rows;
                    });
};

exports.addNewWord = async (newWord) => {
    const wordQuery = `INSERT INTO words(content)
                       VALUES($1) RETURNING *;`;
    const values = [newWord];
    const newWordEntry = (await pool.query(wordQuery, values)).rows[0];
    await flaggedWordsInPost(newWordEntry)
};

exports.deleteWord = async (wordId) => {
    const values = [wordId];

    const postLinkQuery = `DELETE FROM post_word_links
                            WHERE word_id = $1`;
    await pool.query(postLinkQuery, values);

    const wordQuery = `DELETE FROM words
                       WHERE word_id = $1;`;
    await pool.query(wordQuery, values);
};

exports.updateWord = async (wordId, newWord) => {
    const wordQuery = `UPDATE words
                       SET content = $1
                       WHERE word_id = $2 RETURNING *;`;
    const values = [newWord, wordId];
    const newWordEntry = (await pool.query(wordQuery, values)).rows[0];

    await flaggedWordsInPost(newWordEntry)
    const wordQuery2 = `DELETE FROM post_word_links
                        WHERE (word_id = $1) AND
                        (content <> $2);`;
    const values2 = [wordId, newWord];
    await pool.query(wordQuery2, values2);
};

exports.sendWordStats = async () => {
    const wordQuery =  `SELECT word.content, 
                        count(*) as post_count, 
                        trunc(((count(*)*100.0)/(SELECT count(*) FROM posts)), 0) as percentage
                        FROM post_word_links as postlink
                        INNER JOIN words as word
                        ON word.word_id = postlink.word_id
                        GROUP BY word.content;`;
    const output = await pool.query(wordQuery);
    const allWords = output.rows;

    const wordsStatsToSend = allWords.map(word => {
        return {
            word: word.content,
            postCount: word.post_count,
            percentage: word.percentage
        };
    });

    return wordsStatsToSend;
};

const flaggedWordsInPost = async (word) => {
    const selectPostsQuery = "SELECT posts.content AS content, posts.post_id AS post_id, profiles.prof_id AS prof_id, profiles.wanted_state AS wanted_state FROM posts JOIN profiles ON posts.profile = profiles.fb_username";
    const posts = (await pool.query(selectPostsQuery)).rows;
    posts.forEach(post => {
        if (post.content.includes(word.content)) {
            addPostWordLink(post.post_id, word.word_id);
            if (post.wanted_state === 0) {
                makeProfileSuspect(post);
            }
        }
    });
}

const addPostWordLink = (post_id, word_id) => {
    const insertQuery = "INSERT INTO post_word_links (post_id, word_id) VALUES ($1, $2)";
    const values = [post_id, word_id]
    pool.query(insertQuery, values);
}

const makeProfileSuspect = (profile) => {
    const updateQuery = "UPDATE profiles SET wanted_state = 1 WHERE prof_id = $1";
    const values = [profile.prof_id];

    pool.query(updateQuery, values);
}