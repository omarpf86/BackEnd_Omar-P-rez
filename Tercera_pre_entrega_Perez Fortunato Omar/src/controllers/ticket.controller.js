import * as ticketService from "../services/ticket.services.js";


export const generateTicket = async (req, res, next) => {
        try {
            const user = req.user;
            (console.log("en ticket controller el usuario es ", req.user))
            const ticket = await ticketService.generateTicket(user);
            if (!ticket) res.status(404).json({ message: 'Error generate ticket' });
            else {
                console.log('Rendering ticket view with:', ticket);
                res.render('ticket', { t: JSON.parse(JSON.stringify(ticket)) });
            }
        } catch (error) {
            next(error);
    }
}
