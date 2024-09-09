
import persistence from "../daos/persistence.js"; 
const { prodDao } = persistence





export const getAll = async (name, page, limit,sort) => {
  try {
    return await prodDao.getAll(name, page, limit, sort);
  } catch (error) {
    throw new Error(error);
  }
};



export const getById = async (id) => {
  try {
    return await prodDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const create = async (obj) => {
  try {
    return await prodDao.create(obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const update = async (id, obj) => {
  try {
    return await prodDao.update(id, obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const remove = async (id) => {
  try {
    return await prodDao.delete(id);
  } catch (error) {
    throw new Error(error);
  }
};
