const { Tenants, TenantSettings, jwt } = require('../db.js');


const Login = async (Name, Password) => {
    const pass = atob(Password);
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