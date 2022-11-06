import client from "../database";

export type Product = {
    id: number;
    name: string;
    price: string;
}

export class Products {
    
    async index(): Promise<Product[]> {
        try {
            const conn = await client.connect();
            
            const sql = 'SELECT * FROM Product';
            const result = await conn.query(sql)

            conn.release();
            return result.rows;

        } catch (err){
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const conn = await client.connect();
            
            const sql = 'SELECT * FROM Product WHERE id=($1)';
            const result = await conn.query(sql, [id])

            conn.release();
            return result.rows[0];
        } catch (err){
            throw new Error(`Could not get product ${id}. Error: ${err}`);
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO Product (name, price) VALUES($1, $2) RETURNING *';

            const result = await conn.query(sql, [p.name, p.price]);

            conn.release();
            return result.rows[0];
        } catch (err){
            throw new Error(`Could not create product ${p.name}. Error: ${err}`);
        }
    }

}