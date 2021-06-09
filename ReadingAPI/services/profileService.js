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

exports.sendDataById = async (profileSSN) => {
    let dataToReturn = {};

    const profileDataQuery = `SELECT prof.*, driv.*
                         FROM profiles as prof
                         FULL JOIN driving_licenses as driv
                         ON prof.driving_license = driv.license_id
                         WHERE prof.ssn = $1`;
    const profileDataValues = [profileSSN];
    const output = await pool.query(profileDataQuery, profileDataValues);
    const profileData = output.rows[0];

    const profileReportsQuery = `SELECT rep.*
                                FROM reports as rep
                                INNER JOIN profiles as prof
                                ON rep.profile = prof.prof_id
                                WHERE prof.ssn = $1;`;
    const profileReportsValues = [profileSSN];
    const repOutput = await pool.query(profileReportsQuery, profileReportsValues);
    const reportData = repOutput.rows;
    
    if (profileData) {
        dataToReturn = profileDrivingReportData(profileData, reportData);
    }

    return dataToReturn;
};

const profileDrivingReportData = (profileData, reportData) => {
    let drivingData = {};

    if (profileData.driving_license) {
        drivingData = {
            status: profileData.status,
            start: profileData.start_date,
            end: profileData.end_date
        }
    };

    const updatedReportData = reportData.map(report => {
        return {
            startingDate: report.starting_date,
            expiredDate: report.expire_date
        }
    });

    const dataToReturn = {
        profileId: `${profileData.prof_id}`,
        SSN: profileData.ssn,
        firstname: profileData.firstname,
        lastname: profileData.lastname,
        phoneNumber: profileData.phone_number,
        address: profileData.address,
        wantedState: profileData.wanted_state,
        imageURL: profileData.image_url,
        reports: updatedReportData,
        drivingLicense: drivingData
    };

    return dataToReturn;
};

exports.sendAllProfiles = async () => {
    // return profiles;
    let profilePromises = [];
    let profilesToReturn = [];
    const profileDataQuery = `SELECT prof.*, driv.*
                         FROM profiles as prof
                         FULL JOIN driving_licenses as driv
                         ON prof.driving_license = driv.license_id;`;
    const output = await pool.query(profileDataQuery);
    const profileData = output.rows;

    profileData.forEach(profile => {
        profilePromises.push(setAllProfilesData(profile));
    });

    profilesToReturn = await Promise.all(profilePromises)
        .then((profiles) => {
            return profiles;
        });

    return profilesToReturn;
};

const setAllProfilesData = async (profileData) => {
    const profileReportsQuery = `SELECT rep.*
                                FROM reports as rep
                                INNER JOIN profiles as prof
                                ON rep.profile = prof.prof_id
                                WHERE prof.ssn = $1;`;
    const profileReportsValues = [profileData.ssn];
    const repOutput = await pool.query(profileReportsQuery, profileReportsValues);
    const reportData = repOutput.rows;

    let drivingData = {};

    if (profileData.driving_license) {
        drivingData = {
            status: profileData.status,
            start: profileData.start_date,
            end: profileData.end_date
        }
    };

    const updatedReportData = reportData.map(report => {
        return {
            startingDate: report.starting_date,
            expiredDate: report.expire_date
        }
    });

    const dataToReturn = {
        profileId: `${profileData.prof_id}`,
        SSN: profileData.ssn,
        firstname: profileData.firstname,
        lastname: profileData.lastname,
        phoneNumber: profileData.phone_number,
        address: profileData.address,
        wantedState: profileData.wanted_state,
        imageURL: profileData.image_url,
        reports: updatedReportData,
        drivingLicense: drivingData
    };


    return dataToReturn;
}

exports.sendNumberSuspectsRequested = async () => {
    let suspects = 0;
    let requested = 0;

    const postQuery = `SELECT wanted_state
                        FROM profiles`;
    const output = await pool.query(postQuery);
    const profileData = output.rows;

    profileData.forEach(({ wanted_state }) => {
        if (wanted_state === REQUESTED) {
            requested += 1;
        } else if (wanted_state === SUSPECT) {
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
    const profileData = output.rows;

    profileData.forEach(profile => {
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

exports.sendIsSuspectById = async (profileSSN) => {
    const profileQuery = `SELECT firstname, lastname, wanted_state
                            FROM profiles
                            WHERE ssn = $1;`;
    const values = [profileSSN];
    const output = await pool.query(profileQuery, values);

    // const profile = profiles.find( ({ SSN }) => SSN === profileSSN);
    let dataToSend = {};

    if (output) {
        const profileToSend = output.rows[0];
        const isSuspect = ((profileToSend.wanted_state != SAFE) ? 'true' : 'false');
        
        dataToSend = {
            isSuspect,
            firstname: profileToSend.firstname,
            lastname: profileToSend.lastname
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
