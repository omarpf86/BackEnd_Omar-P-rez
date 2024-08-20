import { Router } from "express";
import * as controller from "../controllers/product.controllers.js";
import { checkRol } from "../middlewares/check.rol.js";
import { isAuth } from "../middlewares/isAuth.js";


const router = Router();


router.get("/", [isAuth], controller.getAll);

router.get("/:id", [isAuth], controller.getById);

router.post("/", [isAuth,checkRol], controller.create);

router.put("/:id", [isAuth, checkRol], controller.update);

router.delete("/:id", [isAuth, checkRol] , controller.remove);

export default router;


