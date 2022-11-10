import express from "express";
import jwt from "jsonwebtoken";
import { Orders } from "../models/Orders";

const orders: Orders = new Orders();

const showCurrentOrder = async (req: express.Request, res: express.Response) => {  
    try {
        const token = req.headers.authorization;
        jwt.verify(token as string, process.env.TOKEN_SECRET as string);
    } catch(err) {
        res.status(401);
        res.json('Access Denied, invaild token');
        return
    }

    try{
        const order = await orders.getCurrentOrder(req.body.id);
        res.json(order);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const ordersRoutes = (router: express.Router) => {
    router.get('/order/:id', showCurrentOrder);
}

export default ordersRoutes;