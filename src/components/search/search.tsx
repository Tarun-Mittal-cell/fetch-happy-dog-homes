import { useSearch } from "./use-search";
import "./styles.css";

export const Search = () => {
  const {
    dogs,
    breeds,
    handleSearch,
    selectedBreed,
    setSelectedBreed,
    setSearchTerm,
  } = useSearch();

  return (
    <div className="search-main-container">
      <input
        type="text"
        onChange={(evt) => {
          setSearchTerm(evt.target.value);
        }}
      />
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

      {/* <button onClick={handleSearch}>Search</button> */}

      <div className="dogs-container">
        {dogs.map((dog, $index) => {
          return (
            <div key={$index} className="dog-container">
              <div className="dog-img-container">
                <img className="dog-img" src={dog.img} />
              </div>
              <div className="dog-name-container">
                <div className="dog-name">{dog.name}</div>
              </div>

              <div className="dog-breed-container">
                <div className="dog-breed">{dog.breed}</div>
              </div>

              <div className="dog-age-container">
                <div className="dog-age">{dog.age}</div>
              </div>
              <div className="dog-zipcode-container">
                <div className="dog-zipcode">{dog.zip_code}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
