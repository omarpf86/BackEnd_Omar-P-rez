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


    async pushXproductInCart(cid, id,cantidad) {
        try {
            const cart = await CartModel.findById(cid)
            if (cart) {
                const product = await ProductModel.findById(id)
                console.log (product)
                if (product) { 
                    const pIncart = cart.productsInCarts.find((x) => x.idp == id) 
                    if (!pIncart) {
                        return await CartModel.findByIdAndUpdate(
                            cid,
                            { $push: { productsInCarts: { idp: id, cantidad:parseInt(cantidad) } } },
                            { new: true }
                        )
                    } else if (pIncart) {
                        return await CartModel.findOneAndUpdate(
                            { _id: cid, "productsInCarts.idp": id },
                            { $inc: { "productsInCarts.$.cantidad": (parseInt(cantidad)) } },
                            { new: true }
                        )
                    }

                }
            }
        } catch (error) { throw new Error("Producto no encontrado") }
    }

    async deleteProductInCart(cid, id) {
        try {
            const cart = await CartModel.findById(cid)
            if (cart) {
                const pIncart = cart.productsInCarts.find((x) => x.idp == id)
                if (pIncart.cantidad > 0) {
                    return await CartModel.findOneAndUpdate(
                        { _id: cid, "productsInCarts.idp": id  },
                        { $inc: { "productsInCarts.$.cantidad": -1 } },
                        { new: true }
                    )
                };
            }
        } catch (error) { throw new Error("Producto no encontrado") }
    }



    async deleteAllProductsInCart(cid, id) {
        try {
            const cart = await CartModel.findById(cid)
           if (cart) {
               const pIncart = cart.productsInCarts.find((x) => x.idp == id)
               console.log(pIncart)
                if (pIncart.cantidad > 0) {
                    return await CartModel.findOneAndUpdate(
                        { _id: cid },
                        { $pull: { productsInCarts: { idp: id } } },
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


