import {
	getAllLocations,
	getLocationById,
	deleteLocationById,
	createLocation,
	updateLocationById,
} from "../services/location.service";

export const getLocationsController = async (req: any, res: any) => {
	try {
		const locations = await getAllLocations();

		res.json({
			success: true,
			error: null,
			data: locations,
		});
	} catch (e) {
		res
			.json({
				success: false,
				error: {
					message: e.message,
				},
			})
			.status(400);
	}
};

export const getLocationByIdController = async (req: any, res: any) => {
	const locationId: string | undefined = req.params.id;

	try {
		const location = await getLocationById(locationId);
		res.json({
			success: true,
			error: null,
			data: location,
		});
	} catch (e) {
		res
			.json({
				success: false,
				error: e.message,
			})
			.status(400);
	}
};

export const deleteLocationByIdController = async (req: any, res: any) => {
	const locationId: string | undefined = req.params.id;

	if (!locationId) {
		res
			.json({
				success: false,
				error: "The location is missing",
			})
			.status(400);
	}

	try {
		await deleteLocationById(locationId);
		res
			.json({
				success: true,
				error: null,
				data: {
					message: "The location was deleted",
				},
			})
			.status(400);
	} catch (e) {
		res
			.json({
				success: false,
				error: e.message,
			})
			.status(400);
	}
};

export const createLocationController = async (req: any, res: any) => {
	const { address, lat, lng } = req.body;

	if (!address || !lat || !lng) {
		res
			.json({
				success: false,
				error: "There are misssing parameters",
			})
			.status(400);
		return;
	}

	try {
		const newLocation = await createLocation(
			parseFloat(lat),
			parseFloat(lng),
			address
		);
		res
			.json({
				success: true,
				error: null,
				data: {
					location: newLocation,
				},
			})
			.status(201);
	} catch (e) {
		res
			.json({
				success: false,
				error: e.message,
			})
			.status(400);
	}
};

export const updateLocationController = async (req: any, res: any) => {
	const { address, lat, lng } = req.body;
	const id: string = req.params;

	if (!id || (!address && (!lat || !lng))) {
		res
			.json({
				success: false,
				error: "You must specify the id and at least one parameter",
			})
			.status(400);
	}

	try {
		await updateLocationById(id, address, lat, lng);

		res.json({
			success: true,
			error: null,
			data: {
				message: "The location was updated",
			},
		});
	} catch (e) {
		res
			.json({
				success: false,
				error: e.message,
			})
			.status(400);
	}
};
