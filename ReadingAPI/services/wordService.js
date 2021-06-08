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
                       VALUES($1)`;
    const values = [newWord];
    await pool.query(wordQuery, values);
};

exports.deleteWord = async (wordId) => {
    const wordQuery = `DELETE FROM words
                       WHERE word_id = $1;`;
    const values = [wordId];
    await pool.query(wordQuery, values);
};

exports.updateWord = async (wordId, newWord) => {
    const wordQuery = `UPDATE words
                       SET content = $1
                       WHERE word_id = $2;`;
    const values = [newWord, wordId];
    await pool.query(wordQuery, values);
}