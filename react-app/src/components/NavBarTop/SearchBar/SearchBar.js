import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./SearchBar.css";

export const SearchBar = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");

  const changeSearchTerm = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.length > 0) {
      // history.push(`/search/${searchTerm}`);
      history.push({
        pathname: `/search/${searchTerm}`,
        state: { filterState: "" },
      });
    }
  };

  return (
    <>
      <div className="SearchBarContainerNav">
        <form className="SearchBarInternalContainer" onSubmit={handleSubmit}>
          <input
            className="SearchBarNav"
            type="search"
            value={searchTerm}
            placeholder={"Search..."}
            //   placeholder={"Search for Images or Users..." || searchTitle}
            onChange={changeSearchTerm}
          />
        </form>
        <div
          className="MagnifyingGlassSearchBarContainer"
          onClick={handleSubmit}
        >
          <div className="MagnifyingGlassSearchBar">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </div>
    </>
  );
};
