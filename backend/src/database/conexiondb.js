const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  username: "root",
  host: "localhost",
  database: "notas",
  password: "",
  port: 3306,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.error("Error al conectarse en la base de datos", err);
    process.exit(1);
  });

module.exports = {
  sequelize,
};
