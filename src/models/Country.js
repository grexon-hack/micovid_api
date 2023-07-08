const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Countries', {
    ID: {
      type:DataTypes.STRING,
      primaryKey: true,
      unique:true,
      allowNull: false
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NameOficial: {
      type: DataTypes.STRING
    },
    Subregion: {
      type: DataTypes.STRING
    },
    Area: {
      type: DataTypes.FLOAT,
      get() {
        const area = this.getDataValue('Area');
        return `${area} km2`;
      }
    },
    Population: {
    type: DataTypes.INTEGER
    },
  
    Image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Continent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Capital : {
      type: DataTypes.STRING,
      allowNull: false
    },
    Timezone:{
      type: DataTypes.STRING
    },
    Lat:{
      type: DataTypes.FLOAT
    },
    Long: {
      type: DataTypes.FLOAT
    },
    Maps : {
      type: DataTypes.STRING
    },
    
  });

 

  sequelize.define('TouristActivities', {
    
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Difficult: {
      type: DataTypes.INTEGER,
      validate:{
        min:1,
        max:5,
        isEven(value){
          if(value > 5 || value < 1) {
            throw new Error('Inappropriate value')
          }
        }
      }
    },
    Duration: {
      type: DataTypes.STRING
    },
    Season: {
      type: DataTypes.ENUM(['Verano', 'Otoño', 'Invierno', 'Primavera']),
      allowNull: false
    }
  })
};
