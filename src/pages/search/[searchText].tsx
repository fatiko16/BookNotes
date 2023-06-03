import { useState } from "react";
import SearchBar from "y/components/SearchBar";

const Search = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="flex flex-col items-center">
      {/* <SearchBar searchText={searchText} onChange={setSearchText} /> */}
      <div className="mx-auto mt-10 flex w-2/4 flex-col items-center"></div>
    </div>
  );
};

export default Search;
