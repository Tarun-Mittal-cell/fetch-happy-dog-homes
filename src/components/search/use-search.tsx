// useSearch.tsx

import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { matchSorter } from "match-sorter";
import { breedState, dogsState } from "../../store";

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dogs, setDogs] = useRecoilState(dogsState);
  const [breeds, setBreeds] = useRecoilState(breedState);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(10);
  const [selectedBreed, setSelectedBreed] = useState("");
  
  useEffect(() => {
    const fetchDogs = async () => {
      const dogsSearch = (await axios({
        method: "GET",
        url: "https://frontend-take-home-service.fetch.com/dogs/search?size=100",
        withCredentials: true,
      })) as any;

      const dogIds = dogsSearch?.data?.resultIds || [];

      const dogs = (await axios({
        method: "POST",
        url: "https://frontend-take-home-service.fetch.com/dogs",
        data: dogIds,
        withCredentials: true,
      })) as any;

      const dogsZipCodes = dogs?.data.map((dog: any) => dog.zip_code);

      const locations = (await axios({
        method: "POST",
        url: "https://frontend-take-home-service.fetch.com/locations",
        data: dogsZipCodes,
        withCredentials: true,
      })) as any;

      let idx = 0;
      const mappedDogs = dogs.data.map((dog: any) => {
        return {
          ...dog,
          location: locations.data[idx++],
          isFavorite: false,
        };
      });

      setDogs({
        ...dogs,
        fullList: mappedDogs || [],
        shownList: mappedDogs || [],
      });
    };

    const fetchBreedsAndZipCodes = async () => {
      const breeds = await axios({
        method: "GET",
        url: "https://frontend-take-home-service.fetch.com/dogs/breeds",
        withCredentials: true,
      });

      setBreeds(breeds?.data || []);
    };

    fetchDogs();
    fetchBreedsAndZipCodes();
  }, []);

  const handleSearch = (_searchTerm: string) => {
    const searchResult = matchSorter(dogs.fullList, _searchTerm, {
      keys: ["name", "breed", "location.city"],
    });

    if (searchResult?.length) {
      setDogs({ ...dogs, shownList: searchResult || [] });
    }
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  const sortResults = (direction: string) => {
    const listToSort = [...dogs.shownList]; 

    listToSort.sort((a, b) => {
        let ageDifference = direction === 'asc' ? a.age - b.age : b.age - a.age;

        if (ageDifference !== 0) {
            return ageDifference;
        }

        let nameDifference = a.name.localeCompare(b.name);

        if (nameDifference !== 0) {
            return nameDifference;
        }

        let breedDifference = a.breed.localeCompare(b.breed);

        if (breedDifference !== 0) {
            return breedDifference;
        }

        return a.location.city.localeCompare(b.location.city);
    });

    setDogs({ ...dogs, shownList: listToSort });
  };

  const toggleFavorite = (id: string, isFavorite: boolean) => {
    let dog = dogs.shownList.find((item: any) => id === item.id);
    dog = { ...dog, isFavorite };
    const idx = dogs.shownList.findIndex((item: any) => id === item.id);

    const updatedDogs = [
      ...dogs.shownList.slice(0, idx),
      { ...dogs.shownList[idx], isFavorite },
      ...dogs.shownList.slice(idx + 1),
    ];

    setDogs({ ...dogs, shownList: updatedDogs || [] });
  };

  // Get current dogs
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.shownList.slice(indexOfFirstDog, indexOfLastDog);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return {
    dogs: currentDogs,
    breeds,
    handleSearch,
    selectedBreed,
    setSelectedBreed,
    setSearchTerm,
    sortResults,
    toggleFavorite,
    dogsPerPage,
    totalDogs: dogs.shownList.length,
    paginate
  };
};
