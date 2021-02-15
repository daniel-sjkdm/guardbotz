import axios from "axios";
import { GEOCODE_API_KEY } from "../util/constants";
import { Coordinates } from "../interfaces/geocode.interfaces";


const BASE_URL: string = "https://app.geocodeapi.io/api/v1";


export const address2Coord = async (address: string): Promise<Coordinates | null> => {
    try {
        const response = await axios.get(`${BASE_URL}/search?text=${address}&apikey=${GEOCODE_API_KEY}`);
        const features = response.data?.features;

        if (features) {
            const coordinatesList: Array<any> = features.filter((item: any) => item.properties.confidence >= 0.5).sort((x: any, y: any) =>  y.properties.confidence - x.properties.confidence);
            if (coordinatesList.length > 0) {
                console.log(coordinatesList[0])
                const [ lng, lat ] = coordinatesList[0].geometry.coordinates;
                return {
                    lat: lat,
                    lng: lng
                }
            }
            else {
                return null;
            }
        }
    }
    catch (e) {
        console.log("Error")
        console.log(e.message)
        return null;
    }
};