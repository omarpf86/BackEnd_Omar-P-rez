import UserDaoMongoDB from "../daos/mongodb/user.dao.js";
import { createHash,isValidPassword } from "../utils.js";
const userDao = new UserDaoMongoDB();


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
        const user = await userDao.getUserById(id);
        return user
    } catch (error) {
        throw new Error(error);
    }
};



export const register = async (user) => {
    try {
        const { email, password, isGithub } = user
        console.log("isGthb11 :" + isGithub)
        if (email === 'adminCoder@mail.com' && password === 'adminCoder123')
        {
                const newUser = await userDao.register({...user, password:createHash(password),role: 'admin' })
               return newUser      
        } else { 
               console.log("isGthb :" + isGithub)
               if (!isGithub) {
                const newUserC = await userDao.register({...user, password: createHash(password) })
                return newUserC
                }
                else { 
                   const newUserD = await userDao.register(user)
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
            console.log("validacion es " + user)
            return user
        }else return null
    } catch (error) {
        throw new Error(error);
    }
};