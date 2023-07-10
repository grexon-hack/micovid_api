const { Router } = require('express');
const jwt = require('jsonwebtoken')
require('dotenv').config({path: '../../.env'});


const { Login } = require("../Services/LoginService.js");

const { JWT_STRING, JWT_EXPIRED } = process.env;
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.post('/', async (req, res) => {
    const { Name, Password } = req.body;
    const dataBd = await Login(Name, Password);
    if(dataBd){
        const { tenantId ,name, email, image } = dataBd.dataValues;
        jwt.sign({ tenantId ,name, email, image }, JWT_STRING, {expiresIn: JWT_EXPIRED} , (error, token) => {
          res.json({
                name,
                email,
                image,
                token
            })
        })
    }else {
       res.send("user not found");
    }
});


module.exports = router;
