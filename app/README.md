# Setup para desarrollo

## Setup para correr en entorno local
### La primera vez
 1. Descargarse node.js versión 8.5.0

  2. Configurar las variables de entorno.
  Para cada una de las variables de entorno en .env.local definir el valor que corresponda y setearlas en el shell:
  ```sh
  export <VARNAME>=<VALUE>
  ```

## Setup para correr con docker
### La primera vez hay que buildear la imagen
1. Build
```sh
cd app
docker build -t app .   
```

2. Definir las variables de entorno
Para cada una de las variables de entorno en .env.local definir el archivo `app/.env` con los nombres y valor.


### Levantar la imagen
```sh
cd app
docker run --rm --env-file .env -p 3009:3009 --name app app
```
Para verificar que todo funciona conectarse a http://localhost:3000/posts/login