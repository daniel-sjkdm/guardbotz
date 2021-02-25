import { getConnection, getRepository, InsertResult } from "typeorm";
import { Location } from "../database/entity/Location";
import { Geometry } from "geojson";

/**
 *
 * @param location :
 * 	- address: string
 * 	- coordintaes: string -	 GEOMETRY(POINT(X Y))
 */
export const createLocation = async (
	lat: number,
	lng: number,
	address: string
): Promise<Location | never> => {
	try {
		const newLocation = await getConnection()
			.createQueryBuilder()
			.insert()
			.into(Location)
			.values({
				coordinates: () => `ST_GeomFromText('POINT(${lat} ${lng})', 4326)`,
				address: address,
			})
			.returning(["id", "coordinates", "address"])
			.execute();

		return newLocation.generatedMaps[0] as Location;
	} catch (e) {
		console.log("Error at createLocation service");
		console.log(e);
		throw new Error(e.message);
	}
};

/**
 *
 * @param address: Thw address is a string.
 * @param coordinates: The coordinates are a postgis geometry point
 * that has latitude and longitude.
 */
export const getLocation = async (
	address?: string,
	coordinates?: string
): Promise<Location | null> => {
	try {
		const repository = getRepository(Location);
		if (coordinates) {
			const location = repository.findOne({
				where: { coordinates: coordinates },
			});
			return location;
		} else {
			const location = repository.findOne({ where: { address: address } });
			return location;
		}
	} catch (e) {
		console.log("Error in get lOCATION");
		console.log(e);
		return null;
	}
};

export const getAllLocations = async (): Promise<
	[Location[], number] | null
> => {
	try {
		const repository = getRepository(Location);
		const [
			locations,
			number,
		] = await repository.createQueryBuilder().getManyAndCount();
		return [locations, number];
	} catch (e) {
		throw new Error(e.message);
	}
};

export const updateLocationById = async (
	location_id: string,
	address?: string,
	lat?: number,
	lng?: number
): Promise<void | never> => {
	try {
		const repository = getRepository(Location);

		let updateObject: any = {};
		address ? (updateObject.address = address) : null;
		lat && lng
			? (updateObject.coordinates = () =>
					`ST_GeomFromText('POINT(${lat} ${lng})', 4326)`)
			: null;

		const result = await repository.update(location_id, updateObject);

		if (result.affected === 0) {
			throw new Error("Something wrong happened...");
		}
	} catch (e) {
		throw new Error(e.message);
	}
};

export const getLocationById = async (
	locationId: string
): Promise<Location | never> => {
	try {
		const repository = getRepository(Location);
		const result = await repository.findOne({ id: locationId });

		if (!result) {
			throw new Error("The location doesn't exist");
		} else {
			return result;
		}
	} catch (e) {
		throw new Error(e.message);
	}
};

export const deleteLocationById = async (
	locationId: string
): Promise<void | never> => {
	try {
		const repository = getRepository("location");
		const result = await repository.delete({ id: locationId });
		if (result.affected === 0) {
			throw new Error("The location doesn't exist");
		} else {
			return;
		}
	} catch (e) {
		throw new Error(e.message);
	}
};
