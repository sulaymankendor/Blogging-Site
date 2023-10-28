import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { connectStateResults } from "react-instantsearch-dom";
import { Avatar } from "@mui/material";
import { Oval } from "react-loader-spinner";

import { truncateText } from "@/lib/utilities/truncateText";
import FrownEmoji from "../svgs/frown-emoji/FrownEmoji";
import { date } from "@/lib/utilities/date";
import AlgoliaSearch from "../svgs/algolia-logo/AlgoliaSearch";

function Hits({
  searchState,
  searchResults,
  blur,
  blur2,
  searchValues,
  values,
}) {
  let [lockScroll, setLockScroll] = useState("auto");
  const validQuery = searchState.query?.length >= 1;
  const showDarkBackDrop = Object.keys(searchState).length;
  const useBodyScrollLock = () => {
    useLayoutEffect((): any => {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = lockScroll;
      return () => (document.body.style.overflow = originalStyle);
    }, [lockScroll]);
  };

  const [show, setShow] = useState(true);

  useEffect(() => {
    if (validQuery) {
      setLockScroll("hidden");
    } else {
      setLockScroll("auto");
    }
  }, [validQuery, lockScroll]);

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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loading) {
      blur2(true);
    }
  }, [loading]);
  const route = useRouter();
  // const [countClick, setCountClick] = useState(0);
  useEffect(() => {
    blur(false);
    blur2(false);
    setLoading(false);
    setShow(false);
    setLockScroll("auto");
  }, [route.asPath]);
  useEffect(() => {
    if (show === false) {
      setLockScroll("auto");
    } else if (show === true) {
      setLockScroll("hidden");
    }
  }, [show]);
  useEffect(() => {
    if (loading) {
      setLockScroll("hidden");
    } else {
      setLockScroll("auto");
    }
  }, [loading]);
  // solve letter
  // useEffect(() => {
  //   searchResults?.hits.map((hit) => {
  //     if (url !== route.asPath.replaceAll("%20", " ") && loading === false) {
  //       setLockScroll("auto");
  //       console.log(
  //         `/${hit.authorName}/${hit.title}` ===
  //           route.asPath.replaceAll("%20", " ")
  //       );
  //     } else {
  //       console.log("yess");
  //       setLockScroll("auto");
  //     }
  //   });
  // }, [countClick]);
  useBodyScrollLock();
  return (
    <div>
      {loading && (
        <div className="absolute top-[45vh] left-[47vw]">
          <Oval secondaryColor="azure" />
        </div>
      )}

      {values && (
        <div className="max-[1000px]:w-[96vw] max-[1000px]:mx-5 max-[1000px]:left-0 max-md:w-[96vw] max-md:mx-3 max-md:left-0 shadow-sm bg-white absolute top-24 left-[22vw] w-[55%] flex flex-col rounded z-[10]">
          {validQuery && (
            <Link
              href="/"
              className="w-24"
              onClick={() => {
                if ("/" === route.asPath) {
                  setShow(false);
                  searchValues("");
                  setLockScroll("auto");
                } else if ("/" !== route.asPath) {
                  setLockScroll("auto");
                  setShow(true);
                  blur(false);
                  searchValues("");
                  setLoading(true);
                }
              }}
            >
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
                  onClick={() => {
                    setShow(false);
                    blur(false);
                    searchValues("");
                    setLockScroll("auto");
                    if (
                      `/${hit.authorName}/${hit.title}` !==
                      route.asPath.replaceAll("%20", " ")
                    ) {
                      setLoading(true);
                    }
                  }}
                >
                  <div className="flex items-center w-full justify-between">
                    <div className="flex items-center">
                      <Avatar
                        alt={hit.authorName}
                        src={hit.authorImage}
                        style={{ zIndex: "0" }}
                      />
                      <p className="pl-1 text-sm text-gray-800">
                        {hit.authorName}
                      </p>
                    </div>
                    <p className="text-xs pl-2 text-gray-700">{`${
                      date(hit.date)[0]
                    } ${date(hit.date)[1]} ${date(hit.date)[2]}
                  `}</p>
                  </div>
                  <p className="font-bold ml-11 mt-[-4px] max-md:mt-1">
                    {hit.title}
                  </p>
                  <p className="ml-11 mt-1 text-sm font-normal w-5/6 text-gray-700 max-md:mt-1">
                    {truncateText(
                      hit.content.slice(1, 2)[0].props.children[0].props
                        .children[0],
                      25
                    )}
                    ...
                  </p>
                </Link>
              ))}
            </ol>
          )}
          {validQuery && <AlgoliaSearch />}
        </div>
      )}
      {showDarkBackDrop !== 0 && validQuery && show && (
        <div
          onClick={(): void => {
            setLockScroll("auto");
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
