# QR-API Arquitectura de software II-2022

### Api que genera codigos QR con logo

## TECNOLOGIAS:

- Lenguaje: JavaScript <code><img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" width="20" height="20" title="JavaScript"></code>

- Entorno de ejecución: NodeJs <code><img  src="https://cdn.icon-icons.com/icons2/2415/PNG/512/nodejs_plain_logo_icon_146409.png" width="20" height="20" title="NodeJs"></code>

- Framework: Express <code><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" width="20" height="20" title="Mysql"></code>

- Base de datos: MySql <code><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" width="20" height="20" title="Mysql"></code>

# Consumo de API:

## Autenticación: 

### Registrar

- Peticion: POST 
- Url: https://codeqr-generate.herokuapp.com/api/auth/register
- Body: 

```json
    {
        "username": "prueba",
        "password": "123456",
        "email": "correo@hotmail.com",
        "name": "Prueba"
    }
```
- Respuesta:
```json
{
    "msg": "Registrado con exito",
    "usuario": {
        "username": "prueba",
        "password": "",
        "email": "correo@hotmail.com",
        "name": "Prueba",
        "id_usuario": 1
    }
}
```    
### Login

- Peticion: POST 
- Url: https://codeqr-generate.herokuapp.com/api/auth/login
- Body: 
```json
    {
        "username": "prueba",
        "password": "123456"
    }
``` 
- Respuesta: 
```json
{
    "usuario": {
        "id_usuario": 1,
        "username": "prueba",
        "password": "",
        "email": "correo@hotmail.com",
        "name": "Prueba"
    }
}
``` 

## Codigos QR

### Generar QR

- Peticion: POST 
- Url: https://codeqr-generate.herokuapp.com/api/code/
- Body: 
```json
    {
        "url": "https://es-la.facebook.com/",
        "user": "Id del usuario"
    }
``` 
- Respuesta: 

```json
    {
    "msg": "Registrado con exito",
    "qr_code": {
            "url": "https://es-la.facebook.com/",
            "url_code": "Base64 Imagen QR",
            "user": "Id de usuario se envia en el body",
            "type": 1,
            "date": ""
        }
    }
``` 

### Consultar historial

- Peticion: POST 
- Url: https://codeqr-generate.herokuapp.com/api/code/historial/
- Body:
```json
    {
        "user" : "Id del usuario"
    }
```
- Respuesta: 
```json
{
    "msg": "Historial de consultas",
    "codes": [
        {
            "id_code": 1,
            "url": "https://www.algo.com",
            "url_code": "Base64 Imagen QR",
            "user": "Id de usuario se envia en el body",
            "type": 1,
            "date": ""
        },
        {
            "id_code": 2,
            "url": "https://www.algo.com/",
            "url_code": "Base64 Imagen QR",
            "user": "Id de usuario se envia en el body",
            "type": 1,
            "date": ""
        }
    ]
}

```