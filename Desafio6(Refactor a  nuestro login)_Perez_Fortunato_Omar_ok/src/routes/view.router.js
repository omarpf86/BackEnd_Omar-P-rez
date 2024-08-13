import { Router } from "express";

const router = Router();

router.get("/cart", (req, res) => {
    res.render("cart");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/profile", (req, res) => {
    console.log(req.session)
    res.render("profile");
});

export default router;