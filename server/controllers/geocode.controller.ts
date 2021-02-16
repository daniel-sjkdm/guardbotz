import { address2Coord } from "../services/geocode.service";
import { Coordinates } from "../interfaces/geocode.interfaces";

export const address2CoordController = async (req: any, res: any) => {
	const address: string | undefined = req.query.address;

	console.log(address);

	if (!address) {
		res.json({
			success: false,
			error: {
				message: "There are missing parameters",
			},
		}).status(400);
	}

	try {
		const coordinates: Coordinates | null = await address2Coord(address);

		if (coordinates) {
			res.json({
				success: true,
				error: null,
				data: coordinates,
			});
		} else {
			res.json({
				success: false,
				error: "The address couldn't be translated to coordinates",
			}).status(400);
		}
	} catch (e) {
		res.json({
			success: false,
			error: {
				message: e.message,
			},
		}).status(400);
	}
};
