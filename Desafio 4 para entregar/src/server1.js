import express from 'express';

import handlebars from "express-handlebars";
import { _dirname } from "./utils.js";

import productsRouter from './Router/product.router.js';
import { productFromSocket } from './Router/product.router.js'
import { deleteFromSocket } from './Router/product.router.js'
import cartsRouter from './Router/carts.router.js';
import viewsRouter from './Router/views.router.js';
import { Server } from 'socket.io';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(_dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", _dirname + "/views");

app.use('/products', productsRouter)
app.use('/carts', cartsRouter)
app.use('/', viewsRouter)




const httpServer = app.listen(8080, () => console.log('Server Ok'))

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    })

    socket.on('newProduct', async (prod) => {
        try {
            const products = await productFromSocket(prod);
            console.log(products)
            socketServer.emit('newProduct', products)
        } catch (error) {
            console.error('Error al agregar el producto:', error.message);
        }
    })

    socket.on('delete', async (idDelete) => {
        try {
            const products = await deleteFromSocket(idDelete);
            console.log(products)
            socketServer.emit('productsMenosDelete', products)
        } catch (error) {
            console.error('Error al agregar el producto:', error.message);
        }
    })


} )

