const profiles = require('../data/profiles');
const pool = require('../dbConnection/db');

const SUSPECT = 1;
const REQUESTED = 2;
const SAFE = 0;
// const User = require('../models/user');
// const usersRepository = require('../repositories/usersRepository');

// exports.getAllUsers = async () => {
//     return await User.find();
// };

// exports.findByUserName = async (req, res) => {
//     try {
//         const user = await usersRepository.findUserByUserName(req.params.userToSignIn);

//         if (!user) {
//             res.status(404).send('Unable to sign in');
//         } else {
//             res.send(user);
//         }
//     } catch (err) {
//         res.status(500).send(err);
//     }    
// };

exports.sendDataById = (profileSSN) => {
    const matchedProfile = profiles.find( ({ SSN }) => SSN === profileSSN);

    return(matchedProfile ? matchedProfile : '{}');
}

exports.sendAllProfiles = () => {
    return profiles;
};

exports.sendNumberSuspectsRequested = () => {
    let suspects = 0;
    let requested = 0;

    profiles.forEach(({ wantedState }) => {
        if (wantedState === REQUESTED) {
            requested += 1;
        } else if (wantedState === SUSPECT) {
            suspects += 1;
        }
    });

    return {
        suspects,
        requested
    };
};

exports.sendSuspectsRequested = async () => {
    let suspects = [];
    let requested = [];

    const postQuery = `SELECT ssn as SSN, firstname, lastname, image_url, wanted_state
                        FROM profiles`;
    const output = await pool.query(postQuery);
    const profiles = output.rows;

    profiles.forEach(profile => {
        const { wanted_state } = profile;

        if (wanted_state === REQUESTED) {
            requested.push(profile);
        } else if (wanted_state === SUSPECT) {
            suspects.push(profile);
        }
    });

    return {
        suspects: profilesToBasicData(suspects),
        requested: profilesToBasicData(requested)
    };
};

const profilesToBasicData = (profileData) => {
    const updatedProfiles = profileData.map(profile => {
        return {
            SSN: profile.ssn,
            firstname: profile.firstname,
            lastname: profile.lastname,
            imageURL: profile.image_url,
        };
    });

    return updatedProfiles;
};

exports.sendIsSuspectById = (profileSSN) => {
    const profile = profiles.find( ({ SSN }) => SSN === profileSSN);
    let dataToSend = {};

    if (profile) {
        const isSuspect = ((profile.wantedState != SAFE) ? 'true' : 'false');
        
        dataToSend = {
            isSuspect,
            firstname: profile.firstname,
            lastname: profile.lastname
        }
    }

    return dataToSend;
};

exports.updateWantedState = async (profileSSN) => {
    const profileQuery = `UPDATE profiles
                        SET wanted_state = (wanted_state % 2) + 1
                        WHERE ssn = $1;`;
    const values = [profileSSN];
    await pool.query(profileQuery, values);
};
