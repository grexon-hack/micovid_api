const { Router } = require('express');
const jwt = require('jsonwebtoken')
require('dotenv').config({path: '../../.env'});


const { login_function } = require("../Services/LoginService.js");

const { JWT_STRING, JWT_EXPIRED } = process.env;
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.post('/', async (req, res) => {
    const { Name, Password } = req.body;
    const dataBd = await login_function(Name, Password);
    if(dataBd){
        const { RollSetting : { SportsInstitution } } = dataBd.dataValues;
        const dataUser = SportsInstitution.dataValues;
        jwt.sign({ dataUser }, JWT_STRING, {expiresIn: JWT_EXPIRED} , (error, token) => {
          res.json({
                dataUser,
                token
            })
        })
    }else {
       res.status(401).send("user not found");
    }
});


module.exports = router;
