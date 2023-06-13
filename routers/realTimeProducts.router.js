const express = require('express')
const ProductManager = require('../productManager')
let productsDb = new ProductManager('./products.json')
const { Router } = express

function realTimeProducts (io) {
    const router = new Router()

    router.get('/realtimeproducts', async (req, res) => {
        let products = await productsDb.getProducts()
        io.on('connect', async () => {
            await io.emit('products', products)
        })
        res.render('realTimeProducts', {})
    })

    router.post('/product', async (req, res) => {
        let productToAdd = {...req.body}
        await productsDb.addProduct(productToAdd)
        console.log("Producto agregado con éxito")
        let products = await productsDb.getProducts()
        io.on('connect', async () => {
            await io.emit('products', products)
        })
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
        io.on('connect', async () => {
            await io.emit('products', products)
        })
        res.render('realTimeProducts', {}, () => {
            res.send({
                status: "Success",
                message: "Producto eliminado con exito"
            })
        })
    })

    return router
}

module.exports = realTimeProducts

