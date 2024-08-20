import * as service from "../services/user.services.js";
import mongoose from 'mongoose';
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse()

export const registerPassportLocal = async (req, res, next) => {
    try {
        console.log(req.session.passport.user)
        if (!req.session.passport.user) {
            return res.redirect(`/api/views/login?message=The user already existe` ); 
        } else {
            return res.redirect(`/api/views/login?message=The user was registered`); 
        } 
    } catch (error) {
        next(error);
    }
}; 


export const loginPassportLocal = async (req, res) => {
    try {
        let id = null;
        if (req.session.passport && req.session.passport.user) id = req.session.passport.user;
        const user = await service.getUserById(id);  
        console.log("para el login", user)
        if (user && user.role == "admin") {
            return res.redirect(`/homepage`);
        }
        else if (user) {
            return res.redirect(`/api/views/cart?cartId=${user.cid}&message=Welcome to the page`);     
              }
        else { res.redirect(`/api/views/login?message=Status(401)-User not auhorized`) }
    } catch (error) {
        throw new Error(error);
    }
};

export const visit = (req, res) => {
    req.session.info && req.session.info.contador++;
    res.json({
        msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.contador} veces`,
    });
};

export const infoSession = (req, res) => {
    res.json({
        session: req.session,
        sessionId: req.sessionID,
        cookies: req.cookies,
    });
};

export const current = async (req, res) => {
    try {
        let id = null;
        if (req.session.passport && req.session.passport.user) id = req.session.passport.user;
        const userProfile = await service.getUserById(id)
        const userPlainObject = userProfile 
        if (userProfile && userProfile.role == null) {
            res.render('profile', {user:userProfile});
        } else if (userProfile && userProfile.role == "admin") {
            res.render('profileAdmin', { user: userPlainObject });
        }
        else { res.redirect(`/api/views/register?message=Status(401)-User not find`) }
    } catch (error) {
        throw new Error(error);    
    } 
};


export const logout = (req, res) => {
    req.session.destroy();
    res.redirect(`/api/views/login?message=Session destroy`);
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) return httpResponse.BadRequest(res, id)
        const userDelete = await service.deleteUser(id);
        if (!userDelete) return httpResponse.NotFound(res, userDelete)
        else return httpResponse.Ok(res,userDelete)
    } catch (error) {
        next(error.message);
    }
};



