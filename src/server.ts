import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import usersRoutes from './controller/UserController';

dotenv.config();

const app: express.Application = express();
const port = process.env.PORT;

app.use(bodyParser.json());

usersRoutes(app);

app.listen(port, function () {
    console.log(`starting app on: ${port}`);
});
