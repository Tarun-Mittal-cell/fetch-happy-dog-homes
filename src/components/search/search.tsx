// search.tsx

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
    sortResults,
    toggleFavorite,
    dogsPerPage,
    totalDogs,
    paginate
  } = useSearch();

  // Pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

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

      <>
        <button onClick={() => sortResults("asc")}>Sort asc</button>
        <button onClick={() => sortResults("desc")}>Sort desc</button>
      </>
      <div className="dogs-container">
        {dogs.map((dog, $index) => (
            <div key={$index} className="dog-container">
              <div className="dog-img-container">
                <img className="dog-img" src={dog.img} alt="dog" />
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
              <div>
                <button onClick={() => toggleFavorite(dog.id, !dog.isFavorite)}>
                  {dog.isFavorite ? "Favorite dog" : "Not a favor"}
                </button>
              </div>
            </div>
        ))}
      </div>
      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};
