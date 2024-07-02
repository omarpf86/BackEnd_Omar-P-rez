import UserDaoMongoDB from "../daos/mongodb/user.dao.js";
const userDao = new UserDaoMongoDB();


export const getUser = async (email, password) => {
    try {
        const user = await userDao.getUser(email, password);
        return user
    } catch (error) {
        throw new Error(error);
    }
};


export const register = async (first_name, last_name, age, email, password) => {
    try {
        
        if (email === 'adminCoder@mail.com' && password === 'adminCoder123')
        {
                const newUser = await userDao.register({first_name, last_name, age, email, password,role: 'admin' })
               return newUser      
        } else { 
            const newUserC = await userDao.register(first_name, last_name, age, email, password)
            return newUserC
            }   
    } catch (error) {
        throw new Error(error.message);
    }
};


export const login = async (email, password) => {
    try {
        const user = await userDao.login(email, password);
        return  user
    } catch (error) {
        throw new Error(error);
    }
};