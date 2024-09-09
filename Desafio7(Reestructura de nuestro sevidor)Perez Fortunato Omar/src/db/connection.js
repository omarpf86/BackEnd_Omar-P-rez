import mongoose from "mongoose";
import "dotenv/config";
import config from "../config.js"




export const initMongoDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(config.MONGO_URL);
        console.log("Conectado a la base de datos de MONGODB");
    } catch (error) {
        console.log(error);
    }
};
