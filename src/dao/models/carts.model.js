const mongoose = require('mongoose')

const cartsCollection = 'carts'

const cartsSchema = new mongoose.Schema({
	product_id: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	}
})

const cartsModel = mongoose.model(cartsCollection, cartsSchema)

module.exports = {
    cartsModel
}
