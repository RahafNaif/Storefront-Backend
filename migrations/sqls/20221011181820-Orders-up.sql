CREATE TABLE "Orders" (
    id SERIAL PRIMARY  KEY,
    user_id bigint REFERENCES "User"(id), 
    status integer
);