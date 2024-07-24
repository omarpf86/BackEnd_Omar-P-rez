import * as service from "../services/cart.services.js";


export const create = async (req, res, next) => {
    try {
        const newCart = await service.create(req.body);
        if (!newCart) res.status(404).json({ msg: 'Error creating cart' });
        else res.json(newCart);
    } catch (error) {
        next(error.message);
    }
};


export const getAll = async (req, res, next) => {
    try {
        const response = await service.getAll();
        res.json(response);
    } catch (error) {
        next(error.message);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await service.getById(cid);
        if (!cart) res.status(404).json({ msg: 'cart not found' });
        else res.json(cart);
    } catch (error) {
        next(error.message);
    }
};



export const addProdToCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { id } = req.params;
        const response = await service.addProdToCart(cid,id);
        if (!response) res.status(404).json({ msg: 'Can not add product' });
        else res.json(response);
    } catch (error) {
        next(error.message);
    }
};

export const updateProdQuantityToCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { id } = req.params;
        const { quantity } = req.body;
        const response = await service.updateProdQuantityToCart(cid, id, quantity);
        if (!response) res.status(404).json({ msg: 'Can not update cart' });
        else res.json(response);
    } catch (error) {
        next(error.message);
    }
};

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cartUpd = await service.update(id, req.body);
        if (!cartUpd) res.status(404).json({ msg: "Error update cart!" });
        else res.status(200).json(cartUpd);
    } catch (error) {
        next(error.message);
    }
};






export const clearCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const response = await service.clearCart(cid);
        if (!response) res.status(404).json({ msg: 'Can not clear cart' });
        else res.json(response);
    } catch (error) {
        next(error.message);
    }
};

export const removeProdToCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { id } = req.params;
        const response = await service.removeProdToCart(cid, id);
        if (!response) res.status(404).json({ msg: 'Can not remove product' });
        else res.json(response);
    } catch (error) {
        next(error.message);
    }
};






export const deleteCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cartDel = await service.deleteCart(cid);
        if (!cartDel) res.status(404).json({ msg: 'Error remove cart' });
        else res.json(cartDel);
    } catch (error) {
        next(error.message);
    }
};