import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";
import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
const cartDao = new CartDaoMongoDB();
const productDao = new ProductDaoMongoDB();

//import {__dirname} from '../utils.js';
//import CartDaoFS from '../daos/filesystem/cart.dao.js';
//const cartDao = new CartDaoFS(`${__dirname}/daos/filesystem/carts.json`);


export const getAll = async () => {
    try {
        return await cartDao.getCarts();
    } catch (error) {
        throw new Error(error);
    }
};

export const getById = async (id) => {
    try {
        return await cartDao.getCartById(id);
    } catch (error) {
        throw new Error(error);
    }
};

export const create = async (obj) => {
    try {
        return await cartDao.createCarts(obj);
    } catch (error) {
        throw new Error(error);
    }
};

export const updateAndPush = async (cid,id) => {
    try {
        const exists = await productDao.getById(id)
        if (!exists) return null
        else return await cartDao.pushProductInCart(cid,id)
       // return await cartDao.pushProductInCart(cid,id);
    } catch (error) {
        throw new Error(error);
    }
};

export const remove = async (cid) => {
    try {
        return await cartDao.delete(cid);
    } catch (error) {
        throw new Error(error);
    }
};
