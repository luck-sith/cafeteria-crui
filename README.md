# Mini API de la Cafetería del CRUI

API hecha con Node.js y Express para consultar y administrar los productos del menú.
Los datos se guardan en un array, así que se pierden al apagar el servidor.

## Instalación

1. Tener instalado [Node.js](https://nodejs.org).
2. Clonar el repositorio y entrar a la carpeta del proyecto.
3. Instalar las dependencias:

   ```
   npm install
   ```

## Ejecución

```
npm start
```

El servidor queda escuchando en http://localhost:3000

## Rutas

| Método | Ruta                 | Descripción                      |
|--------|----------------------|----------------------------------|
| GET    | /                    | Mensaje de bienvenida            |
| GET    | /api/productos       | Lista todos los productos        |
| GET    | /api/productos/:id   | Busca un producto por id         |
| POST   | /api/productos       | Crea un producto                 |
| PUT    | /api/productos/:id   | Modifica un producto             |
| DELETE | /api/productos/:id   | Elimina un producto              |

Ejemplo de body para POST y PUT:

```json
{ "nombre": "Submarino", "precio": 2200, "categoria": "bebida" }
```

## Pruebas

Las capturas de las pruebas están en la carpeta `capturas/`.
