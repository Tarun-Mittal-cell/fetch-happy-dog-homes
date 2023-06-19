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

export const getBreeds = async () => {
    try {
        const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds');
        if (response.status === 200) {
            return response.data;  
        }
        throw new Error(`Failed to fetch breeds: ${response.statusText}`);
    } catch (error) {
        console.error('An error occurred while fetching breeds', error);
        throw error;
    }
};

// export const searchDogs = async (breeds: string[], zipCodes: string[], ageMin: number, ageMax: number) => {
//     try {
//         const response = await axios.get('/dogs/search', {
//             params: {
//                 breeds,
//                 zipCodes,
//                 ageMin,
//                 ageMax,
//             },
//         });

//         if (response.status === 200) {
//             return response.data.resultIds;  // Assuming the API returns the resultIds in data
//         }
//         throw new Error(`Failed to search dogs: ${response.statusText}`);
//     } catch (error) {
//         console.error('An error occurred while searching dogs', error);
//         throw error;
//     }
// };