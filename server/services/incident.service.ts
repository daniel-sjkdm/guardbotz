import { getConnection, getRepository, UpdateResult } from "typeorm";
import { Incident } from "../database/entity/Incident";
import { User } from "../database/entity/User";
import { Location } from "../database/entity/Location";
import { createLocation, getLocation } from "../services/location.service";
import { getUserByEmail } from "../services/user.service";
import { Coordinates } from "../interfaces/geocode.interfaces";
import { IncidentShape } from "../interfaces/entities.interfaces";



export const createIncident = async (address: string, description: string, reported: Date, userEmail: string, coordinates: Coordinates ): Promise<Incident | never> => {
    /**
     * To create an incident we need to bind:
     *  - User
     *  - Location
     * 
     * If the location doesn't exist, create a new one.
     * If it exist, just reference it
     */
    try {
        // Verify if the address already exist
        let location: Location | null = await getLocation(address);
        console.log("Location exist?")
        console.log(location)
        if (!location) {
            location = await createLocation({
                coordinates: Object.values(coordinates).join(","),
                address: address
            });

            if (!location) {
                const error =  new Error("No se pudieron determinar las coordenadas de la direccion, por favor introduce una valida");
                error.name = "location-is-null";
                throw error;
            }    
        }

        // Get the user's id
        const user: User = await getUserByEmail(userEmail)

        const incident = new Incident();
        incident.description = description;
        incident.reported = reported;
        incident.user = user
        incident.location = location
     
        const result = await getConnection().manager.save(incident);

        return result;
    }
    catch (e) {
        throw new Error(e.message);
    }
};


export const getAllIncidents = async (): Promise<Array<Incident> | never> => {
    try {
        const repository = getRepository(Incident);
        const incidents: Array<Incident> = await repository.createQueryBuilder("incident")
            .leftJoinAndSelect("incident.location", "location")
            .getMany();

        return incidents;
    }
    catch (e) {
        throw new Error(e.message);
    }
};


export const getIncidentById = async (incident_id: string): Promise<Incident | never> => {
    try {
        const repository = getRepository(Incident);
        const result = await repository
            .createQueryBuilder("incident")
            .leftJoinAndSelect("incident.location", "location")
            .where("incident.id = :id", { id: incident_id})
            .getOne();
        return result;
    }
    catch (e) {
        throw new Error(e.message);
    }
}


export const updateIncident = async (incident: IncidentShape): Promise<boolean | never> => {
    try {
        let location = await getLocation(incident.location.address)
        
        if (!location) {
            location = await createLocation({
                address: incident.location.address,
                coordinates: incident.location.coordinates
            });
        }
        const repository = getRepository(Incident);
        const result: UpdateResult = await repository
            .createQueryBuilder()
            .update(Incident)
            .set({
                description: incident.description,
                reported: incident.reported,
                location: location
            })
            .where("incident.id = :id", { id: incident.id})
            .execute();
        if (result.affected === 0) {
            return false;
        }
        else {
            return false;
        }
    }
    catch (e) {
        throw new Error(e.message);
    }
} 


export const deleteIncidentById = async (incidentId: string): Promise<boolean> => {
    try {
        const result = await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Incident)
            .where("id = :id", { id: incidentId })
            .execute()

        if (result.affected>0) {
            return true;
        }
        else {
            return false;
        }
    
    }
    catch (e) {
        return false
    }
};
