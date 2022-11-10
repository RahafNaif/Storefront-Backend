import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import router from './router';

dotenv.config();

const app: express.Application = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use("/api", router);

app.listen(port, function () {
    console.log(`starting app on: ${port}`);
});
