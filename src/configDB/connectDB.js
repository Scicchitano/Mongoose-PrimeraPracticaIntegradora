const mongoose = require("mongoose")

exports.connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://discicchitano:<discicchitano>@cluster0.tysjmhc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        
        console.log('Base de datos conectada')        
    } catch (error) {
        console.log(error)
    }
}