import React, { useState, useEffect } from 'react';
import { getDogs, searchDogs } from '../api/dogs';

interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    breed: string;
}

const DogList = () => {
    const [dogs, setDogs] = useState<Dog[]>([]);

    useEffect(() => {
        const fetchDogs = async () => {
            // Fetch an array of dog IDs by breed
            const { resultIds: dogIds } = await searchDogs('Labrador'); // Replace 'Labrador' with the breed you want to fetch
            // Fetch the details of dogs using the array of dog IDs
            const fetchedDogs = await getDogs(dogIds);
            setDogs(fetchedDogs);
        };
        fetchDogs();
    }, []);

    return (
        <div>
            {dogs.map((dog) => (
                <div key={dog.id}>
                    <img src={dog.img} alt={dog.name} />
                    <p>{dog.name}</p>
                    <p>{dog.age}</p>
                    <p>{dog.breed}</p>
                </div>
            ))}
        </div>
    );
}

export default DogList;
