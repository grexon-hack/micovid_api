const { Router } = require('express');
const { Register } = require("../Services/RegisterService.js")
const { conn } = require("../db.js")

const router = Router();

router.post('/', async (req, res) => {
    const dataFull = {...req.body}
    try {
        await Register(dataFull);
        res.status(200).send('was created your activity succesfully')
    }
    catch (error) {
        const {parent} = error
        res.status(400).send({msg: parent.message})
    }
})

router.get('/planes', async (req, resp) => {
    try {
        const result = await conn.query('SELECT * FROM planes'); // Utiliza la conn directamente
        resp.status(200).json(result[1].rows);
    } catch (error) {
        const { parent } = error;
        resp.status(400).send({ msg: parent.message });
    }
});


module.exports = router;