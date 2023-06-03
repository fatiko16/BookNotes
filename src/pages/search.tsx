import { useEffect, useState } from "react";
import SearchBar from "y/components/SearchBar";
import { api } from "y/utils/api";
import Image from "next/image";
const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [apiCallText, setApiCallText] = useState("");

  const { data, isLoading, refetch } = api.searchBooks.search.useQuery(
    apiCallText,
    {
      enabled: false,
    }
  );

  const handleSearch = () => {
    if (searchText !== "") {
      setHasSearched(true);
      setApiCallText(searchText);
    }
  };

  useEffect(() => {
    const refetchSearchResults = async () => {
      await refetch();
    };

    if (hasSearched) {
      console.log(apiCallText);
      console.log("Refetching the data");
      refetchSearchResults().catch((error) =>
        console.log(error, "error from the useEffect")
      );
    }
    setHasSearched(false);
  }, [hasSearched, refetch, apiCallText]);

  console.log(data);

  return (
    <div className="flex flex-col items-center">
      <SearchBar
        searchText={searchText}
        onChange={setSearchText}
        onSearch={handleSearch}
      />
      <div className="mx-auto mt-10 flex w-2/4 flex-col items-center">
        {!isLoading && data && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {data.items.map((item) => {
              return (
                <div
                  className="group relative rounded bg-gray-700 p-1"
                  key={item.id}
                >
                  <div className="min-h-80 aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                    <Image
                      className="h-auto max-w-full rounded-lg"
                      src={item.volumeInfo.imageLinks.thumbnail}
                      alt={item.volumeInfo.title}
                      width={300}
                      height={200}
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-white">
                        <a href="#">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          ></span>
                          {item.volumeInfo.title}
                        </a>
                      </h3>

                      {item.volumeInfo.authors &&
                        item.volumeInfo.authors.length > 1 && (
                          <p className="mt-1 text-sm text-white">
                            {`Authors: ${item.volumeInfo.authors.toString()}`}{" "}
                          </p>
                        )}
                      {item.volumeInfo.authors &&
                        !(item.volumeInfo.authors.length > 1) && (
                          <p className="mt-1 text-sm text-white">
                            <span className="font-bold">Author: </span>
                            {`${item.volumeInfo.authors.toString()}`}{" "}
                          </p>
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
