📚 Proyecto CRUD de Autores con Node.js, Express y PostgreSQL

Este repositorio contiene el ejercicio práctico de la construcción de una aplicación tipo CRUD (Crear, Leer, Actualizar, Eliminar) para la gestión de una tabla de autores, utilizando Node.js, el framework Express para el Backend y PostgreSQL como base de datos, con una interfaz de usuario básica en HTML/CSS/JavaScript.

⚙️ Estructura de la Base de Datos

La base de datos se llama IA-CRUD, y la tabla para la gestión de autores (autor) tiene la siguiente estructura SQL:

CREATE TABLE autor (
    id SERIAL PRIMARY KEY,                   -- Identificador único del autor.
    nombre VARCHAR(100) NOT NULL,            -- Nombre completo del autor (obligatorio).
    nacionalidad VARCHAR(50),                -- Nacionalidad del autor (opcional).
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha de creación automática.
);

🚀 Instalación y Configuración del Proyecto

Para ejecutar este proyecto, debe tener instalado Node.js y un servidor PostgreSQL activo.

2.1. Inicialización y Dependencias

Ejecute los siguientes comandos en la carpeta raíz del proyecto (IA-CRUD):

npm init -y
npm install express pg

2.2. Configuración de la Base de Datos (db.js)

Cree un archivo llamado db.js y configure los parámetros de conexión para la base de datos IA-CRUD:

// db.js
const { Pool } = require('pg');

// Configuración de la conexión a la base de datos "IA-CRUD"
const pool = new Pool({
    host: 'localhost',       // Dirección del servidor de PostgreSQL
    user: 'postgres',        // Usuario de PostgreSQL
    password: 'tu_contraseña', // ¡IMPORTANTE! Cambiar por tu contraseña real.
    database: 'IA-CRUD',     // Nombre de la base de datos
    port: 5432               // Puerto por defecto de PostgreSQL
});

module.exports = pool;


Este módulo exporta un pool de conexiones, permitiendo el uso de promesas con consultas asincrónicas.

3. Ejecutar el Servidor

Inicie el servidor Express desde la terminal:

npm start


Debería ver el mensaje de confirmación de que el servidor está escuchando en el puerto 3000:

🚀 Servidor API REST y Frontend escuchando en http://localhost:3000

🌐 API REST Endpoints (Backend)

El servidor Express (server.js) define los siguientes endpoints para manejar las operaciones CRUD:

Operación	Método HTTP	URL del Endpoint	Cuerpo de la Petición (Ejemplo JSON)
Crear (C)	POST	/api/autores	{"nombre": "Julio Cortázar", "nacionalidad": "Argentina"}
Leer Todos (R)	GET	/api/autores	—
Leer Uno (R)	GET	/api/autores/:id	—
Actualizar (U)	PUT	/api/autores/:id	{"nombre": "Julio Cortázar (Editado)", "nacionalidad": "Francia"}
Eliminar (D)	DELETE	/api/autores/:id	—

La lógica del controlador para cada operación se encuentra en el archivo autorController.js.

🖥️ Interfaz de Usuario (Frontend)

El frontend es el archivo HTML (por ejemplo, autor_crud.html o index.html) que contiene el formulario y la tabla de listado, conectado a la API REST mediante JavaScript.

Para acceder al formulario en http://localhost:3000, el archivo HTML debe ubicarse en una carpeta llamada public.

📜 Lógica CRUD en el Frontend (JavaScript)

El JavaScript implementado en el Frontend maneja el flujo completo de la aplicación, incluyendo:

Crear (POST): Maneja el clic en el botón "Crear" y envía los datos a /api/autores.

Actualizar (PUT): Requiere que se seleccione un autor de la lista, luego envía una solicitud PUT al endpoint con el ID.

Eliminar (DELETE): Requiere un ID, pide confirmación y envía una solicitud DELETE.

Listar (GET): La función cargarAutores() consulta la API y renderiza los datos en la tabla (al cargar la página o al hacer clic en "Actualizar Lista").

Selección de Datos: Al hacer clic en una fila de la tabla, los datos del autor se cargan en el formulario.

⚠️ Solución de Errores Comunes
Problema Reportado	Causa	Solución
Cannot GET / en http://localhost:3000	La API REST solo tiene rutas definidas con /api/autores.	Configurar Express (server.js) para servir el archivo autor_crud.html desde la carpeta public en la ruta raíz (/).
Todos los botones crean autores nuevos	El JavaScript inicial solo enviaba peticiones POST.	Modificar el HTML para que los botones no sean de tipo submit y reescribir el JS para manejar explícitamente PUT, DELETE y POST.
El HTML no se ejecuta	El servidor Node.js/Express no sirve archivos estáticos por defecto.	Usar express.static y res.sendFile en server.js para servir el contenido del frontend.
