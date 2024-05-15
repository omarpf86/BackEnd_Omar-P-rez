import { Router } from "express"
const router = Router();
import { bodyValidator } from "../Middlewares/body.validator.js";

import ProductManager from '../Manager/products_manager.js';
import { uploader } from "../Middlewares/multer.js";
const productManager = new ProductManager('./src/data/products.json')

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        const products = await productManager.getProducts()
        let arrayLimit = []
        if (!parseInt(limit)) {
            res.status(200).json(products)
        }
        else {
            if (parseInt(limit) > products.length) {
                for (let i = 0; i < products.length; i++) {
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


    } catch (error) { res.status(500).json({ msg: error.message }) }

})

router.post('/',bodyValidator,async (req, res) => {
    try {
        const product = await productManager.createProduct(req.body)
        res.status(200).json(product)

    } catch (error) { res.status(500).json({ msg: error.message }) }

})

router.post('/thumbnails', uploader.single('thumbnails'),bodyValidator, async (req, res) => {
    try {
        const pdct = req.body
        pdct.thumbnails=req.file.path
        const product = await productManager.createProduct(pdct)
        res.status(200).json(product)

    } catch (error) { res.status(500).json({ msg: error.message }) }

})



router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await productManager.getProductById(id)
        if (!product) res.status(404).json({ msg: 'Product not found' })
        res.status(200).json(product)

    } catch (error) { res.status(500).json({ msg: error.message }) }

})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await productManager.updateProduct(req.body, id)
        if (!product) res.status(404).json({ msg: 'Error en la actualización' })
        res.status(200).json(product)

    } catch (error) { res.status(500).json({ msg: error.message }) }

})


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const delproduct = await productManager.deleteProduct(id)
        if (!delproduct) res.status(404).json({ msg: 'Error en la eliminación' })
        else res.status(200).json({ msg: 'Producto eliminado con exito' })

    } catch (error) { res.status(500).json({ msg: error.message }) }

})


export default router;





