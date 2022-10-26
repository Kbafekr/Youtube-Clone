import './SearchBar.css'

export const SearchBar = () => {
  return (
    <>
      <div className="upper-middle">
        <input
          className="SearchBarNav"
          type="search"
        //   value={searchTitle}
          placeholder={"Search"}
        //   placeholder={"Search for Images or Users..." || searchTitle}
        //   onChange={handleSubmit}
        />
      </div>
    </>
  );
};
