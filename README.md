# Servidor con EXPRESS con uso de motores de plantilla y Websockets

Se crea servidor en express donde se configuran los edpoints. de acuerdo a los siguientes puntos:

## Websockets con página estática usando motor de plantilla Handlebars

c. Se crean dos páginas estáticas empleando handlebars, el cual se instala como una dependencia de express llamada express-handlebars, y el manejo de archivos estáticos de express con las siguientes caracteristicas:

1. Una página en la carpeta views, con nombre home.handlebars, y que se accede a través de la ruta raiz **/**, a través de la cual es posible ver todos los productos existentes.
2. Una página en la carpeta views, con nombre realTimeProducts.handlebars, que se accede a través de la ruta **/realtimeproducts**, a través de la cual es posible visualizar las actualizaciones en tiempo real al momento de agregar un producto o eliminar un producto.
3. Se cuenta con un layout llamado main.handlebars, para la integración de las páginas, que se encuentra dentro de la carpeta layouts dentro de views.

d. Se integra websockets mediante la instalación de la dependencia socket.io, a través de la cual es posible enviar datos en tiempo real:

1. Se crea el archivo reaTimeProducts.router.js, para codificar una función donde estarán disponibles los endpoints, esta función se exporta de tal forma que pueda recibir comoa parámetro el servidor io, y se pueda usar dentro de router para poder realizar los emit correspondientes hacia la pagina de realTimeproducts.handlebars.
2. Los endpoint son GET con raiz en **/realtimeproducts**, POST con raiz en **/product**, y DELETE con raiz en **/product/:pid**, donde pid representa el id de producto que se eliminará.
3. En los endpoints, se integra **io.on** conteniendo un **io.emit**, en el endpoint GET; y e los endpoint POST y DELETE se coloca el **io.emit** unicamente; para enviar el arreglo de productos hacia el cliente, donde se recibe y se renderizan el arreglo, colocando en listas no ordenadas la propiedades para poder visualizar la lista completa de productos.
4. El método POST, se envia el objeto correspondiente al producto nuevo de la siguiente forma:
    {
        "code": String
        "title": String
        "description": String
        "Thumbnails"; [Arreglo de Strings con el link hacia la imagen]
        "price": Number
        "stock": Number
        "status": Boolean
        "category": String
    }

5. El método DELETE, solo recibe el pid a través de query params de la siguiente forma
    "http://localhost:8080/product/'se coloca el pid del producto a eliminar'"

# FIN