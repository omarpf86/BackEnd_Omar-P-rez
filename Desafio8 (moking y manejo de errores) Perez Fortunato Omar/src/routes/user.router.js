import { Router } from "express";


const router = Router();
import {
    current,
    logout,
    visit,
    infoSession,
    registerPassportLocal,
    loginPassportLocal,
    deleteUser,
} from "../controllers/user.controllers.js";
import { validateLogin } from "../middlewares/validateLogin.js";
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";


router.post('/register', passport.authenticate('register'), registerPassportLocal);
router.post("/login", passport.authenticate('login'), loginPassportLocal);

router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] })) 

router.get('/access', passport.authenticate('github', {
    failureRedirect: '/api/users/register', //duda
    successRedirect: '/api/views/cart',
    passReqToCallback: true
}));


router.get('/current',current)

router.get('/private', isAuth, (req, res) => res.json({ msg: 'Ruta PRIVADA' }))
router.get("/info",validateLogin, infoSession);
router.get("/secret-endpoint",validateLogin, visit);
router.post("/logout", logout);
router.delete("/delete/:id", deleteUser);

export default router;