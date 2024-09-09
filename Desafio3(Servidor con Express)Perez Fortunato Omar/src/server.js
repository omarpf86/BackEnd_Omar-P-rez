import express from 'express';

import ProductManager from './Manager/products_manager.js';//porque lo toma de manager
const productManager = new ProductManager('./products.json')

const app = express();

app.use(express.json())

app.get('/products', async (req, res) => { 
    try {
        const { limit } = req.query
        const products = await productManager.getProducts()
        let arrayLimit=[]
        if (!parseInt(limit)) { res.status(200).json(products)
        }
        else {
            if (parseInt(limit) > products.length) {
                for (let i = 0; i < products.length; i++){
                    arrayLimit.push(products[i])
                }
            res.status(200).json(arrayLimit)   
            }
            else if (parseInt(limit) <= products.length) {
                for (let i = 0; i < parseInt(limit); i++) {
                    arrayLimit.push(products[i])
                }
                res.status(200).json(arrayLimit)
            }
        }
        
       
   }catch(error){res.status(500).json({msg:error.message})}

})

app.post('/products', async (req, res) => {
    try {
        const product = await productManager.createProduct(req.body)
        res.status(200).json(product)

    } catch (error) { res.status(500).json({ msg: error.message }) }

})


app.get('/products/:id', async (req, res) => {
    try {
        const{id}=req.params
        const product = await productManager.getProductById(id)
        if (!product) res.status(404).json({ msg: 'Product not found' })
        res.status(200).json(product)

    } catch (error) { res.status(500).json({ msg: error.message }) }

})

app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await productManager.updateProduct(req.body,id)
        if (!product) res.status(404).json({ msg: 'Error en la actualización' })
        res.status(200).json(product)

    } catch (error) { res.status(500).json({ msg: error.message }) }

})


app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const delproduct = await productManager.deleteProduct(id)
        if (!delproduct) res.status(404).json({ msg: 'Error en la eliminación' })
        else res.status(200).json({ msg: 'Producto eliminado con exito' })

    } catch (error) { res.status(500).json({ msg: error.message }) }

})










const port = 8080;
app.listen(port, () => console.log(`Server ok on point ${port}`))

