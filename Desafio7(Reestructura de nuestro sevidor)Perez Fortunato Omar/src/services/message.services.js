
import persistence from "../daos/persistence.js";
const { messageDao } = persistence



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