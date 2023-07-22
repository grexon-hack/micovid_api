const { Router } = require('express');
const jwt = require('jsonwebtoken')
require('dotenv').config({path: '../../.env'});
const { DataUserPlan } = require("../Services/HomeService.js")

const { verificationToken } = require("../Utils/validateToken.js");
const { JWT_STRING } = process.env;
const router = Router();

router.post('/', verificationToken, async (req, res) => {
    jwt.verify(await req.token, JWT_STRING, (error, authData) => {
        if(error){
            res.sendStatus(401);
        }else {
            res.json({
                message: "Bienvenido a tu App MiCovid",
                authData
            });
        }
    })
});

router.post('/:userId', verificationToken, DataUserPlan)

module.exports = router;