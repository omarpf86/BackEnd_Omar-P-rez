import { Router } from "express";
import * as controller from "../controllers/cart.controllers.js";

console.log("llego al router")

const router = Router();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.put("/add/:cid/:id", controller.update);

router.delete("/:id", controller.remove);

export default router;
