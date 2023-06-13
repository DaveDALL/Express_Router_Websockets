const express = require('express')
const ProductManager = require('../productManager')
let productsDb = new ProductManager('./products.json')
const { Router } = express

function realTimeProducts (io) {
    const router = new Router()

    router.get('/realtimeproducts', async (req, res) => {
        let products = await productsDb.getProducts()
        io.on('connection', (socket) => {
            console.log(socket.id)
            io.emit('products', products)
        })
        res.render('realTimeProducts', {})
    })

    router.post('/product', async (req, res) => {
        //const socket = io()
        let productToAdd = {...req.body}
        await productsDb.addProduct(productToAdd)
        console.log("Producto agregado con éxito")
        let products = await productsDb.getProducts()
        io.emit('productspost', products)
        res.render('realTimeProducts', {}, () => {
            res.send({
                status: "Success",
                message: "Producto creado con exito"
            })
        })
        
    })

    router.delete('/product/:pid', async (req, res) => {
        let productToDeleteId = req.params.pid
        await productsDb.deleteProductById(productToDeleteId)
        console.log("Producto eliminado con éxito")
        let products = await productsDb.getProducts()
        io.emit('productsdel', products)
        res.render('realTimeProducts', {}, () => {
            res.send({
                status: "Success",
                message: "Producto creado con exito"
            })
        })
        
    })

    return router
}

module.exports = realTimeProducts

