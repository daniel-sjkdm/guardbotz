import { Router } from "express";
import { getRepository } from "typeorm";
import { Location } from "../database/entity/Location";
import { getLocationsController } from "../controllers/location.controller";

const locationRouter = Router();


locationRouter.get("/", getLocationsController);
