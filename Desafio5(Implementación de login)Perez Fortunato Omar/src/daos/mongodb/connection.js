import 'dotenv/config';
import mongoose from "mongoose"

const MONGO_URL = process.env.MONGO_URL


export const initMongoDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(MONGO_URL);
    console.log("Conectado a la base de datos de MONGODB");
  } catch (error) {
    console.log(error);
  }
};
