
import { initMongoDB } from './daos/mongodb/connection.js';
import express from 'express';
import morgan from 'morgan';

import handlebars from "express-handlebars";
import { _dirname } from "./utils.js";

import { Server } from 'socket.io';

import productsRouter from './routes/product.router.js';
import cartsRouter from './routes/cart.router.js';
import messagesRouter from './routes/message.router.js';

import { errorHandler } from './middlewares/errorHandler.js';
import 'dotenv/config'
import * as service from "./services/message.services.js";



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(_dirname + '/public'));
app.use(morgan('dev'));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", _dirname + "/views");



app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/messages', messagesRouter);

app.use(errorHandler);

/*if (process.env.PERSISTENCE === 'MONGO')*/ initMongoDB();

const PORT = 8080;

const httpServer=app.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT}`));

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    console.log('new connection', socket.id)
    socketServer.emit('messages', await service.getAll())

    socket.on('disconnect', () => {
        console.log(' User disconnect', socket.id)
    });

    socket.on('newUser', (user) => {
        console.log(`> ${user} ha iniciado sesión`);
        socket.broadcast.emit('newUser', user);
    })

    socket.on('chat:message', async (msg) => {
        await service.create(msg);
        socketServer.emit('messages', await service.getAll());   
    })


    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data)
    })


})

