// autorController.js
const db = require('./db'); // Conexión a PostgreSQL

// CREATE - Crear autor
exports.crearAutor = async (req, res) => {
  const { nombre, nacionalidad } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO autores (nombre, nacionalidad) VALUES ($1, $2) RETURNING *',
      [nombre, nacionalidad]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear autor:', error);
    res.status(500).json({ error: 'Error al crear autor' });
  }
};

// READ - Obtener todos los autores
exports.obtenerAutores = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM autores ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener autores:', error);
    res.status(500).json({ error: 'Error al obtener autores' });
  }
};

// READ - Obtener autor por ID
exports.obtenerAutorPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM autores WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener autor:', error);
    res.status(500).json({ error: 'Error al obtener autor' });
  }
};

// UPDATE - Actualizar autor
exports.actualizarAutor = async (req, res) => {
  const { id } = req.params;
  const { nombre, nacionalidad } = req.body;
  try {
    const result = await db.query(
      'UPDATE autores SET nombre = $1, nacionalidad = $2 WHERE id = $3 RETURNING *',
      [nombre, nacionalidad, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar autor:', error);
    res.status(500).json({ error: 'Error al actualizar autor' });
  }
};

// DELETE - Eliminar autor
exports.eliminarAutor = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      'DELETE FROM autores WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.json({ mensaje: 'Autor eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar autor:', error);
    res.status(500).json({ error: 'Error al eliminar autor' });
  }
};
