// Mini API de la Cafetería del CRUI
// Node.js + Express

const express = require('express');
const app = express();
const PORT = 3000;

// Este "middleware" permite que Express entienda el JSON que llega en el body
app.use(express.json());

// Nuestra "base de datos": un array en memoria.
// Se pierde cuando se apaga el servidor (y está bien, lo pide la consigna).
const productos = [
  { id: 1, nombre: 'Café con leche', precio: 1800, categoria: 'bebida' },
  { id: 2, nombre: 'Medialuna', precio: 900, categoria: 'comida' },
  { id: 3, nombre: 'Tostado de jamón y queso', precio: 3500, categoria: 'comida' },
  { id: 4, nombre: 'Agua mineral', precio: 1200, categoria: 'bebida' }
];

// Contador para generar ids nuevos (arranca en 5 porque ya existen del 1 al 4)
let proximoId = 5;

// ---------- Funciones de ayuda ----------

// Devuelve un texto con el error si los datos son inválidos, o null si están bien
function validarProducto(datos) {
  if (typeof datos.nombre !== 'string' || datos.nombre.trim() === '') {
    return 'El nombre es obligatorio y no puede estar vacío';
  }
  if (typeof datos.precio !== 'number' || datos.precio <= 0) {
    return 'El precio debe ser un número mayor que cero';
  }
  return null;
}

// ---------- Rutas ----------

// GET / -> mensaje de bienvenida
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de la Cafetería del CRUI!');
});

// GET /api/productos -> devuelve todos los productos
app.get('/api/productos', (req, res) => {
  res.status(200).json(productos);
});

// GET /api/productos/:id -> devuelve un producto por su id
app.get('/api/productos/:id', (req, res) => {
  const id = Number(req.params.id); // el id llega como texto, lo pasamos a número
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.status(200).json(producto);
});

// POST /api/productos -> crea un producto nuevo
app.post('/api/productos', (req, res) => {
  const { nombre, precio, categoria } = req.body;

  const error = validarProducto({ nombre, precio });
  if (error) {
    return res.status(400).json({ error });
  }

  const nuevo = {
    id: proximoId,
    nombre: nombre.trim(),
    precio,
    categoria
  };
  proximoId++;

  productos.push(nuevo);
  res.status(201).json(nuevo);
});

// PUT /api/productos/:id -> modifica un producto existente
app.put('/api/productos/:id', (req, res) => {
  const id = Number(req.params.id);
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const { nombre, precio, categoria } = req.body;

  const error = validarProducto({ nombre, precio });
  if (error) {
    return res.status(400).json({ error });
  }

  // Actualizamos los datos del producto que ya está en el array
  producto.nombre = nombre.trim();
  producto.precio = precio;
  producto.categoria = categoria;

  res.status(200).json(producto);
});

// DELETE /api/productos/:id -> elimina un producto
app.delete('/api/productos/:id', (req, res) => {
  const id = Number(req.params.id);
  const posicion = productos.findIndex((p) => p.id === id);

  if (posicion === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  // splice saca 1 elemento del array a partir de esa posición
  const eliminado = productos.splice(posicion, 1)[0];
  res.status(200).json(eliminado);
});

// ---------- Arrancar el servidor ----------
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
