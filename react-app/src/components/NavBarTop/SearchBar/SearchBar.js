import "./SearchBar.css";

export const SearchBar = () => {
  return (
    <>
      <div className="SearchBarContainerNav">
        <div className="SearchBarInternalContainer">
          <input
            className="SearchBarNav"
            type="search"
            //   value={searchTitle}
            placeholder={"Search"}
            //   placeholder={"Search for Images or Users..." || searchTitle}
            //   onChange={handleSubmit}
          />
        </div>
        <div className="MagnifyingGlassSearchBarContainer">
        <div className="MagnifyingGlassSearchBar">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        </div>
      </div>
    </>
  );
};
