const Notas = require("../models/notas");

// En el controlador de Crear Nota (NotasController.js)
const crear_nota = async (req, res) => {
  try {
    if (!req.body || !req.body.titulo || !req.body.contenido) {
      return res.status(400).json({ error: "Los datos de la nota son requeridos" });
    }

    const { titulo, contenido, archivada } = req.body;

    const clienteId = req.cliente.id;

    const nuevaNota = await Notas.create({
      titulo,
      contenido,
      archivada: archivada || false,
      clienteId: clienteId
    });

    res.json(nuevaNota);
  } catch (error) {
    console.error("Error al crear la nota:", error);
    res.status(500).json({ error: "Error al crear la nota" });
  }
};


const obtener_notas_por_cliente = async (req, res) => {
  try {
    const clienteId = req.cliente.id;

    const notas = await Notas.findAll({
      where: { clienteId: clienteId }
    });

    res.json(notas);
  } catch (error) {
    console.error("Error al obtener las notas del cliente:", error);
    res.status(500).json({ error: "Error al obtener las notas del cliente" });
  }
};

// En el controlador de Actualizar Nota (NotasController.js)
const actualizar_nota = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, contenido, archivada } = req.body;

    const nota = await Notas.findOne({
      where: { id: id, clienteId: req.cliente.id }
    });

    if (!nota) {
      return res.status(404).json({ error: "Nota no encontrada" });
    }

    nota.titulo = titulo || nota.titulo;
    nota.contenido = contenido || nota.contenido;
    nota.archivada = archivada !== undefined ? archivada : nota.archivada; // Actualizar el campo archivada si se proporciona

    const notaActualizada = await nota.save();

    res.json(notaActualizada);
  } catch (error) {
    console.error("Error al actualizar la nota:", error);
    res.status(500).json({ error: "Error al actualizar la nota" });
  }
};


const eliminar_nota = async (req, res) => {
  try {
    const { id } = req.params;

    const nota = await Notas.findOne({
      where: { id: id, clienteId: req.cliente.id }
    });

    if (!nota) {
      return res.status(404).json({ error: "Nota no encontrada" });
    }

    await nota.destroy();

    res.json({ mensaje: "Nota eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar la nota:", error);
    res.status(500).json({ error: "Error al eliminar la nota" });
  }
};

const actualizarEstadoArchivada = async (req, res) => {
  try {
    const { id } = req.params;
    const { archivada } = req.body;

    const nota = await Notas.findOne({
      where: { id: id, clienteId: req.cliente.id }
    });

    if (!nota) {
      return res.status(404).json({ error: "Nota no encontrada" });
    }

    nota.archivada = archivada;

    const notaActualizada = await nota.save();

    res.json(notaActualizada);
  } catch (error) {
    console.error("Error al actualizar el estado de archivada:", error);
    res.status(500).json({ error: "Error al actualizar el estado de archivada" });
  }
};

module.exports = {
  crear_nota,
  obtener_notas_por_cliente,
  actualizar_nota,
  eliminar_nota,
  actualizarEstadoArchivada
};
