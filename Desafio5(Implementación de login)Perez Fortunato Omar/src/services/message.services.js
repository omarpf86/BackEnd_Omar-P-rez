import MessageDaoMongoDB  from "../daos/mongodb/message.dao.js";
const messageDao = new MessageDaoMongoDB();

//import {__dirname} from '../utils.js';
//import ProductDaoFS from '../daos/filesystem/product.dao.js';
//const prodDao = new ProductDaoFS(`${__dirname}/daos/filesystem/products.json`);


export const getAll = async () => {
    try {
        return await messageDao.getAll();
    } catch (error) {
        throw new Error(error);
    }
};

export const create = async (obj) => {
    try {
        return await messageDao.create(obj);
    } catch (error) {
        throw new Error(error);
    }
};