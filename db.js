const { Pool } = require('pg');

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
  host: 'dpg-d478icqli9vc738i6b6g-a', // SOLO el hostname  postgresql://miguel:EjEcAizollDD9xBjmTqn17hoT4C4dEU9@dpg-d478icqli9vc738i6b6g-a.oregon-postgres.render.com/dbpostgres_pnlq
  user: 'miguel',
  password: 'EjEcAizollDD9xBjmTqn17hoT4C4dEU9',
  database: 'dbpostgres_pnlq',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  },
  max: 10,
  idleTimeoutMillis: 30000
});

// Probar conexión
pool.connect()
  .then(client => {
    console.log('✅ Conexión exitosa a PostgreSQL');
    client.release();
  })
  .catch(err => console.error('❌ Error al conectar con PostgreSQL:', err));

module.exports = pool;
