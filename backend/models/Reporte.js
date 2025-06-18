const mongoose = require('mongoose');

const ReporteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  extension: { type: String, required: true },
  grupo: { type: String, required: true },
  sucursal: { type: String, required: true },
  departamento: { type: String, required: true },
  descripcion: { type: String, required: true },
  incidente: { type: String, required: true },
  urgencia: { type: String, required: true },
  asesor: { type: String, required: true },

  fecha: { type: Date, default: Date.now }, // Fecha de creación visible

  // Campo para autodestrucción (TTL 30 minutos)
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 30, // 30 minutos en segundos
  },

  fechaTerminacion: {
    type: Date,
    default: null,
  },

  estado: {
    type: String,
    enum: ['proceso', 'terminado'],
    default: 'proceso',
  }
});

// Virtuals para formato local
ReporteSchema.virtual('fechaMexico').get(function () {
  if (!this.fecha) return null;
  return this.fecha.toLocaleString('es-MX', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
});

ReporteSchema.virtual('fechaTerminacionMexico').get(function () {
  if (!this.fechaTerminacion) return null;
  return this.fechaTerminacion.toLocaleString('es-MX', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
});

ReporteSchema.set('toJSON', { virtuals: true });
ReporteSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Reporte', ReporteSchema);
