import { Router } from "express";
import {
	deleteUserController,
	getUserController,
} from "../controllers/user.controller";

const UserRouter = Router();

UserRouter.get("/", getUserController);
UserRouter.delete("/", deleteUserController);

export default UserRouter;
