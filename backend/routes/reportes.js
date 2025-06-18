const express = require('express');
const router = express.Router();
const Reporte = require('../models/Reporte');

// POST: Crear un nuevo reporte
router.post('/', async (req, res) => {
  try {
    // La fecha se guarda automáticamente en el modelo con default Date.now
    const nuevoReporte = new Reporte(req.body);
    await nuevoReporte.save();
    res.status(201).json({ mensaje: 'Reporte guardado exitosamente' });
  } catch (err) {
    console.error('Error al guardar reporte:', err);
    res.status(500).json({ error: 'Error al guardar el reporte' });
  }
});

// GET: Obtener todos los reportes ordenados por fecha descendente
router.get('/', async (req, res) => {
  try {
    const reportes = await Reporte.find().sort({ fecha: -1 });
    res.json(reportes);
  } catch (err) {
    console.error('Error al obtener reportes:', err);
    res.status(500).json({ error: 'Error al obtener reportes' });
  }
});

// GET: Obtener reportes por asesor ordenados por fecha descendente
router.get('/asesor/:nombre', async (req, res) => {
  try {
    const { nombre } = req.params;
    const reportes = await Reporte.find({ asesor: nombre }).sort({ fecha: -1 });
    res.json(reportes);
  } catch (err) {
    console.error('Error al filtrar reportes:', err);
    res.status(500).json({ error: 'Error al obtener reportes por asesor' });
  }
});

// PUT: Actualizar el estado de un reporte (proceso → terminado)
router.put('/:id/estado', async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!['proceso', 'terminado'].includes(estado)) {
      return res.status(400).json({ error: 'Estado inválido' });
    }

    const updateData = { estado };

    if (estado === 'terminado') {
      updateData.fechaTerminacion = new Date();
    } else {
      updateData.fechaTerminacion = null;
    }

    const reporte = await Reporte.findByIdAndUpdate(id, updateData, { new: true });

    if (!reporte) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }

    res.json({ mensaje: 'Estado actualizado', reporte });
  } catch (error) {
    console.error('Error actualizando estado:', error);
    res.status(500).json({ error: 'Error al actualizar el estado del reporte' });
  }
});

module.exports = router;
