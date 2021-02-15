import { Router } from "express";
import { deleteUser } from "../controllers/user.controller";



const router = Router();


//router.put("/", updateIncident);
//router.get("/", getIncidents);
//router.get("/:id", getIncident)
router.delete("/", deleteUser);


export default router;