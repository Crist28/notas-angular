const { Router } = require("express");

const notasController = require("../controllers/NotasController");
const auth = require("../middlewares/auth");

const router = Router();

router.post("/crear_nota",[auth.auth], notasController.crear_nota);
router.get("/obtener_notas", [auth.auth], notasController.obtener_notas_por_cliente);
router.put("/actualizar_nota/:id", [auth.auth], notasController.actualizar_nota);
router.delete("/eliminar_nota/:id", [auth.auth], notasController.eliminar_nota);
router.put("/actualizar_estado_archivada/:id", [auth.auth], notasController.actualizarEstadoArchivada);

module.exports = router;