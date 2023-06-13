# Servidor con EXPRESS con uso de motores de plantilla y Websockets

Se crea servidor en express donde se configuran los edpoints. de acuerdo a los siguientes puntos:

## Websockets con página estática usando motor de plantilla Handlebars

c. Se crean dos páginas estáticas empleando handlebars, que instala como una dependencia de express llamada express-handlebars, y el manejo de archivos estáticos de express con las siguientes caracteristicas:

1. Una página en la carpeta views, con nombre home.handlebars, y que se accede a través de la ruta raiz **/**, a través de la cual es posible ver todos los productos existentes.
2. Una página en la carapeta views, con nombre realTimeProducts.handlebars, que se accede a través de la ruta **/realtimeproducts**, a través de la cual es psoble visualizar las actualizaciones en tiempo real al momento de agregar un producto o eliminar un producto.
3. Se cuenta con un layout llamado main.handlebars, para la integración de las páginas, que se encuentra dentro de layouts de la carpeta de views.

d. Se integra websockets mediante la instalación de la dependencia socket.io, a través de la cual es posible enviar datos en tiempo real:

1. Se crea el archivo reaTimeProducts.router.js, para codificar una función donde estarán disponibles los endpoints, esta función se exporta de tal forma que pueda recibir comoa parámetro el servidor io, y se pueda usar dentro de router para poder realizar los emit correspondientes hacia la pagina de realTimeproducts.handlebars.
2. Los endpoint son GET con raiz en **/realtimeproducts**, POST con raiz en **/product**, y DELETE con raiz en **/product/:pid**, donde pid representa el id de producto que se eliminará.
3. En los endpoints se integra **io.on** donde se coloca el **io.emit** para enviar el arreglo de productos hacia el cliente, donde se recibe y se renderizan el arreglo, colocando en listas no ordenadas la propiedades para poder visualizar la lista completa de productos.

# FIN