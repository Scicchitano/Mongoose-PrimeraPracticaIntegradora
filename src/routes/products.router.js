const express = require('express')
const ProductsManagerFS = require('../dao/managers/productsManagerFS')

const router       = express.Router()
const productsService = new ProductsManagerFS()

router
    .post('/', async (req, res)=>{
        try {
            const result = await productsService.createProduct()
            //console.log(result)
            res.send({
                stauts: 'success',
                payload: result
            })
        } catch (error) {
            res.status(500).send(`Error de server ${error.message}`)
        }
        // res.send('create carts')
    })
    .get('/', async (req, res)=>{
        try {
            const limit = req.query.limit;
            //console.log("LIMITE = " + limit)

            const result = limit==undefined ? await productsService.getProducts() : await productsService.getProducts(parseInt(limit))
            
            //console.log(result)
            res.send({
                stauts: 'success',
                payload: result
            })
        } catch (error) {
            res.status(500).send(`Error de server ${error.message}`)
        }
    })
    .get('/:pid', async (req, res)=>{
        try {
            const {pid} = req.params
            const products = await productsService.getProductById(parseInt(pid))
            res.send({
                status: 'success',
                payload: products
            })
        } catch (error) {
            console.log(error)
        }
        // res.send('get cart')
    })
    .put('/:pid', async (req, res)=>{
        try {
            const {pid} = req.params
            const bodyData = req.body;
            const result = await productsService.addDataToProduct(parseInt(pid),bodyData)
            res.send({
                status: 'success',
                payload: result
            })
        } catch (error) {
            console.log(error)
        }
    })
    .delete('/:pid', async (req, res)=>{
        try {
            const {pid} = req.params
            const result = await productsService.deleteProduct(parseInt(pid))
            res.send({
                status: 'success',
                payload: result
            })
        } catch (error) {
            console.log(error)
        }
    })
    .post('/:cid/products/:pid', async (req, res)=>{
        try {
            const {cid, pid} = req.params // pid es el id de producto
            const result = await productsService.addProductToCart(Number(cid), Number(pid))
            res.send({
                status: 'success',
                payload: result
            })
        } catch (error) {
            console.log(error)
        }
        
    })

module.exports = router


