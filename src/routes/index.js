const { Router } = require('express');
const { 
    v1
  } = require('uuid');
var express = require('express');
const { Op } = require('sequelize');

const { Tenants, TenantSettings, jwt } = require('../db.js');
// const { saveAll, changeWord } = require('./controllers.js')




const router = Router();
router.use(express.json())
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


// accion del bulkCreate a la base de datos
// funcion saveAll es traida de controllers.js y obtiene los datos requeridos 
// de la api 



// router.post('/create', async (req, res) => {
// /*
// metodo post para crear un usuario de prueba ya que el metodo Register no esta creado,
// - tomar la contraseña de la consola para poder consultar con el usuario encriptado
// */
//     const { email, name, image, password } = req.body;
//     console.log(btoa(password))
//     try {
//         await Tenants.create({
//             tenantId: v1(),
//             email,
//             name,
//             image,
//             password
//         });

//         res.status(200).send('was created your activity succesfully')
//     }
//     catch (error) {
//         res.status(400).send(error)
//     }
// })

router.post('/login', async (req, res) => {
    const { Name, Password } = req.body;
    const pass = atob(Password);
    try {
        const dataBd = await Tenants.findOne({
            where: {
                name: Name ,
                password : pass
            }
        });

        if(dataBd.length !== 0){
            const { email, name, image } = dataBd.dataValues;
            jwt.sign({dataBd}, 'secretKey', (error, token) => {
                res.json({
                    email,
                    name,
                    image,
                    token
                })
            })
        }else {
            res.json({
                message: "user not found"
            })
        }

    } catch (error) {
        res.status(400).send("user not found");

    }

});

router.post('/home', verificationToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (error, authData) => {
        if(error){
            res.sendStatus(403);
        }else {
            res.json({
                message: "Bienvenido a tu App MiCovid",
                authData
            });
        }
    })
});

function verificationToken(req, res, next) {
    const bearerHeader = req.headers['autorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }else {
        res.sendStatus(403);
    }
};

// router.post('/', async (req, res) => {
//     try {
//         const dataBd = await Countries.findAll();
//         const datos = await saveAll();

//         if (dataBd.length === 0 && datos.length !== 0) {
//             await Countries.bulkCreate(datos);

//         }
//         res.send('succesfull')

//     } catch (error) {
//         res.status(400).send(error);

//     }


// });

// router.get('/countries/name', async (req, res) => {
//     const { name } = req.query;

//     try {
//         const byName = await Countries.findAll({
//             where: {
//                 Name: {
//                     [Op.iLike]: `%${name}%`
//                 }
//             },
//             include: [{
//                 model: TouristActivities,
//                 through: {
//                     attributes: []
//                 }
//             }]
//         })


//         return res.send(byName)
//     } catch (error) {
//         res.status(404).send({ msg: error })
//     }


// });

// router.get('/countries', async (req, res) => {
//     const { filterC, filterA } = req.query;

//     try {

//         let base = await Countries.findAll({
//             where: filterC && { Continent: filterC },
//             include: [{
//                 model: TouristActivities,
//                 where: filterA && { Name: filterA },
//                 through: {
//                     attributes: []
//                 }
//             }],
//             // order: mode ? [["Name", mode]] : popul ? [["Population", popul]] : null
//         });



//         res.send(base)
//     } catch (error) {

//         res.status(404).send(error)
//     }


// })



// router.get('/countries/:ID', async (req, res) => {
//     const { ID } = req.params;
//     if (ID) {
//         const byId = await Countries.findByPk(ID, {
//             include: [{
//                 model: TouristActivities,
//                 through: {
//                     attributes: []
//                 }
//             }]
//         })

//         res.status(200).send(byId)
//     }
// })




// router.post('/activity', async (req, res) => {
//     const { Name, Difficult, Duration, Season1, nombrePais } = req.body;
//     let Season = changeWord(Season1)
//     try {

//         await TouristActivities.create({
//             Name,
//             Difficult,
//             Duration,
//             Season
//         })
//         nombrePais.forEach(async element => {

//             const Act = await TouristActivities.findOne({
//                 where: {
//                     Name: Name
//                 }
//             })
//             const country = await Countries.findOne({
//                 where: {
//                     Name: element
//                 }
//             });
//             await country.addTouristActivities(Act)
//         });

//         res.status(200).send('was created your activity succesfully')
//     }
//     catch (error) {
//         res.status(400).send(error)
//     }
// })

module.exports = router;
