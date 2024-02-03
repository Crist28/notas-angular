const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/conexiondb");
const Cliente = require("./cliente");

const Nota = sequelize.define("nota", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  archivada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Cliente.hasMany(Nota, { as: "notas", foreignKey: "clienteId" });
Nota.belongsTo(Cliente, {
  as: "cliente",
  foreignKey: "clienteId", 
  onDelete: "CASCADE",
});

sequelize
  .sync()
  .then(() => {
    console.log("La tabla Clientes ha sido sincronizada con la base de datos.");
    console.log("La tabla Notas ha sido sincronizada con la base de datos.");
  })
  .catch((error) => {
    console.error("Error al sincronizar las tablas:", error);
  });

module.exports = Nota;
