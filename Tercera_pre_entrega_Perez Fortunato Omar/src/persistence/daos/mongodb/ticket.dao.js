import {TicketModel} from "./models/ticket.model.js";

export default class TicketDaoMongo  {
    async create(obj) {
        try {
            console.log("en tiket dao el objeto es")
            const response = await TicketModel.create(obj)
            return response;
        } catch (error) { throw new Error("Hubo un error en la creación del ticket") }
    }

};