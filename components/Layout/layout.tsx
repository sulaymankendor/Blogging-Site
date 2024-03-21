import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Oval } from "react-loader-spinner";
import Image from "next/image";
import Link from "next/link";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";

import Search from "../Search/Search";
import CustomHits from "../Search/CustomHits";
import BurgerIcon from "../svgs/burger/BurgerIcon";
import { BlogContext } from "../../lib/utilities/context";
import MainNavs from "../Home/navs/MainNavs";
import CancelNavMenuModal from "../svgs/x-mark/CancelNavMenuModal";

function Layout({ children }) {
  const [favouriteBlogs, setFavouriteBlogs] = useState([]);
  const [blur, setBlur] = useState(false);
  const [blur2, setBlur2] = useState(false);
  const [searchValues, setSearchValues] = useState("");
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const path = useRouter();
  const [addToFouvaourites, setAddToFavourites] = useState(false);
  const [autoORHidden, setAutoORHidden] = useState("auto");
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showDark, setShowDark] = useState(false);
  const [added, setAdded] = useState(false);
  const addedToFavourites = useRef(null);
  const useBodyScrollLock = () => {
    useLayoutEffect((): any => {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = autoORHidden;
      return () => (document.body.style.overflow = originalStyle);
    }, [autoORHidden]);
  };

  useBodyScrollLock();

  const latest = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (`/` !== route.route) {
      setAutoORHidden("hidden");
      setLoading(true);
      setBlur2(true);
    }
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
    if (`/favourites` !== route.route) {
      setAutoORHidden("hidden");
      setLoading(true);
      setBlur2(true);
    }
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
  useEffect(() => {
    setBlur(false);
    setBlur2(false);
    setLoading(false);
    setAutoORHidden("auto");
  }, [route.asPath]);
  const ref = useRef(null);

  const [dimensions, setDimensions] = useState({ width: 0 });

  useEffect(() => {
    const getDimensions = () => ({
      width: ref.current.offsetWidth,
    });

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (ref.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref]);
  useEffect(() => {
    if (dimensions.width > 900) {
      setAutoORHidden("auto");
    } else {
      setAutoORHidden("hidden");
    }
  }, [dimensions.width]);

  return (
    <>
      {loading && (
        <div className="fixed top-[45vh] left-[47vw] z-50">
          <Oval secondaryColor="azure" />
        </div>
      )}
      <header className="flex">
        <section className="flex items-center bg-white fixed left-0 right-0 border-b border-gray-200 border-solid z-10">
          <button
            onClick={() => {
              setAutoORHidden("hidden");
              setShowDark(true);
              setShowMenuModal(true);
            }}
          >
            <BurgerIcon />
          </button>

          <a
            href="/"
            className="max-sm:mr-7"
            onClick={(e) => {
              if ("/" !== route.asPath.replaceAll("%20", " ")) {
                setLoading(true);
                setBlur2(true);
                setAutoORHidden("auto");
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
          </a>
          <InstantSearch searchClient={searchClient} indexName="Blog_Site">
            <Search values={searchValues} searchValues={setSearchValues} />

            <CustomHits
              checkBlur={blur}
              blur={setBlur}
              blur2={setBlur2}
              searchValues={setSearchValues}
              values={searchValues}
            />
          </InstantSearch>
        </section>
        <section
          className={`mt-14 w-full ml-auto mr-auto ${blur && "blur"} ${
            blur2 && "blur"
          }`}
        >
          <nav className="flex items-center w-full justify-center my-5">
            <Link
              href="/"
              className={` mx-2 px-3 py-2 hover:bg-white text-gray-500 rounded text-lg hover:text-blue-500`}
              style={navHome}
              onClick={() => {
                if (`/` !== route.asPath.replaceAll("%20", " ")) {
                  setAutoORHidden("hidden");
                  setLoading(true);
                  setBlur2(true);
                }
              }}
            >
              Home
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
      <BlogContext.Provider
        value={[
          setBlur2,
          setLoading,
          favouriteBlogs,
          addToFouvaourites,
          setFavouriteBlogs,
          added,
          setAdded,
          addedToFavourites,
        ]}
      >
        <main className={` ${blur && "blur"} ${blur2 && "blur"}`} ref={ref}>
          {children}
        </main>
      </BlogContext.Provider>
      {loading && (
        <div className="bg-black fixed top-[56px] right-[-35vw] left-[-21vw] bottom-[-178vh] opacity-20 z-[5]"></div>
      )}
      {showDark && (
        <div
          onClick={() => {
            setAutoORHidden("auto");
            setShowMenuModal(false);
            setShowDark(false);
          }}
          className="bg-black fixed top-[56px] right-[-35vw] left-[-21vw] bottom-[-178vh] opacity-20 z-[5] min-[901px]:hidden"
        ></div>
      )}
      {showMenuModal && (
        <section className="z-40 w-[300px] max-[900px]:inline ml-2 hidden fixed top-0 left-[-8px] bg-white h-[100vh] overflow-y-scroll">
          <div className="flex items-center justify-between border-b-gray-200 p-5 fixed w-[300px] bg-white">
            <p className="font-bold text-lg">DEV Community</p>
            <button
              onClick={() => {
                setAutoORHidden("auto");
                setShowDark(false);
                setShowMenuModal(false);
              }}
              className="hover:bg-indigo-200 rounded p-2"
            >
              <CancelNavMenuModal />
            </button>
          </div>
          <div className="mt-20 w-60 mx-auto bg-white h-60 p-3 border border-gray-200 border-solid rounded-md mb-4">
            <h1 className="text-xl font-bold">
              DEV Community is a community of 1,149,768 amazing developers
            </h1>
            <p className="text-slate-600 pt-4">
              We're a place where coders share, stay up-to-date and grow their
              careers.
            </p>
          </div>
          <MainNavs />
        </section>
      )}
    </>
  );
}

export default Layout;
