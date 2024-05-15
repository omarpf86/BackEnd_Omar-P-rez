import { Router } from "express"
const router = Router()

import CartsManager from '../Manager/carts_manager.js';
const cartsManager = new CartsManager('./src/data/carts.json')

router.get('/', async (req, res) => {
    try {
        const carts = await cartsManager.getCarts()
        res.status(200).json(carts)

    } catch (error) { res.status(500).json({ msg: error.message }) }

})


router.post('/', async (req, res) => {
    try {
        const cart = await cartsManager.createCarts(req.body)
        res.status(200).json(cart)

    } catch (error) { res.status(500).json({ msg: error.message }) }

})


router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const cart= await cartsManager.getCartById(cid)
        if (!cart) res.status(404).json({ msg: 'Cart not found' })
        res.status(200).json(cart)
        

    } catch (error) { res.status(500).json({ msg: error.message }) }

})

router.post('/:cid/products/:id', async (req, res) => {
    try {
        const { cid } = req.params
        const {id}=req.params
        const cart = await cartsManager.pushProductInCart(cid,id)
        res.status(200).json(cart)

    } catch (error) { res.status(500).json({ msg: error.message }) }

})


export default router;