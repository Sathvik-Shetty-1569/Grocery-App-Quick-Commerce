import axios from "axios"; 
import { GOOGLE_MAPS_API_KEY } from "./config";
import {updateUserLocation} from "./authService";

export const reverseGeocode = async (latitude: number, longitude: number, setUser: any) =>{
try {
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
        );
    if (response.data.status === "OK") {
        const address = response.data.results[0].formatted_address;
        updateUserLocation({liveLocation: {latitude, longitude}, address}, setUser)

    }else{
        console.error("Geo code failed:", response.data);
    }

} catch (error) {
 console.error("Error in reverse geocoding:", error);   
}


}