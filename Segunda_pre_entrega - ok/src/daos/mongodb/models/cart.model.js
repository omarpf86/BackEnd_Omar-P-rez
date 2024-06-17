import mongoose from "mongoose"; //ver si van las dos lineas o una sola
import { Schema, model } from "mongoose";

export const cartsCollectionName = "cart";

const cartsSchema = new mongoose.Schema({
    productsInCarts:[{
        idp: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        cantidad: { type: Number, default: 1 },
         _id: false 
    }],
    default: []
});

cartsSchema.pre('find', function () {
    this.populate('productsInCarts.idp'); 
});

export const CartModel = mongoose.model(
    cartsCollectionName,
    cartsSchema
);