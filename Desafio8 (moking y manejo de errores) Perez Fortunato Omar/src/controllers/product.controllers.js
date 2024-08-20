import * as service from "../services/product.services.js";
import mongoose from 'mongoose';
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse()


export const getAll = async (req, res, next) => {
    try {
        const { name } = req.query
        const { page } = req.query
        const { limit } = req.query
        const { sort } = req.query
        
       
        const response = await service.getAll(name, page, limit,sort)
        return httpResponse.Ok(res,response)
    } catch (error) {  
        next(error.message);
    }
};




export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) return httpResponse.BadRequest(res, id)
        const prod = await service.getById(id);
        if (!prod) return httpResponse.NotFound(res,prod)
        else return httpResponse.Ok(res,prod)
    } catch (error) {
        next(error.message);
    }
};

export const create = async (req, res, next) => {
    try {
        console.log("archivo controller-Datos recibidos en el formulario:", req.body);
        const newProd = await service.create(req.body);
        if (!newProd) return httpResponse.BadRequest(res,newProd)
        else return res.redirect(`/homepage?message=product created`)
        //res.json(newProd);
    } catch (error) {
        next(error.message);
    }
};

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) return httpResponse.BadRequest(res, id)
        const prodUpd = await service.update(id, req.body);
        if (!prodUpd) return httpResponse.BadRequest(res,prodUpd)
        else return httpResponse.Ok(res,prodUpd)
    } catch (error) {
        next(error.message);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) return httpResponse.BadRequest(res, id)
        const prodDel = await service.remove(id);
        if (!prodDel) return httpResponse.NotFound(res, prodDel)
        else return httpResponse.Ok(res,prodDel)
    } catch (error) {
        next(error.message);
    }
};