import { useSearch } from "./use-search";

export const Search = () => {
  const { breeds, handleSearch, selectedBreed, setSelectedBreed } = useSearch();

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
      

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
