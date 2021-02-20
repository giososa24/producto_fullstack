## Requesitos

* Node.js
* Postgres
* pgAdmin4
* Docker
* Python3

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Instrucciones

Para instalar las dependencias de npm entrar a la carpeta "frontend" y ejecutar:

### `npm install`

Para crear los contenedores, en la raíz del proyecto ejecutar:

### `docker-compose build`

Una vez finalizado se deben levantar los contenedores con:

### `docker-compose up -d`

Para crear la tabla en la base de datos se deberan seguir las instrucciones dentro del pdf dentro de la raíz del proyecto con nombre "Instrucciones para levantar la BD.pdf"
El usuario y contraseña estan definidos en el archivo "docker-compose.yaml" y son usuario "postgres" y contraseña "pass_test"

### `A grandes razgos es realizar los siguientes pasos:`

* Conectarse a la BD del docker sobre localhost:5433
* Crear la tabla tbl_puntos
* Importar el CSV de los datos contenidos en "puntos_examen_fullstack.csv"

Terminado todo esto reiniciar la ejecución de los contenedores con:

### `docker-compose restart`

Esperar a que se levante el docker de frontend y enseguida se puede abrir la aplicacion entrando a [localhost:3000](http://localhost:3000) en tu explorador.

### `Especificación de archivos correspondientes a cada ejercicio`

* Ejercicio 1: 
    * 1.1 Para levantar la base de datos las instrucciones se encuentran en el archivo "Instrucciones para levantar la BD.pdf" en la raíz del proyecto
    * 1.2 El servicio se encuentra en la carpeta "backend/src" en el archivo "app.py" dentro del mismo se hace la conexión a la BD, se habilitan las CORS y se crea el servicio que recibe latitud y longitud y retorn los puntos encontrados en un radio no mayor a 1KM

 * Ejercicio 2:
    * El servicio creado anteriormente se consume dentro de la carpeta "frontend/Utils" en el archivo ApiUils.js con la función "getPuntos(lat,long)"
    * Los puntos obtenidos del servicio se crean dentro de la carpeta "frontend/mapafunciones" en el archivo mapaFunciones con la función createPointsLayer(lat,long)

 * Ejercicio 3:
    * Las direcciones se obtienen de la api de geoapify y se obtienen consumiendo el servicio con la función getDireccion(lat,long) dentro del archivo ApiUils.js, y se pintan en el mapa con la función makeMarkupOnePoint(lat, lng, direccion, nombre) dentro del archivo mapaFunciones.js


