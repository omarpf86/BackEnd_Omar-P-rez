
//import { initMongoDB } from './daos/mongodb/connection.js';
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
import ticketsRouter from './routes/ticket.router.js';
import mockingProductsRouter from './routes/mockingProducts.router.js'


import { errorHandler } from './middlewares/errorHandler.js';
import passport from 'passport';
import './passport/local-strategy.js';
import "./passport/gitHub-strategy.js";
//import './database.js';
import config from './config.js';
//import 'dotenv/config' 

import * as messageService from "./services/message.services.js";
import * as productService from "./services/product.services.js";
import * as cartService from "./services/cart.services.js";

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
app.use('/public', express.static(_dirname + '/public'));

app.use(passport.initialize());
app.use(passport.session());


app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", _dirname + "/views");

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use('/homepage', homepage);
app.use('/mockingproducts', mockingProductsRouter);
app.use('/messages', messagesRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/users', usersRouter);
app.use('/api/views', viewsRouter);
app.use('/api/tickets', ticketsRouter);

app.use(errorHandler); 

//if (process.env.PERSISTENCE === 'MONGO') initMongoDB();

//initMongoDB();

const PORT = config.PORT;

const httpServer = app.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT} in ${config.NODE_ENV} mode`));

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
    //DESPLEGAR LISTA EN ADMINISTRADOR DE PRODUCTOS--------------------------------
    socket.on('productList', async () => {
        try {
            const products = await productService.getAll()
            console.log("en el server la lista es", products)
            socketServer.emit('productList2', products.payload)
        } catch (error) {
            console.error('Error al agregar el producto:', error.message);
        }
    })

   

   

   //LISTA DE PRODUCTOS DISPONIBLES PARA CARRITOS-----------------------------------
    socket.on('getListproducts', async () => {
        try {
            const products = await productService.getAll()
            console.log("la lista de productos es:", products.payload)
            //const productsArray = products.payload
            socketServer.emit('listProducts1', products.payload)
        } catch (error) {
            console.error('Error al agregar el producto:', error.message);
        }
    })

    // AGREGAR PRODUCTOS AL CARRITO------------------------------------------- 
    socket.on('addProduct1', async (cid) => {
        try {
            const productIncart = await cartService.getById(cid)
            socketServer.emit("addProduct2",productIncart.products)
        } catch (error) {
            console.error('Error al agregar el producto:', error.message);
        }
    })
    
    //BORRAR PRODUCTO DEL CARRITO----------------------------------------------------
    socket.on('deleteProduct', async (productDelete) => {
        try {
            const cid = productDelete.idC
            console.log ("cid delete es", cid)
            const id = productDelete.idP
            console.log ("id delete es ", id)
            const product = await cartService.removeProdToCart(cid, id);
            console.log(product)
            const productIncart = await cartService.getById(cid)
            socketServer.emit("deleteProduct2", productIncart.products)
        } catch (error) {
            console.error('Error al agregar el producto:', error.message);
        }
    }) 
    
    //LIMPIAR CARRITO---------------------------------------------------------
    socket.on('clearCart', async (idCart) => {
        try {
            const cart = await cartService.clearCart(idCart);
            console.log ("el carrito vacio ",cart)
            socketServer.emit('emptyCart', cart.products)
        } catch (error) {
            console.error('Error al agregar el producto:', error.message);
        }
    })



    
}) 

