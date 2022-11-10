import express, { Response, Router } from "express";
import ordersRoutes from "./controller/OrderController";
import productsRoutes from "./controller/ProductController";
import usersRoutes from "./controller/UserController";

const router: Router = express.Router();

router.get("/", (req: express.Request, res: express.Response): void => {
  res.send("Welcome to Storefront-back");
});

usersRoutes(router);
ordersRoutes(router);
productsRoutes(router);

export default router;