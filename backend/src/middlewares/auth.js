const jwt = require("jsonwebtoken");
const { isBefore } = require("date-fns");

const secret = process.env.JWT_SECRET;

exports.auth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: "Falta Encabezado De Autorizacion" });
    }

    const token = req.headers.authorization.replace(/['"]+/g, "");

    const segmentos = token.split(".");
    if (segmentos.length !== 3) {
      return res.status(401).send({ message: "Formato Token Invalido" });
    }

    let payload;
    try {
      payload = jwt.verify(token, secret);
      console.log("Payload del token:", payload);

      const now = Date.now();
      if (isBefore(now, payload.exp)) {
        return res.status(401).send({ message: "Token Expirado" });
      }
    } catch (error) {
      console.error("Error al verificar el token:", error);
      return res.status(401).send({ message: "Token Invalido" });
    }

    req.cliente = {
      id: payload.sub,
    };

    next();
  } catch (error) {
    console.error("Error en el middleware de autenticación:", error);
    return res.status(500).send({ message: "Error en el servidor" });
  }
};
