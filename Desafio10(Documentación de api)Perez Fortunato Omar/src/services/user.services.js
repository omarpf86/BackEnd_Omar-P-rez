
import { createHash,isValidPassword } from "../utils.js";
import persistence from "../persistence/daos/factory.js";
const { userDao } = persistence;
import UserRepository from '../persistence/repository/user.repository.js';
const userRepository = new UserRepository();

const { cartDao } = persistence;

export const getUser = async (email, password) => {
    try {
        const user = await userDao.getUser(email, password);
        return user
    } catch (error) {
        throw new Error(error);
    }
};

export const getUserById = async (id) => {
    try {
        const user = await userRepository.getById(id)
        return user
    } catch (error) {
        throw new Error(error);
    }
};



export const register = async (user) => {
    try {
        const { email, password, isGithub } = user
        const cartUser = await cartDao.create();
        if (email === 'adminCoder@mail.com' && password === 'adminCoder123')
        {
            const newUser = await userDao.register({ ...user, password: createHash(password), role: 'admin', cart: cartUser._id })
               return newUser      
        } else {
               if (!isGithub) {
                   const newUserC = await userDao.register({ ...user, password: createHash(password), cart: cartUser._id})
                return newUserC
                }
                else { 
                   const newUserD = await userDao.register({ ...user, cart: cartUser._id })
                   return newUserD 
                    }
            }   
    } catch (error) {
        throw new Error(error.message);
    }
};


export const login = async (obj) => {
    try {
        const {email, password} = obj;
        const user = await userDao.login(email);
        if (isValidPassword(password, user)) {
            return user
        }else return null
    } catch (error) {
        throw new Error(error);
    }
};

export const deleteUser = async (id) => {
    try {
        return await userDao.deleteUser(id);
    } catch (error) {
        throw new Error(error);
    }
};
