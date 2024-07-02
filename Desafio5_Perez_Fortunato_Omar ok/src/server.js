
import { initMongoDB } from './daos/mongodb/connection.js';
import MongoStore from 'connect-mongo';
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';

import handlebars from "express-handlebars";
import { _dirname } from "./utils.js";

import { Server } from 'socket.io';

import productsRouter from './routes/product.router.js';
import homepage from './routes/homepage.router.js';
import cartsRouter from './routes/cart.router.js';
import messagesRouter from './routes/message.router.js';
import usersRouter from './routes/user.router.js';
import viewsRouter from './routes/view.router.js';

import { errorHandler } from './middlewares/errorHandler.js';
import 'dotenv/config'
import * as messageService from "./services/message.services.js";
import * as productService from "./services/product.services.js";


const storeConfig = {
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        crypto: { secret: process.env.SECRET_KEY },
        ttl: 180,
    }),
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 180000 }
};


const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session(storeConfig))
app.use('/public',express.static(_dirname + '/public'));


app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", _dirname + "/views");



app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use('/homepage', homepage);
app.use('/messages', messagesRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/users', usersRouter);
app.use('/api/views', viewsRouter);

app.use(errorHandler);

if (process.env.PERSISTENCE === 'MONGO') initMongoDB();

const PORT = 8080;

const httpServer=app.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT}`));

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    console.log('new connection', socket.id)

    socketServer.emit('messages', await messageService.getAll())

    socket.on('disconnect', () => {
        console.log(' User disconnect', socket.id)
    });

   socket.on('newUser', (user) => {
        console.log(`> ${user} ha iniciado sesión`);
        socket.broadcast.emit('newUser', user);
    })

    socket.on('chat:message', async (msg) => {
        await messageService.create(msg);
        socketServer.emit('messages', await messageService.getAll());   
    })


    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data)
    })

    socket.on('newProduct', async (prod) => {
        try {
            const product = await productService.create(prod);
            const products= await productService.getAll()
            console.log(products.payload)
            socketServer.emit('newProduct', products.payload)
        } catch (error) {
            console.error('Error al agregar el producto:', error.message);
        }
    })

    socket.on('delete', async (idDelete) => {
        try {
            const product = await productService.remove(idDelete);
            const products = await productService.getAll()
            socketServer.emit('productsMenosDelete', products.payload)
        } catch (error) {
            console.error('Error al agregar el producto:', error.message);
        }
    })

    
}) 

