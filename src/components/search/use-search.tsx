import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { matchSorter } from "match-sorter";
import { breedState, dogsState } from "../../store";

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dogs, setDogs] = useRecoilState(dogsState);
  const [breeds, setBreeds] = useRecoilState(breedState);
  // const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  // const [selectedZipCode, setSelectedZipCode] = useState('');

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
      debugger;
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
          location: locations.data[idx],
          isFavorite: false,
        };
      });

      setDogs({
        ...dogs,
        fullList: mappedDogs || [],
        shownList: mappedDogs || [],
      });
    };

    //   setDogs(dogs?.data || []);
    // };
    // /dogs
    const fetchBreedsAndZipCodes = async () => {
      const breeds = await axios({
        method: "GET",
        url: "https://frontend-take-home-service.fetch.com/dogs/breeds",
        withCredentials: true,
      });
      // const zipcodes = async () => {
      //   const res = await axios({
      //     method: "GET",
      //     url: "https://frontend-take-home-service.fetch.com//locations/search",
      //     withCredentials: true,
      //   });
      // };

      setBreeds(breeds?.data || []);
      // setZipCodes(zipCodesResponse);
    };
    fetchDogs();
    fetchBreedsAndZipCodes();
  }, []);

  const handleSearch = (_searchTerm: string) => {
    // const searchResponse = await searchDogs({ breeds: [selectedBreed], zipCodes: [selectedZipCode] });
    // const searchResponse = await searchDogs(selectedBreed);
    // console.log(searchResponse); // Do something with search results

    const searchResult = matchSorter(dogs.fullList, _searchTerm, {
      keys: ["name", "breed", "location.city"],
    });
    console.log(searchResult);
    if (searchResult?.length) {
      setDogs({ ...dogs, shownList: searchResult || [] });
    }
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  const sortResults = (direction: string) => {
    console.log({ list: dogs?.shownList });
    let sortedByAgeNameBreedCity = dogs?.shownList?.sort((a, b) => {
      let ageDifference = a.age - b.age;
      debugger;
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
    return sortedByAgeNameBreedCity;
  };

  const toggleFavorite = (id: string, isFavorite: boolean) => {
    let dog = dogs.shownList.find((item: any) => id === item.id);
    dog = { ...dog, isFavorite };
    const idx = dogs.shownList.findIndex((item: any) => id === item.id);
    // const updatedShowList = [...dogs.shownList, dog];

    const updatedDogs = [
      ...dogs.shownList.slice(0, idx),
      { ...dogs.shownList[idx], isFavorite },
      ...dogs.shownList.slice(idx + 1),
    ];
    setDogs({ ...dogs, shownList: updatedDogs || [] });
  };

  return {
    dogs: dogs.shownList,
    breeds,
    handleSearch,
    selectedBreed,
    setSelectedBreed,
    setSearchTerm,
    sortResults,
    toggleFavorite,
  };
};
