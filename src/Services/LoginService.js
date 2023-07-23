const { SportsInstitutions, RollSettings, TableLogins } = require('../db.js');
const CryptoJS = require('crypto-js');


const login_function = async (Name, Password) => {
    const { SECRETKEY } = process.env
    const pass = CryptoJS.AES.decrypt(Password, SECRETKEY).toString(CryptoJS.enc.Utf8);
    try {
        const dataBd = await TableLogins.findOne({
            where: {
                user: Name ,
                password : pass
            },
            include: [
                {model: RollSettings, include: SportsInstitutions }
            ]
        });
        
        return dataBd;
    } catch (error) {
     return "user not found";
    }
}

module.exports = {
    login_function
};