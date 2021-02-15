import { Router } from "express";
import { address2CoordController } from "../controllers/geocode.controller";
import { authMiddleware } from "../middleware/authMiddleware";


const GeocodeRouter = Router();


GeocodeRouter.get("/", address2CoordController);


export default GeocodeRouter;