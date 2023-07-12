const { Router } = require('express');
const { v1 } = require('uuid');
const { Tenants, TenantSettings } = require('../db.js');


const router = Router();

router.post('/', async (req, res) => {
    const { email, name, image, password } = req.body;
    try {
        await Tenants.create({
            tenantId: v1(),
            email,
            name,
            image,
            password
        });

        res.status(200).send('was created your activity succesfully')
    }
    catch (error) {
        res.status(400).send({ msg: error })
    }
})

module.exports = router;