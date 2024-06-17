import * as service from "../services/cart.services.js";

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
        const { id } = req.params;
        const cart = await service.getById(id);
        if (!cart) res.status(404).json({ msg: 'cart not found' });
        else res.json(cart);
    } catch (error) {
        next(error.message);
    }
};
console.log("llego al controller")
export const create = async (req, res, next) => {
    try {
        const newCart = await service.create(req.body);
        if (!newCart) res.status(404).json({ msg: 'Error creating cart' });
        else res.json(newCart);
    } catch (error) {
        next(error.message);
    }
};

export const update = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { id } = req.params;
        const response = await service.updateAndPush(cid,id);
        if (!response) res.status(404).json({ msg: 'Can not update cart' });
        else res.json(response);
    } catch (error) {
        next(error.message);
    }
};

export const pushXproductInCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { id } = req.params;
        const { cantidad } = req.params;
        const response = await service.pushXproductInCart(cid, id,cantidad);
        if (!response) res.status(404).json({ msg: 'Can not update cart' });
        else res.json(response);
    } catch (error) {
        next(error.message);
    }
};



export const deleteProductInCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { id } = req.params;
        const response = await service.deleteProductInCart(cid, id);
        if (!response) res.status(404).json({ msg: 'Can not update cart' });
        else res.json(response);
    } catch (error) {
        next(error.message);
    }
};

export const deleteAllProductsInCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { id } = req.params;
        const response = await service.deleteAllProductsInCart(cid, id);
        if (!response) res.status(404).json({ msg: 'Can not update cart' });
        else res.json(response);
    } catch (error) {
        next(error.message);
    }
};






export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cartDel = await service.remove(id);
        if (!cartDel) res.status(404).json({ msg: 'Error remove cart' });
        else res.json(cartDel);
    } catch (error) {
        next(error.message);
    }
};