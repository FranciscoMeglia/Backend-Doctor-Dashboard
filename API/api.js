const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2/promise');
const cors = require('cors');
app.use(cors());
app.use(express.json());

const pool = require('./db-config')

// TRAER PACIENTES (GET)
app.get('/pacientes', async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM pacientes');
    res.json(rows);
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).send('Error en el servidor');
  }
});

// CREAR PACIENTE (POST)
app.post('/nuevoPaciente', async (req, res) => {
    try {
        const { nombre, edad, email , dni , genero , ficha} = req.body;

        if (!nombre || !edad || !email || !dni || !genero) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const [result] = await pool.query('INSERT INTO pacientes (nombre, edad, email, dni, genero, ficha) VALUES (?, ?, ?, ?, ?, ?)', [nombre, edad, email, dni, genero, ficha]);

        res.status(201).json({ id: result.insertId, nombre, edad, email, dni });
    } catch (error) {
        console.error('Error al crear un nuevo paciente:', error);
        res.status(500).send('Error en el servidor');
    }
});

// ELIMINAR PACIENTE (DELETE)
app.delete('/eliminarPaciente/:dni', async (req, res) => {
    try {
        const pacienteDni = req.params.dni;

        if (!pacienteDni) {
            return res.status(400).json({ error: 'Se requiere el DNI del paciente' });
        }

        const [result] = await pool.query('DELETE FROM pacientes WHERE dni = ?', [pacienteDni]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Paciente no encontrado' });
        }

        res.json({ message: 'Paciente eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el paciente:', error);
        res.status(500).send('Error en el servidor');
    }
});

// ACTUALIZAR PACIENTE (PUT)
app.put('/actualizarPaciente/:dni', async (req, res) => {
  try {
    const pacienteDni = req.params.dni;
    const { nombre, edad, email, dni , genero} = req.body;

    if (!pacienteDni || !nombre || !edad || !email || !dni) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const [result] = await pool.query('UPDATE pacientes SET nombre = ?, edad = ?, email = ?, dni = ? WHERE dni = ?', [nombre, edad, email, dni, pacienteDni]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    res.json({ message: 'Datos del paciente modificados correctamente' });
  } catch (error) {
    console.error('Error al modificar los datos del paciente:', error);
    res.status(500).send('Error en el servidor');
  }
});

app.listen(port, () => {
  console.log('Servidor escuchando en el puerto ' + port);
});

