import { Router } from "express";
import * as controller from "../controllers/cart.controllers.js";

console.log("llego al router")

const router = Router();


router.post("/", controller.create);

router.get("/", controller.getAll);

router.get("/:cid", controller.getById);

router.put("/:id", controller.update);

router.post("/:cid/products/:id", controller.addProdToCart);

router.put("/:cid/products/:id", controller.updateProdQuantityToCart
);

router.delete("/:cid", controller.clearCart);

router.delete("/:cid/products/:id", controller.removeProdToCart);

router.delete("/delete/:cid", controller.deleteCart);

export default router;
