import { Incident } from "../database/entity/Incident";
import { User } from "../database/entity/User";
import { createIncident, getAllIncidents, updateIncident, getIncidentById, deleteIncidentById } from "../services/incident.service";
import { Coordinates } from "../interfaces/geocode.interfaces";
import { address2Coord } from "../services/geocode.service";
import { IncidentShape } from "../interfaces/entities.interfaces";


export const createIncidentController = async (req: any, res: any) => {
    const user: User = req.currentUser;
    const address: string | undefined = req.body.address;
    const description: string | undefined = req.body.description;
    let reported: string | undefined | Date = req.body.reported; 

    console.log("Reported")
    console.log(reported)

    reported = (new Date(reported)) as Date;
    console.log(reported)
    
    if (!address || !description || !reported) {
        res.json({
            success: false,
            error: {
                message: "There are missing parameters"
            },
            data: null
        });
        return;
    }

    try {

        const coordinates: Coordinates = await address2Coord(address);

        console.log("Coordinates")
        console.log(coordinates)
        
        if(!coordinates) {
            res.json({
                success: false, 
                error: {
                    message: "La direccion no se pudo mapear a coordenas, introduce una direccion valida"
                },
                data: null
            }).status(400);
            return;
        }

        const newIncident: Incident = await createIncident(address, description, reported, user.email, coordinates);

        res.json({
            success: true,
            error: null,
            data: {
                message: "El incidente fue reportado exitosamente",
                incident: newIncident
            }
        }).status(201)
    }
    catch (e) {
        res.json({
            success: false, 
            error: {
                message: e.message
            },
            data: null
        }).status(400);
    }

};


export const getAllIncidentsController = async (req: any, res: any) => {
    try {
        const incidents: Array<Incident> = await getAllIncidents();
        
        res.json({
            success: true,
            error: null,
            data: incidents
        })
    }
    catch (e) {
        return res.json({
            success: false,
            error: {
                message: e.message
            }
        }).status(400);
    }
}


export const updateIncidentController = async (req: any, res: any) => {

    const incident_id: string | undefined = req.body.incident_id;
    const description: string | undefined = req.body.description;
    const reported: string | undefined = req.body.reported;
    const address: string | undefined = req.body.address;


    if (!description || !reported || !incident_id || !address) {
        res.json({
            success: false,
            error: {
                message: "There are missing parameters"
            }
        }).status(400);
    }
   
    try {

        const coordinates: Coordinates = await address2Coord(address);

        if (coordinates) {

            const incidentBody: IncidentShape = {
                id: incident_id,
                description: description,
                reported: reported,
                location: {
                    address: address,
                    coordinates: Object.values(coordinates).join(",")
                }
            };

            const updatedIncident: boolean = await updateIncident(incidentBody);

            if (!updatedIncident) {
                res.json({
                    success: false,
                    error: "The incident couldn't be updated"
                }).status(400);
            }
            else {
                res.json({
                    success: true,
                    error: null,
                    data: {
                        message: "The incident was succesfully updated"
                    }
                }).status(201);
            }
        }
    }
    catch (e) {
        res.json({
            success: true,
            error: {
                message: e.message
            }
        }).status(400);
    }
}


export const getIncidentByIdController = async (req: any, res: any) => {

    const incidentId: string = req.params.incidentId;
    
    if (!incidentId) {
        res.json({
            success: false,
            error: "Missing incident's id"
        }).status(400);
    }

    try {
        const incident: Incident = await getIncidentById(incidentId);
        
        if (incident) {
            res.json({
                success: true,
                error: null,
                data: incident
            })
        }
        else {
            res.json({
                success: false,
                error: "The incident doesn't exist",
            }).status(400);
        }
    }
    catch (e) {
        res.json({
            success: false, 
            error: {
                message: e.message
            }
        }).status(400);
    }
};


export const deleteIncidentController = async (req: any, res: any) => {

    const incidentId: string = req.params.incidentId;
    
    if (!incidentId) {
        res.json({
            success: false,
            error: "Missing incident's id"
        }).status(400);
    }

    try {
        const deleted: boolean = await deleteIncidentById(incidentId);
        if (deleted) {
            res.json({
                success: true,
                error: null,
                data: {
                    message: "The incident was deleted successfully"
                }
            })
        }
        else {
            res.json({
                success: false,
                error: {
                    message: "The incident doesn't exist"
                }
            }).status(400);
        }
    }
    catch (e) {
        res.json({
            success: false,
            error: {
                message: e.message
            }
        }).status(400);
    }
};
