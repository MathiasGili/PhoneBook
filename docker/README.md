# Stack deploy para desarrollo


Para levantar todo el stack pararse en `./docker`

Agregar el archivo .env con sus correspodientes variables

Ejecutar:
```sh
docker run -d -p 5000:5000 --name registry registry:2.7

sh deploy.sh
```

Se puede acceder a la app web en [http://localhost/](http://localhost/)

Para detener el stack:

Ejecutar:
```sh
sh stack_prod_stop.sh
```
