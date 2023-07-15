const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('SportsInstitutions', {
    ID: {
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
    institutionName: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    legalRepresentative: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    character: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sede: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    webPage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
    type: DataTypes.STRING,
        validate: {
            isUrl: true,
        },
    }
    
  });

  sequelize.define('RollSettings', {
    ID: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique:true,
        allowNull: false
    },
    account: {
    type: DataTypes.ENUM(["User", "Admin", "SuperAdmin"]),
    defaultValue: "Admin",
    },
    
  });
  
  sequelize.define('TableLogins', {
    ID: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique:true,
        allowNull: false
    },
    user: {
    type: DataTypes.STRING,
    allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
    
  });

}