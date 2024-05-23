import { Router } from "express"
const router = Router();
import fs from 'fs';


router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts')
})

router.get('/lista', async (req, res) => {
    try {
        let products = await fs.promises.readFile('./src/data/products.json', 'utf8')
        let products1 = JSON.parse(products)
        res.render('home', { products1 })
        
        
    } catch (error) { throw new Error("Lista no encontrada") }
})

export default router