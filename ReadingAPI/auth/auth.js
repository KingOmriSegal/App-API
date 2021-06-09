const jwt = require('jsonwebtoken');
const pool = require('../dbConnection/db');
const secretTokenString = require('./authSecret');

exports.findUserToLogin = async ({ username, password }) => {
    const userQuery = `SELECT username, id, is_admin
                        FROM users
                        WHERE (username = $1) AND
                        (password = $2)`;
    const values = [username, password];

    const user = await pool.query(userQuery, values);

	return user.rows;
};

exports.generateToken = id =>
	jwt.sign({ _id: id }, `${secretTokenString}`, {
		expiresIn: '7 days'
});
