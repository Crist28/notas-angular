const express = require("express");
const cors = require("cors");

const { sequelize } = require('./database/conexiondb');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.routersCliente = "/api";
    this.routersNotas = "/api";

    this.middlewares();
    this.conexiondb();
    this.routers();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  };
  conexiondb(){
    sequelize;
  };
  routers() {
    this.app.use(this.routersCliente, require("./routers/cliente"));
    this.app.use(this.routersNotas, require("./routers/notas"));
  };
  listen(){
    this.app.listen(this.port, () =>{
        console.log("Puerto corriendo en el servidor: ", this.port);
    });
  }
}

module.exports = { Server };
