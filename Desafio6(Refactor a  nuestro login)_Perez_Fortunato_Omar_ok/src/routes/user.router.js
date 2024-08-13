import { Router } from "express";


const router = Router();
import {
    logout,
    visit,
    infoSession,
    registerPassportLocal,
    loginPassportLocal,
} from "../controllers/user.controllers.js";
import { validateLogin } from "../middlewares/userValidateLogin.js";
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";


router.post('/register', passport.authenticate('register'), registerPassportLocal);
router.post("/login", passport.authenticate('login'), loginPassportLocal);

router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] })) 

router.get('/access', passport.authenticate('github', {
    failureRedirect: '/api/users/register',
    successRedirect: '/homepage',
    passReqToCallback: true
}));


router.get('/private', isAuth, (req, res) => res.json({ msg: 'Ruta PRIVADA' }))
router.get("/info",validateLogin, infoSession);
router.get("/secret-endpoint",validateLogin, visit);
router.post("/logout", logout);

export default router;