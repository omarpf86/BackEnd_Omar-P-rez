import { CartModel } from "./models/cart.model.js";
import { ProductModel } from "./models/product.model.js";

export default class CartsDaoMongodb {

    async getCarts() {
        try {
            const responseCart = await CartModel.find({});
            return responseCart
            
        } catch (error) { throw new Error(error) }

    }


    async createCarts(obj) {
        try {
            const response = await CartModel.create(obj);
            return response;
        } catch (error) { throw new Error("Hubo un error en la creación del carrito") }
    }

    async getCartById(cid) {
        try {
            const response = await CartModel.findById(cid);
            return response;
        } catch (error) { throw new Error("Producto no encontrado") }
    }


    async pushProductInCart(cid, id) {
        try {
            const cart = await CartModel.findById(cid)
            if (cart) {
                const pIncart = cart.productsInCarts.find((x) => x.idp == id)
                if (!pIncart) {
                    return await CartModel.findByIdAndUpdate(
                        cid,
                        { $push: { productsInCarts: { idp: id, cantidad: 1 } } },
                        { new: true }
                    )
                } else {
                    return await CartModel.findOneAndUpdate(
                        { _id: cid, "productsInCarts.idp": id },
                        { $inc: { "productsInCarts.$.cantidad": 1 } },
                        { new: true }
                    )
                };
            }
        } catch (error) { throw new Error("Producto no encontrado") }
    }

    async delete(cid) {
        try {
            const response = await CartModel.findByIdAndDelete(cid);
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
      

}

/* const cart = await CartModel.findById(cid)
            const product = await ProductModel.findById(id)
            if (product && cart) {
                let pc = cart.productsInCarts.find((x) => x.pid == id)
                if (!pc) {
                    cart.productsInCarts.push({ pid: id, cantidad: 1 })
                    cart.save()
                } else {

                    pc.cantidad++
                    cart.save()
                }
             return cart
            }*/