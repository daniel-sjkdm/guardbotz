import { Router } from "express";
import {
	userCreateController,
	userDetailController,
	userUpdateController,
	userDeleteController,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", userDetailController);
router.post("/", userCreateController);
router.put("/", authMiddleware, userUpdateController);
router.delete("/", authMiddleware, userDeleteController);

export default router;
