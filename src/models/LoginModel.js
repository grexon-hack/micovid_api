const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Tenants', {
    tenantId: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique:true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
    },
    name: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    image: {
    type: DataTypes.STRING,
        // validate: {
        //     isUrl: true,
        // },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
    
  });

  sequelize.define('TenantSettings', {
    tenantSettingId: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique:true,
        allowNull: false
    },
    tenantId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    Account: {
    type: DataTypes.ENUM(["User", "Admin", "SuperAdmin"]),
    defaultValue: "User",
    },
    
  });

}