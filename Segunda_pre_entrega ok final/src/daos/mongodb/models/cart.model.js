import mongoose from "mongoose"; //ver si van las dos lineas o una sola
import { Schema, model } from "mongoose";

export const cartsCollectionName = "cart";

const cartsSchema = new mongoose.Schema({
    products:[{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'product' //Esta linea hace referencia al nombre del modelo product.model
        },
        quantity: { type: Number, default: 1 },
         _id: false 
    }],
    default: []
});

/*cartsSchema.pre('find', function () {
    this.populate('products.product'); 
});*/

export const CartModel = mongoose.model(
    cartsCollectionName,
    cartsSchema
);