import { Router } from "express";
import * as controller from "../controllers/message.controllers.js";

console.log("llego al routerview")

const router = Router();

router.get('/', (req, res) => {
    res.render("chat")
})


export default router;