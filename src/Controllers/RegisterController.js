const { Router } = require('express');
const { v1 } = require('uuid');
const { SportsInstitutions, RollSettings, TableLogins } = require('../db.js');


const router = Router();

router.post('/', async (req, res) => {
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
    } = req.body;

    try {
        await SportsInstitutions.create({
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
        .then(SportsInstitutions => {
           return RollSettings.create({
                ID: v1(),
                SportsInstitutionID: SportsInstitutions.ID, 
                account: roll
            })
        })
        .then(RollSettings => {
           return TableLogins.create({
                ID: v1(),
                user,
                password,
                RollSettingID: RollSettings.ID
            })
        }).catch(error =>{
            console.log("error:", error)
        })

        res.status(200).send('was created your activity succesfully')
    }
    catch (error) {
        res.status(400).send({msg: error})
    }
})

module.exports = router;