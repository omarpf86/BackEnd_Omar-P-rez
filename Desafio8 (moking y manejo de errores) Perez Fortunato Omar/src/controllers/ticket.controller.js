import * as ticketService from "../services/ticket.services.js";
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse()


export const generateTicket = async (req, res, next) => {
        try {
            const user = req.user;
            const ticket = await ticketService.generateTicket(user);
            if (!ticket) httpResponse.BadRequest(res,ticket);
            else {
                res.render('ticket', { t: JSON.parse(JSON.stringify(ticket)) });
            }
        } catch (error) {
            next(error);
    }
}
