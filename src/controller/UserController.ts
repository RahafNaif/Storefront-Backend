import express from "express";
import jwt from "jsonwebtoken";
import { User, UserReturnType, Users } from "../models/Users";

const users: Users = new Users();

const create = async (req: express.Request, res: express.Response) => {
    const user: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
    }

    try {
        const newUser = await users.create(user);
        var token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET as string);
        res.json(token);
    } catch(err) {
        res.status(400);
        res.json(err as string + user);
    }
}

const index = async (req: express.Request, res: express.Response) => {
    try {
        const token = req.headers.authorization;
        jwt.verify(token as string, process.env.TOKEN_SECRET as string);
    } catch(err){
        res.status(401);
        res.json('Access Denied, invaild token');
        return;
    }
    
    try{
        const all_users = await users.index();
        res.json(all_users);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const show = async (req: express.Request, res: express.Response) => {
    try {
        const token = req.headers.authorization;
        jwt.verify(token as string, process.env.TOKEN_SECRET as string);;
    } catch(err){
        res.status(401);
        res.json('Access Denied, invaild token');
        return;
    }
    
    try{
        const all_users = await users.show(req.body.id);
        res.json(all_users);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const usersRoutes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create)
}

export default usersRoutes;