import client from "../database";
import bcrypt from "bcrypt";

const pepper: string = process.env.BCRYPT_PASSWORD as string;
const saltRounds: string = process.env.SALT_ROUNDS as string;

export type UserReturnType = {
    id: string;
    firstname: string;
    lastname: string;
    password: string;
}

export type User = {
    firstname: string;
    lastname: string;
    password: string;
}

export class Users {
    
    async index(): Promise<UserReturnType[]> {
        try {
            const conn = await client.connect();
            
            const sql = 'SELECT * FROM "User"';
            const result = await conn.query(sql)

            conn.release();
            return result.rows;

        } catch (err){
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async show(id: string): Promise<UserReturnType> {
        try {
            const conn = await client.connect();
            
            const sql = 'SELECT * FROM "User" WHERE id=($1)';
            const result = await conn.query(sql, [id])

            conn.release();
            return result.rows[0];
        } catch (err){
            throw new Error(`Could not get User ${id}. Error: ${err}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO "User" (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
            
            const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
            
            conn.release();
            return result.rows[0];
        } catch (err){
            throw new Error(`Could not create User ${u.firstname}. Error: ${err}`);
        }
    }

}