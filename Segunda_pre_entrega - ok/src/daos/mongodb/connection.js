import 'dotenv/config';
import mongoose from "mongoose"

const MONGO_URL = "mongodb+srv://omarpf86:1234@cluster0.an7me.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"


export const initMongoDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(MONGO_URL);
    console.log("Conectado a la base de datos de MONGODB");
  } catch (error) {
    console.log(error);
  }
};
