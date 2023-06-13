const express = require('express')
const { Router } = express
const ProductManager = require('../productManager')
let productsDb = new ProductManager('./products.json')
const router = new Router()


router.get('/', async (req, res) => {
    let products = await productsDb.getProducts()
    res.render('home', {products})
})

module.exports = router