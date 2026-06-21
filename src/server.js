require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cita-app')
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error MongoDB:', err));

// Schema para guardar la respuesta de la cita
const citaSchema = new mongoose.Schema({
  respuesta: { type: String, enum: ['si'], required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  lugar: { type: String, required: true },
  nota: { type: String, default: '' },
  creadoEn: { type: Date, default: Date.now }
});

const Cita = mongoose.model('Cita', citaSchema);

// Guardar respuesta de cita
app.post('/api/cita', async (req, res) => {
  try {
    const { respuesta, fecha, hora, lugar, nota } = req.body;

    if (respuesta !== 'si') {
      return res.status(400).json({ error: 'Solo se aceptan respuestas positivas 😏' });
    }

    const nuevaCita = new Cita({ respuesta, fecha, hora, lugar, nota });
    await nuevaCita.save();

    res.status(201).json({
      mensaje: '¡Cita confirmada! Esto va a ser increíble 🌹',
      cita: nuevaCita
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Algo salió mal del lado del servidor' });
  }
});

// Obtener última cita (para confirmar que se guardó)
app.get('/api/cita/ultima', async (req, res) => {
  try {
    const ultima = await Cita.findOne().sort({ creadoEn: -1 });
    if (!ultima) return res.status(404).json({ error: 'No hay citas aún' });
    res.json(ultima);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la cita' });
  }
});

// Fallback: serve index.html para cualquier ruta no encontrada
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌹 Servidor corriendo en puerto ${PORT}`);
});
