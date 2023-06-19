import axios from "axios";

// Fetches the list of dog IDs based on breed
export const searchDogs = async (breed: string) => {
    const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/search', {
        params: {
            breeds: [breed],
        },
        withCredentials: true, 
    });
    return response.data;
};

// This fetches the dog details based on their ID's
export const getDogs = async (dogIds: string[]) => {
    const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs', dogIds, {
        withCredentials: true, 
    });
    return response.data;
};