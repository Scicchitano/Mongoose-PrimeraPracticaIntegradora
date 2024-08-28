const express = require('express')
const {cartsModel} = require('../models/carts.model')

const router       = express.Router()

router
    .post('/', async (req, res)=>{
        try {

            const {product_id, price, quantity} = req.body
   
            const cartNew = {
                product_id,
                price, 
                quantity  
            }

            const result = await cartsModel.create(cartNew)
            console.log(result)
            res.send({
                    stauts: 'success',
                    payload: result
                })
        } catch (error) {
            res.status(500).send(`Error de server ${error.message}`)
        }
        // res.send('create carts')
    })
    .get('/:cid', async (req, res)=>{
        try {
            const {cid} = req.params
            const cart = await cartsModel.find({_id: cid})
            res.send({
                status: 'success',
                payload: cart
            })
        } catch (error) {
            console.log(error)
        }
        // res.send('get cart')
    })
    /*.post('/:cid/products/:pid', async (req, res)=>{
        try {
            const {cid, pid} = req.params // pid es el id de producto
            const result = await cartsModel.findOne(Number({_id: cid}), Number(pid))
            res.send({
                status: 'success',
                payload: result
            })
        } catch (error) {
            console.log(error)
        }
        
    })*/

module.exports = router