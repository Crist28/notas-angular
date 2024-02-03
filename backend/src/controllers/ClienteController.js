const Cliente = require("../models/cliente");
const jwt = require("../helpers/jwt");
const bcrypt = require("bcrypt");

const registro_cliente = async (req, res) => {
  try {
    const data = req.body;
    const clienteExistente = await Cliente.findOne({
      where: { email: data.email },
    });
    if (clienteExistente) {
      return res.status(409).send({
        msg: "El correo ya existe en la base de datos",
        data: undefined,
      });
    }
    if (!data.password) {
      return res
        .status(400)
        .send({ msg: "No hay una contraseña", data: undefined });
    }
    // Crear un objeto con los campos requeridos
    const nuevoCliente = {
      nombres: data.nombres,
      apellidos: data.apellidos,
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
      telefono: data.telefono,
      genero: data.genero,
      f_nacimiento: data.f_nacimiento,
      dni: data.dni,
    };

    // Guardar el registro
    await Cliente.create(nuevoCliente);

    res.status(201).send({ data: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error en el servidor", data: undefined });
  }
};

const login_cliente = async (req, res) => {
  try {
    const data = req.body;

    if (!data.email || data.email.trim() === "") {
      return res
        .status(400)
        .send({
          msg: "El campo de correo está vacío o no se proporciona",
          data: undefined,
        });
    };

    const cliente = await Cliente.findOne({ where: { email: data.email } });

    if (!cliente) {
      return res
        .status(404)
        .send({ msg: "El correo no está registrado", data: undefined });
    };

    const passwordMatch = await bcrypt.compare(data.password, cliente.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .send({ msg: "Contraseña incorrecta", data: undefined });
    };

    const token = jwt.createToken(cliente);
    res.status(200).send({ data: { cliente, token } });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error en el servidor", data: undefined });
  }
};

module.exports = {
  registro_cliente,
  login_cliente,
};
