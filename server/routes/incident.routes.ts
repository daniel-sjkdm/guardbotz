import { Router } from "express";
import { 
    createIncidentController, 
    getAllIncidentsController, 
    updateIncidentController,
    getIncidentByIdController,
    deleteIncidentController
} from "../controllers/incident.controller";
import { authMiddleware } from "../middleware/authMiddleware";


const IncidentRouter = Router();


IncidentRouter.post("/", authMiddleware, createIncidentController);
IncidentRouter.get("/", authMiddleware, getAllIncidentsController);
IncidentRouter.get("/:incidentId", authMiddleware,getIncidentByIdController);
IncidentRouter.delete("/delete/:incidentId", authMiddleware, deleteIncidentController);
IncidentRouter.put("/update/:incidentId", authMiddleware, updateIncidentController);

export default IncidentRouter;