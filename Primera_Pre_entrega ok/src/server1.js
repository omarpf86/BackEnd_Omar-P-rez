import express from 'express';


import productsRouter from './Router/product.router.js';
import cartsRouter from './Router/carts.router.js';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/products', productsRouter)
app.use('/carts', cartsRouter)


const port = 8080;
app.listen(port,()=>console.log('Server Ok'))