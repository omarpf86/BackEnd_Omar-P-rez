import * as service from "../services/user.services.js";



export const register = async (req, res, next) => {
    try {
        // console.log(req.body)
        //const ageNumber = parseInt(age)
        //const dataUser = { first_name, last_name, age: ageNumber, email, password } 
        //console.log(dataUser)
        const { first_name, last_name, age, email, password } = req.body;
        const user = await service.getUser( email, password )
        if (user) {
            return res.redirect(`/api/views/login?message=The user already existe`); //lAS redirecion conviene que este en el controller y no en el servicio
            
        }else {  
        const newUser = await service.register(first_name, last_name, age, email, password)
        //console.log(newUser)
            if (newUser) {
                return res.redirect(`/api/views/login?message=The user was registered`); 
              } 
            else { res.redirect(`/api/views/login?message=The user WAS NOT registered`) }
        } 
    } catch (error) {
        next(error);
    }
}; 


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await service.login(email, password);
        if (user) {
            req.session.email = email;
            req.session.password = password;
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