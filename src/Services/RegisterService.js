const { v1 } = require('uuid');
const { SportsInstitutions, RollSettings, TableLogins } = require('../db.js');

const Register = async (dataBody) => {
    const { email, 
        institutionName,
        legalRepresentative,
        character,
        type,
        sede,
        webPage,
        phone,
        image,
        user,
        password,
        roll
    } = dataBody;

    const sportInstitution = await SportsInstitutions.create({
        ID: v1(),
        email,
        institutionName,
        legalRepresentative,
        character,
        type,
        sede,
        webPage,
        phone,
        image
    })

       const rollSetting = await RollSettings.create({
            ID: v1(),
            SportsInstitutionID: sportInstitution.ID, 
            account: roll
        })


       await TableLogins.create({
            ID: v1(),
            user,
            password,
            RollSettingID: rollSetting.ID
        })

}

module.exports = {Register}