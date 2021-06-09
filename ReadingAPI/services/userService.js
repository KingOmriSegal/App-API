const { findUserToLogin, generateToken } = require('../auth/auth');
const pool = require('../dbConnection/db');

exports.getSelf = (req, res) => {
    const { username, is_admin } = req.user;

    res.send({
        username,
        isAdmin: is_admin
    });
};

const sendUserTokenInfo = (res, user) => {
    const token = generateToken(user.id.toString());

    res.send({
        isAdmin: user.is_admin,
        token,
        username: user.username   
    });    
};

exports.login = async (req, res) => {
    try {
		const user = await findUserToLogin(req.body);

		if (user) {
            sendUserTokenInfo(res, user[0]);

		} else {
			res.status(404).send('Unable to login');
		}
	} catch (error) {
		res.status(400).send(error);
	}
};

exports.sendAdminsRegUsers = async () => {
    let admins = [];
    let nonAdmins = [];

    const postQuery = `SELECT username, id, is_admin
                        FROM users`;
    const output = await pool.query(postQuery);
    const userData = output.rows;

    userData.forEach(user => {
        const { is_admin } = user;

        if (is_admin) {
            admins.push(user);
        } else {
            nonAdmins.push(user);
        }
    });

    return {
        admins: usersToBasicData(admins),
        regUsers: usersToBasicData(nonAdmins)
    };
};

const usersToBasicData = (userData) => {
    const updatedUsers = userData.map(user => {
        return {
            userId: user.id,
            username: user.username,
        };
    });

    return updatedUsers;
};