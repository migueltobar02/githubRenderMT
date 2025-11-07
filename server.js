const express = require('express');
const autorController = require('./autorController');
const path = require('path');

const app = express();
const PORT = 3000;

console.log('✅ autorController cargado');
console.log('✅ Métodos disponibles:', Object.keys(autorController));

app.use(express.json());

// 💡 MIDDLEWARE DE DEPURACIÓN - Agrega esto
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.url}`);
    console.log('📝 Headers:', req.headers);
    next();
});

// ----------------------
// ENDPOINTS DE LA API (CRUD)
// ----------------------

// Ruta de prueba simple PRIMERO
app.get('/api/test', (req, res) => {
    console.log('✅ Ruta /api/test alcanzada');
    res.json({ message: 'API funcionando correctamente', timestamp: new Date() });
});

// R: READ - Obtener todos los autores
app.get('/api/autores', (req, res) => {
    console.log('✅ Ruta /api/autores alcanzada');
    autorController.obtenerAutores(req, res);
});

// C: CREATE - Crear un nuevo autor
app.post('/api/autores', autorController.crearAutor);

// R: READ - Obtener un autor por ID
app.get('/api/autores/:id', autorController.obtenerAutorPorId);

// U: UPDATE - Actualizar un autor por ID
app.put('/api/autores/:id', autorController.actualizarAutor);

// D: DELETE - Eliminar un autor por ID
app.delete('/api/autores/:id', autorController.eliminarAutor);

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    console.log('✅ Ruta raíz / alcanzada');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 💡 MANEJO DE ERRORES - Agrega esto al final
app.use((req, res) => {
    console.log('❌ Ruta no encontrada:', req.method, req.url);
    res.status(404).json({ 
        error: 'Ruta no encontrada',
        method: req.method,
        url: req.url,
        availableRoutes: ['/api/test', '/api/autores', '/']
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor API REST escuchando en http://localhost:${PORT}`);
});