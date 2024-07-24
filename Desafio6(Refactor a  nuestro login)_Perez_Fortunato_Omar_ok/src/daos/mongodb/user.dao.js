
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

    async getUserById(id) {
        try {
            const user = await UserModel.findOne({ _id: id }) 
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }




    async register(user) {
        try {
            console.log ("el objeto es : " +  user)
            const response = await UserModel.create(user); 
            console.log(response)
            return response;
        } catch (error) { throw new Error("Error in user creation") }
    }


    async login(email) {
        try {
            console.log("el email es :" + email)
            const response = await UserModel.findOne({ email }); 
            console.log (response)
            return response
        } catch (error) {
            throw new Error(error)
        }
    }




}    