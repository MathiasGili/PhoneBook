# PhoneBook Back End

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
docker build -t api .   
```

2. Definir las variables de entorno
Para cada una de las variables de entorno en .env.local definir el archivo `api/.env` con los nombres y valor.


### Levantar la imagen
```sh
cd app
docker run --rm --env-file .env -p 3000:3000 --name api api
```
### API

## Available Endpoints

### Register
**[POST]** /user

Request parameters:

Body:
```
{
    "email": "mathiasgili@gmail.com",
    "password": "gili"
}
```

### Login
**[POST]** /login

Request parameters:

Body:
```
{
    "email": "mgili@gmai.com",
    "password": "9090"
}
```

### Send email to recover password
**[POST]** /recoveryPassword

Request parameters:

Body:
```
{
    "email": "pepe",
    "password": "ochoa",
    "password": "iochis"
}

```

### Update user password
**[PATCH]** /user

Request parameters:

Body:
```
{
    "email": "pepe",
    "password": "ochoa"
}
```

### Create new contact
**[POST]** /contacts

Request parameters:

Body:
```
{
"firstName": "Teresa",
"lastName": "sellanes",
"phone": "+598 98451946"
}
```

Headers: 
```
{
'Authorization': 'Bearer ' + token
}
```

### Get all contacts for a user
**[GET]** /contacts

Request parameters:

Headers:
```
{
'Authorization': 'Bearer ' + token
}
```

### Get contact for a user
**[GET]** /contacts/:_id

Request parameters:

Params:
```
:_id
```

Headers: 
```{
'Authorization': 'Bearer ' + token
}
```

### Delete contact for a user
**[DELETE]** /contacts/:_id

Request parameters:

Params:
```
:_id
```
Headers: 
```{
'Authorization': 'Bearer ' + token
}
```

### Update contact for a user
**[PATCH]** /contacts/

Request parameters:

Body:
```
{
"firstName": "mathias",
"lastName": "gili",
"phone": "+598 95973363",
"_id": "61f4c67c48cfa608e4640470"
}

```

Headers: 
```{
'Authorization': 'Bearer ' + token
}
```

## Template for .env file

```
DB_URI=***
APP_PORT=***
JWT_SECRET=***
BASE_URL=***
PASS_EMAIL=***
```
