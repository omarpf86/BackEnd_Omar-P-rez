
import { UserModel } from "./models/user.model.js";


export default class UserDaoMongoDB {
   

    async getUser(email) {
        try {
            const user = await UserModel.findOne({ email})
            return user;
            }catch (error) {
            throw new Error(error);
        }
    }

    async getUserById(id) {
        try {
            const user = await UserModel.findOne({ _id: id }).populate("cart") 
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }




    async register(user) {
        try {
            const response = await UserModel.create(user); 
            return response;
        } catch (error) { throw new Error("Error in user creation") }
    }


    async login(email) {
        try {
            const response = await UserModel.findOne({ email }); 
            return response
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteUser(id) {
        try {
            const response = await UserModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }





}    