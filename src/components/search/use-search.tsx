import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { getBreeds, searchDogs } from "../../api/dogs";
import { breedState } from "../../store";
import axios from "axios";

export const useSearch = () => {
  const [breeds, setBreeds] = useRecoilState(breedState);
  // const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  // const [selectedZipCode, setSelectedZipCode] = useState('');

  useEffect(() => {
    // /dogs
    const fetchBreedsAndZipCodes = async () => {
      const breeds = await axios({
        method: "GET",
        url: "https://frontend-take-home-service.fetch.com/dogs/breeds",
        withCredentials: true,
      });
      const zipcodes = async () => {
        const res = await axios({
          method: "GET",
          url: "https://frontend-take-home-service.fetch.com//locations/search",
          withCredentials: true,
        });
      };

      setBreeds(breeds?.data || []);
      // setZipCodes(zipCodesResponse);
    };
    fetchBreedsAndZipCodes();
  }, []);

  const handleSearch = async () => {
    // const searchResponse = await searchDogs({ breeds: [selectedBreed], zipCodes: [selectedZipCode] });
    const searchResponse = await searchDogs(selectedBreed);
    console.log(searchResponse); // Do something with search results
  };

  return {
    breeds,
    handleSearch,
    selectedBreed,
    setSelectedBreed,
  };
};
