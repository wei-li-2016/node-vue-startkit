import { Router } from "express";
import authMiddleware from "./app/middlewares/auth";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import MarcaController from "./app/controllers/MarcaController";
import MotherboardController from "./app/controllers/MotherboardController";
import ProcessorsController from "./app/controllers/ProcessorsController";

const routes = new Router();

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);

routes.use(authMiddleware);

routes.get("/users", UserController.index);
routes.put("/users", UserController.update);

routes.get("/brands", MarcaController.index);
routes.post("/brands", MarcaController.store);
routes.put("/brands/:id", MarcaController.update);

routes.post("/motherboards", MotherboardController.store);
routes.get("/motherboards", MotherboardController.index);
routes.put("/motherboards/:id", MotherboardController.update);
routes.delete("/motherboards/:id", MotherboardController.delete);
routes.get("/motherboards/:id", MotherboardController.show);

routes.get("/processors", ProcessorsController.index);

export default routes;
