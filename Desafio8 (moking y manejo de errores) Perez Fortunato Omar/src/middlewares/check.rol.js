export const checkRol = (req, res, next) => {
    try {
        const { role } = req.user
        console.log("en check rol el rol es", role)
        if (role == "admin") {
         next();
        }
        else {
            res.status(403).json({ msg: "No Autorizado" });
        }     
    } catch (error) {
        next(error)    
    }
  
    
};