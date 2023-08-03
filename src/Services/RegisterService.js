const { v1 } = require('uuid');
const CryptoTS = require('crypto-ts');
require('dotenv').config({path: '../../.env'});
const { SECRETKEY } = process.env
const { SportsInstitutions, RollSettings, TableLogins } = require('../db.js');

const register_function = async (dataBody) => {
    const { email, 
        institutionName,
        legalRepresentative,
        character,
        pais,
        sede,
        webPage,
        phone,
        image,
        user,
        password,
        roll
    } = dataBody;


    const pass = CryptoTS.AES.decrypt(password, SECRETKEY).toString(CryptoTS.enc.Utf8);
    const sportInstitution = await SportsInstitutions.create({
        ID: v1(),
        email,
        institutionName,
        legalRepresentative,
        character,
        pais,
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
            password: pass,
            RollSettingID: rollSetting.ID
        })

}

module.exports = {register_function}