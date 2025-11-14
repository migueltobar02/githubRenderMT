const { Pool } = require('pg');

const pool = new Pool({
  host: 'dpg-d478icqli9vc738i6b6g-a', 
  user: 'miguel',
  password: 'EjEcAizollDD9xBjmTqn17hoT4C4dEU9',
  database: 'dbpostgres_pnlq',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;


// db.js



// Probar conexión
pool.connect()
  .then(client => {
    console.log('✅ Conexión exitosa a PostgreSQL');
    client.release();
  })
  .catch(err => console.error('❌ Error al conectar con PostgreSQL:', err.stack));

module.exports = pool;
