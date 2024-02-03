const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/conexiondb");

const Cliente = sequelize.define("cliente", {
  nombres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },             
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  f_nacimiento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("La tabla Clientes ha sido sincronizada con la base de datos.");
  })
  .catch((error) => {
    console.error("Error al sincronizar la tabla Clientes:", error);
  });

module.exports = Cliente;
