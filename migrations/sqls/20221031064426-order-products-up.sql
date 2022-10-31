CREATE TABLE "order_products" (
    id SERIAL PRIMARY  KEY, 
    quantity integer, 
    order_id bigint REFERENCES "Orders"(id),
    product_id bigint REFERENCES "Product"(id) 
);