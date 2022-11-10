import express from "express";
import jwt from "jsonwebtoken";
import { Product, ProductReturnType, Products } from "../models/Products";

const products: Products = new Products();

const create = async (req: express.Request, res: express.Response) => {
    const product: ProductReturnType = {
        name: req.body.name,
        price: req.body.price,
    }
    
    try {
        const token = req.headers.authorization;
        jwt.verify(token as string, process.env.TOKEN_SECRET as string);
    } catch(err) {
        res.status(401);
        res.json('Access Denied, invaild token');
        return
    }

    try {
        const newProduct = await products.create(product);
    } catch(err) {
        res.status(400);
        res.json(err as string + product);
    }
}

const index = async (req: express.Request, res: express.Response) => { 
    try{
        const all_products = await products.index();
        res.json(products);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const show = async (req: express.Request, res: express.Response) => { 
    try{
        const product = await products.show(req.body.id);
        res.json(product);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const productsRoutes = (router: express.Router) => {
    router.get('/products', index);
    router.get('/products/:id', show);
    router.post('/products', create)
}

export default productsRoutes;