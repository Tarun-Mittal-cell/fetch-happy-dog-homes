import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { getBreeds, searchDogs } from "../../api/dogs";
import { breedState, dogsState } from "../../store";

export const useSearch = () => {
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

      setDogs(dogs?.data || []);
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

  const handleSearch = async () => {
    // const searchResponse = await searchDogs({ breeds: [selectedBreed], zipCodes: [selectedZipCode] });
    const searchResponse = await searchDogs(selectedBreed);
    console.log(searchResponse); // Do something with search results
  };

  return {
    dogs,
    breeds,
    handleSearch,
    selectedBreed,
    setSelectedBreed,
  };
};
