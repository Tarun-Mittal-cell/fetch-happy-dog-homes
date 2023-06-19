import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { getBreeds, searchDogs } from "../api/dogs";

const Search = () => {
  const [breeds, setBreeds] = useRecoilState<string[]>([]);
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

  return (
    <div>
      <select
        value={selectedBreed}
        onChange={(e) => setSelectedBreed(e.target.value)}
      >
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>

      {/* <select value={selectedZipCode} onChange={(e) => setSelectedZipCode(e.target.value)}>
                {zipCodes.map((zipCode) => (
                    <option key={zipCode} value={zipCode}>
                        {zipCode}
                    </option>
                ))}
            </select> */}

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
