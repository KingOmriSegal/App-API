const profiles = require('../data/profiles');
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
        if (wantedState === 2) {
            requested += 1;
        } else if (wantedState === 1) {
            suspects += 1;
        }
    });

    return {
        suspects,
        requested
    };
};

exports.sendSuspectsRequested = () => {
    let suspects = [];
    let requested = [];

    profiles.forEach(profile => {
        const { wantedState } = profile;

        if (wantedState === 2) {
            requested.push(profile);
        } else if (wantedState === 1) {
            suspects.push(profile);
        }
    });

    return {
        suspects: profilesToBasicData(suspects),
        requested: profilesToBasicData(requested)
    };
}

const profilesToBasicData = (profileData) => {
    const updatedProfiles = profileData.map(profile => {
        return {
            SSN: profile.SSN,
            firstname: profile.firstname,
            lastname: profile.lastname,
            imageURL: profile.imageURL,
            wantedState: profile.wantedState
        };
    });

    return updatedProfiles;
}