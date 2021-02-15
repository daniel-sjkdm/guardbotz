import { getConnection, getRepository, InsertResult } from "typeorm";
import { Location } from "../database/entity/Location";


interface LocationShape {
    coordinates: string;
    address: string | undefined;
}


export const createLocation = async (location: LocationShape): Promise<Location | null> => {
    try {
        const newLocation = await getConnection().createQueryBuilder()
            .insert()
            .into(Location)
            .values(location)
            .returning(["id", "coordinates", "address"])
            .execute()

        return (newLocation.generatedMaps[0] as Location)
    }
    catch (e) {
        //console.log("Error: ", e);
        console.log("Error")
        console.log(e.code)
        console.log(e.message)
        return null;
    }
}


export const getLocation = async (address?: string, coordinates?: string): Promise<Location | null> => {
    try {
        const repository = getRepository(Location);
        if (coordinates) {
            const location = repository.findOne({ where: { coordinates: coordinates }});
            return location;
        }
        else {
            const location = repository.findOne({ where: { address: address}});
            return location;
        }
    }
    catch (e) {
        console.log("Error in get lOCATION")
        console.log(e)
        return null
    }
}


export const getAllLocations = async (): Promise<Array<Location> | null> => {
    try {
        const repository = getRepository(Location);
        const locations = await repository.createQueryBuilder().getMany();
        return locations;
    }
    catch (e) {
        console.log("Error")
        console.log(e)
        return null
    }
}


export const updateLocationById = async (location_id: string, location: LocationShape): Promise<boolean | never> => {
    try {
        const repository = await getRepository(Location);
        const result = await repository
            .createQueryBuilder()
            .update(Location)
            .set({
                address: location.address,
                coordinates: location.coordinates
            })
            .where("location.id = :id", { id: location_id})
            .execute();
        console.log("Result")
        console.log(result)
        return true
    }   
    catch (e) {
        throw new Error(e.message);
    }
}