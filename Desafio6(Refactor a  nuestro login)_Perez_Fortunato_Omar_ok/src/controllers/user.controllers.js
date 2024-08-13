import * as service from "../services/user.services.js";


export const registerPassportLocal = async (req, res, next) => {
    try {
        console.log(req.session.passport.user)
        if (!req.session.passport.user) {
            return res.redirect(`/api/views/login?message=The user already existe`); 
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
        if (user) {
            return res.redirect(`/homepage?message=Welcome to the page`);
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

export const logout = (req, res) => {
    req.session.destroy();
    res.redirect(`/api/views/login?message=Session destroy`);
};