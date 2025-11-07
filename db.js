const { Pool } = require('pg');

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
  host: 'localhost',      // Servidor
  user: 'miguel',         // Tu usuario de PostgreSQL
  password: '12345678',     // Contraseña
  database: 'IA-CRUD',    // Nombre de la base de datos
  port: 5432,             // Puerto por defecto de PostgreSQL
  max: 10,                // Máximo número de conexiones
  idleTimeoutMillis: 30000, // Tiempo antes de cerrar una conexión inactiva
});

// db.js



// Probar conexión
pool.connect()
  .then(client => {
    console.log('✅ Conexión exitosa a PostgreSQL');
    client.release();
  })
  .catch(err => console.error('❌ Error al conectar con PostgreSQL:', err.stack));

module.exports = pool;
