import Link from "next/link";
import { connectStateResults } from "react-instantsearch-dom";
import Image from "next/image";
import AlgoliaSearch from "../svgs/algolia-logo/AlgoliaSearch";
import FrownEmoji from "../svgs/frown-emoji/FrownEmoji";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";

function Hits({ searchState, searchResults, blur, searchValues, values }) {
  const validQuery = searchState.query?.length >= 1;
  const showDarkBackDrop = Object.keys(searchState).length;

  const [show, setShow] = useState(true);
  useEffect(() => {
    if (values) {
      setShow(true);
    }
  }, [values]);
  if (validQuery && show) {
    blur(true);
  } else {
    blur(false);
  }

  return (
    <div>
      {values && (
        <div className="shadow-sm bg-white absolute top-24 left-[22vw] w-[55%] flex flex-col rounded z-[10]">
          {validQuery && (
            <Link href="/" className="w-24">
              <Image
                src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
                alt="DEV Community"
                width={50}
                height={50}
                className="mx-5 my-2"
              />
            </Link>
          )}
          {searchResults?.hits.length === 0 && validQuery && (
            <p className="flex items-center justify-center bg-gray-100 p-16 border-y">
              <FrownEmoji /> Aw snap! No search results were found.
            </p>
          )}
          {searchResults?.hits.length > 0 && validQuery && (
            <ol className="flex flex-col overflow-y-scroll h-60 border-y bg-gray-100">
              {searchResults.hits.map((hit) => (
                <Link
                  key={hit.objectID}
                  href={`/${hit.authorName}/${hit.title}`}
                  className="hover:bg-white py-4 px-6 border-b"
                >
                  <div className="flex items-center">
                    <Avatar
                      alt={hit.authorName}
                      src={hit.authorImage}
                      style={{ zIndex: "0" }}
                    />
                    <p className="pl-1 text-sm text-gray-700">
                      {hit.authorName}
                    </p>
                  </div>
                  <p className="font-bold ml-11">{hit.title}</p>
                </Link>
              ))}
            </ol>
          )}
          {validQuery && <AlgoliaSearch />}
        </div>
      )}

      {showDarkBackDrop !== 0 && validQuery && show && (
        <div
          onClick={() => {
            setShow(false);
            blur(false);
            searchValues("");
          }}
          className="bg-black absolute top-[56px] right-[-35vw] left-[-21vw] bottom-[-178vh] opacity-20 z-[5]"
        ></div>
      )}
    </div>
  );
}

export default connectStateResults(Hits);
