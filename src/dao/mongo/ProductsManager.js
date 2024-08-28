const express = require('express');
const { productsModel } = require('../models/products.model');

const router = express.Router();

router
    .post('/', async (req, res) => {
        try {
            const { title, description, code, price, status, stock, category, thumbnails } = req.body;

            const productNew = {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            };

            const result = await productsModel.create(productNew);
            
            res.send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            res.status(500).send(`Error de servidor: ${error.message}`);
        }
    })
    .get('/', async (req, res) => {
        try {
            const { limit = 10, page = 1, sort, query } = req.query;
            const products = await productsModel.find({}).limit(Number(limit)).skip((page - 1) * limit).sort(sort);

            res.send({
                status: 'success',
                payload: products
            });
        } catch (error) {
            res.status(500).send(`Error de servidor: ${error.message}`);
        }
    })
    .get('/:pid', async (req, res) => {
        try {
            const { pid } = req.params;
            const product = await productsModel.findOne({ _id: pid });

            res.send({
                status: 'success',
                payload: product
            });
        } catch (error) {
            console.log(error);
        }
    })
    .put('/:pid', async (req, res) => {
        try {
            const { pid } = req.params;
            const bodyData = req.body;
            const result = await productsModel.findOneAndUpdate({ _id: pid }, bodyData, { new: true });

            res.send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            console.log(error);
        }
    })
    .delete('/:pid', async (req, res) => {
        try {
            const { pid } = req.params;
            const result = await productsModel.findByIdAndDelete({ _id: pid });

            res.send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            console.log(error);
        }
    });

module.exports = router;
