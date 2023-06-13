const express = require('express')
const app = express()
const ProductManager = require('./productManager')
let productsDb = new ProductManager('./products.json')
const http = require('http')
const server = http.createServer(app)

//Configuracion Socket.io
const {Server} = require('socket.io')
const io = new Server(server)

const handlebars = require('express-handlebars')
const homeRouter = require('./routers/home.router')
const realTimeProductsRouter = require('./routers/realTimeProducts.router')(io)
const PORT = 8080

//Carpeta de archivos estaticos publicos
app.use(express.static(__dirname+'/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Configuracion de Handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

app.use(homeRouter)
app.use(realTimeProductsRouter)

io.on('connection', (socket) => {
    console.log('User Connected!', socket.id)
})

server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})