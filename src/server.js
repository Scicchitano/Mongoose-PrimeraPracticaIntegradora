const express = require('express');
//const cartsRouter = require('../src/routes/carts.router.js');
//const productsRouter = require('../src/routes/products.router');
const handlebars = require('express-handlebars');
const { Server: ServerIO } = require('socket.io');
const fs = require('fs/promises');
const { connectDB } = require('./configDB/connectDB.js');
const userManager = require('../src/dao/mongo/usersManager.js');
const cartManager = require('../src/dao/mongo/CartsManager.js');
const chatManagerRouter = require('../src/dao/mongo/ChatManager.js');
const productManagerRouter = require('../src/dao/mongo/ProductsManager');



const app = express();
const PORT = 3000;

connectDB();

console.log(__dirname + '/public');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('index', {});
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts', {});
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts', {});
});

app.get('/api/chat', (req, res) => {
    res.render('chat/chat', {});
});

app.use('/api/users', userManager);
app.use('/api/carts', cartManager);
app.use('/api/products', (req, res, next) => {
    // Llama a tu función personalizada aquí
    updateJsonClient();
    console.log('UPDATE PRODUCT');
    // Continúa con el siguiente middleware/route handler
    next();
});
app.use('/api/products', productManagerRouter);

// Importa el chatManagerRouter y asigna una ruta adecuada
app.use('/api/chat', chatManagerRouter);

const httpServer = app.listen(8080, () => {
    console.log('Escuchando en el puerto 8080');
});

const io = new ServerIO(httpServer);

let mensajes = [];

async function readFile(path) {
    try {
        const dataProducts = await fs.readFile(path, 'utf-8');
        return JSON.parse(dataProducts);
    } catch (error) {
        return [];
    }
}

async function getProductsByFile(path) {
    const products = await readFile(path);

    if (!products || products.length === 0) {
        return 'producto vacío';
    }

    return products;
}

async function updateJsonClient() {
    try {
        const response = await getProductsByFile('src/jsonDb/Products.json');
        const jsonData = JSON.stringify(response, null, 2);
        io.emit('message', jsonData);
        console.log('\n\n\n\n\n updateJsonClient \n\n\n\n\n' + jsonData);
    } catch (error) {
        console.error('Error al obtener datos JSON:', error);
    }
}

function cbConnection(socket) {
    console.log('cliente conectado');
    updateJsonClient();
    socket.on('message', (data) => {
        console.log(data);
        mensajes.push(data);
        console.log('MENSAJE RECIBIDO EN EL SERVER');
    });
}

io.on('connection', (socket) => {
    cbConnection(socket);
});
