import { Coordinates } from "./geocode.interfaces";


export interface LocationShape {
    address: string;
    coordinates: string | null;
}

export interface IncidentShape {
    id: string;
    description: string;
    reported: string | undefined;
    location: LocationShape;
}