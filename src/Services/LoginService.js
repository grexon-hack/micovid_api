const { Tenants, TenantSettings, jwt } = require('../db.js');


const Login = async (Name, Password) => {
    const CryptoJS = require('crypto-js');
    const secretKey = '1234567890';
    const pass = CryptoJS.AES.decrypt(Password, secretKey).toString(CryptoJS.enc.Utf8);
    try {
        const dataBd = await Tenants.findOne({
            where: {
                name: Name ,
                password : pass
            }
        });
        
        return dataBd;
    } catch (error) {
     return "user not found";
    }
}

module.exports = {
    Login
};