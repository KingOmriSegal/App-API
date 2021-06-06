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

exports.sendTestData = () => {
    const testProfile = {
        SSN: '012345678',
        firstname: 'שון',
        lastname: 'מנדס',
        phoneNumber: '1112223344',
        address: '1600 Pennsylvania Avenue NW',
        wantedState: 1,
        reports: [
            {
                startingDate: '2021-04-28T00:00:00.000Z',
                expiredDate: '2021-06-02T00:00:00.000Z',
            },
            {
                startingDate: '2021-05-28T00:00:00.000Z',
                expiredDate: '2021-06-03T00:00:00.000Z',
            },
        ],
        drivingLicense: {
            status: 'Expired',
            start:'2019-04-28T00:00:00.000Z',
            end: '2021-04-28T00:00:00.000Z'
        }
    };

    return testProfile;
};

exports.sendDataById = (profileSNN) => {
    const matchedProfile = profiles.find( ({ SSN }) => SSN === profileSNN);
    console.log(matchedProfile)
}