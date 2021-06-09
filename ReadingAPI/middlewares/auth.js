const jwt = require('jsonwebtoken');
const pool = require('../dbConnection/db');
const secretTokenString = require('../auth/authSecret');

const authUser = async (req, res, next) => {
    try {
		const token = req.header('Authorization').split(' ')[1];
        const payload = jwt.verify(token, `${secretTokenString}`);

        const userQuery = `SELECT username, is_admin
                            FROM users
                            WHERE id = $1;`;
        const values = [payload._id];
        const output = await pool.query(userQuery, values);
        const user = output.rows;
        
		if (!user) {
			throw new Error('The user is not authenticated');
        }
        
		req.user = user[0];
		next();
	} catch (e) {
		res.status(401).send({ error: 'User is unauthorized' });
	}
};

// const authAdminUser = async (req, res, next) => {
//     try {
// 		const token = req.header('Authorization').split(' ')[1];
// 		const payload = jwt.verify(token, `${secretTokenString}`);
// 		const user = await User.findById(payload._id);
		
// 		if (!user) {
// 			throw new Error('The user is not authenticated');
// 		}
// 		req.user = user;
// 		next();
// 	} catch (e) {
// 		res.status(401).send({ error: 'User is unauthorized' });
// 	}
// };

module.exports = {
    authUser,
    // authAdminUser
};
