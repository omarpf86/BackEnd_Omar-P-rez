import { UserModel } from "./models/user.model.js";

export default class UserDaoMongoDB {
   

    async getUser(email) {
        try {
            const user = await UserModel.findOne({ email})
            console.log(email)
            return user;
            }catch (error) {
            throw new Error(error);
        }
    }

    async register(obj) {
        try {
            const response = await UserModel.create(obj); 
            console.log(response)
            return response;
        } catch (error) { throw new Error("Error in user creation") }
    }


    async login(email, password) {
        try {
            return await UserModel.findOne({ email, password });  
        } catch (error) {
            throw new Error(error)
        }
    }




}    