import client from "../database";

export type Order = {
    id: number;
    user_id: number;
    status: number;
}

export type OrderProduct = {
    id: number;
    quantity: number;
    order_id: number;
    product_id: number;
}

export class Orders {
    
    async index(): Promise<Order[]> {
        try {
            const conn = await client.connect();
            
            const sql = 'SELECT * FROM Orders';
            const result = await conn.query(sql)

            conn.release();
            return result.rows;

        } catch (err){
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }

    async show(id: string): Promise<Order> {
        try {
            const conn = await client.connect();
            
            const sql = 'SELECT * FROM Orders WHERE id=($1)';
            const result = await conn.query(sql, [id])

            conn.release();
            return result.rows[0];
        } catch (err){
            throw new Error(`Could not get order ${id}. Error: ${err}`);
        }
    }

    async getCurrentOrder(user_id: string): Promise<Order> {
        try {
            const conn = await client.connect();
            
            const sql = 'SELECT * FROM Orders WHERE user_id=($1) AND status=($2)';
            const result = await conn.query(sql, [user_id, 0]) /*note: status=0 means active*/

            conn.release();
            return result.rows[0];
        } catch (err){
            throw new Error(`Could not get user orders ${user_id}. Error: ${err}`);
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO Orders (user_id, status) VALUES($1, $2) RETURNING *';

            const result = await conn.query(sql, [o.user_id, o.status]);

            conn.release();
            return result.rows[0];
        } catch (err){
            throw new Error(`Could not create order ${o.status}. Error: ${err}`);
        }
    }

    async addProduct(op: OrderProduct): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO order_product (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';

            const result = await conn.query(sql, [op.quantity, op.order_id, op.product_id]);

            conn.release();
            return result.rows[0];
        } catch (err){
            throw new Error(`Could not add product ${op.order_id}. Error: ${err}`);
        }
    }

}