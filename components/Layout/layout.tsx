import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import algoliasearch from "algoliasearch/lite";
import Search from "../Search/Search";

import {
  Highlight,
  Hits,
  InstantSearch,
  SearchBox,
} from "react-instantsearch-dom";
import CustomHits from "../Search/CustomHits";
import { useRef, useState } from "react";

function Layout({ children }) {
  const path = useRouter();
  const latest = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    path.push(
      {
        pathname: "/",
        query: "latest",
      },
      undefined,
      { shallow: true }
    );
  };
  const favourite = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    path.push(
      {
        pathname: "/favourites",
        query: "favourites",
      },
      undefined,
      { shallow: true }
    );
  };
  let checkHomeQuery = Object.keys(path.query).length === 0;
  let navHome = checkHomeQuery ? { color: "black", fontWeight: "bold" } : {};
  let checkLatestQuery = path.query.hasOwnProperty("latest");
  let navLatest = checkLatestQuery
    ? { color: "black", fontWeight: "bold" }
    : {};
  let checkFavouritesQuery = path.query.hasOwnProperty("favourites");
  let navFavourites = checkFavouritesQuery
    ? { color: "black", fontWeight: "bold" }
    : {};
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY
  );
  const [blur, setBlur] = useState(false);
  const [searchValues, setSearchValues] = useState("");
  const ref = useRef(null);
  // console.log(preventScroll.current.style);
  return (
    <>
      <header className="flex">
        <section className="flex items-center bg-white fixed left-0 right-0 border-b border-gray-200 border-solid z-10">
          <Link href="/">
            <Image
              src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
              alt="DEV Community"
              width={50}
              height={50}
              className="mx-5 my-2"
            />
          </Link>
          <InstantSearch searchClient={searchClient} indexName="Blog_Site">
            <Search values={searchValues} searchValues={setSearchValues} />
            <CustomHits
              blur={setBlur}
              searchValues={setSearchValues}
              values={searchValues}
            />
          </InstantSearch>
        </section>
        <section className={`mt-14 w-full ml-auto mr-auto ${blur && "blur"}`}>
          <nav className="flex items-center w-full justify-center my-5">
            <Link
              href="/"
              className={` mx-2 px-3 py-2 hover:bg-white text-gray-500 rounded text-lg hover:text-blue-500`}
              style={navHome}
            >
              Relevant
            </Link>
            <Link
              href="/"
              onClick={latest}
              className="mx-2 px-3 py-2 hover:bg-white text-gray-500 rounded hover:text-blue-500"
              style={navLatest}
            >
              Latest
            </Link>
            <Link
              href="/favourites"
              className="mx-2 px-3 py-2 hover:bg-white text-gray-500 rounded hover:text-blue-500"
              onClick={favourite}
              style={navFavourites}
            >
              Favorites
            </Link>
          </nav>
        </section>
      </header>

      <main className={` ${blur && "blur"}`}>{children}</main>
    </>
  );
}

export default Layout;
