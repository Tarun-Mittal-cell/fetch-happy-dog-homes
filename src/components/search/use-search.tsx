import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { getBreeds, searchDogs } from "../../api/dogs";
import { breedState } from "../../store";

export const useSearch = () => {
  const [breeds, setBreeds] = useRecoilState(breedState);
  // const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  // const [selectedZipCode, setSelectedZipCode] = useState('');

  useEffect(() => {
    const fetchBreedsAndZipCodes = async () => {
      const breedsResponse = await getBreeds();
      debugger;
      // const zipCodesResponse = await getZipCodes();

      setBreeds(breedsResponse);
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
