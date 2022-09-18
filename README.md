# Pequeño preyecto 
## Tabla de contenidos
* [Info general](#info-general)
* [Tecnologias](#tecnologias)
* [Configuración](#configuración)
* [Scripts](#scripts)

## Info general
API que prove en formato JSON el estado del tiempo basado en diferentes endpoints.
Ademas estan especificados los tests con tap.
A continuación se detallan los endpoints implementados:

* /location\
Devuelve los datos de ubicación city según ip-api.
* /current[/city]\
City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según ip-api y el estado del tiempo actual.
* /forecast[/city]\
City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según ip-api y el estado del tiempo a 5 días.

	
## Tecnologias
Proyecto creado con:
*   "fastify": "^4.6.0",
*   "fastify-cli": "^4.4.0",
*   "fastify-plugin": "^4.2.1",
*   "node-fetch": "^2.6.7",
*   "supertest": "^6.2.4"

## Configuración
Para ejecutar este proyecto, instálelo localmente usando npm:

```
$ npm install
```
y luego pegue en el directorio raiz del proyecto el archivo .env. 
## Scripts

En el directorio del proyecto, puede ejecutar:

### `npm run dev`

Para iniciar la aplicación en modo dev.\
Abra [http://localhost:3000](http://localhost:3000) para verlo en el navegador.

### `npm start`

Para modo produccion.

### `npm run test`

Ejecutar los casos de prueba.
