import { Router } from "express";
import {
	getLocationsController,
	getLocationByIdController,
	deleteLocationByIdController,
	createLocationController,
	updateLocationController,
} from "../controllers/location.controller";

const LocationRouter = Router();

LocationRouter.post("/create", createLocationController);
LocationRouter.get("/", getLocationsController);
LocationRouter.get("/:id", getLocationByIdController);
LocationRouter.delete("/:id", deleteLocationByIdController);
LocationRouter.patch("/update/:id", updateLocationController);

export default LocationRouter;
