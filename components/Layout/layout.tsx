import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

function Layout({ children }) {
  const url = useRouter();
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
          <input
            placeholder="Search..."
            className="border-2 outline-none px-2 py-1 w-96 rounded-md"
          />
        </section>
        <section className="mt-14 w-full ml-auto mr-auto">
          <nav className="flex items-center w-full justify-center my-5">
            <Link
              href="/"
              className="mx-2 px-3 py-2 hover:bg-white text-gray-500 rounded text-lg hover:text-blue-500"
            >
              Relevant
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                // url.push("/latest", undefined, { shallow: true });
                window.location.href = "/latest";
              }}
              className="mx-2 px-3 py-2 hover:bg-white text-gray-500 rounded hover:text-blue-500"
            >
              Latest
            </button>
            <Link
              href="/"
              className="mx-2 px-3 py-2 hover:bg-white text-gray-500 rounded hover:text-blue-500"
            >
              Top
            </Link>
          </nav>
        </section>
      </header>
      <main>{children}</main>
    </>
  );
}

export default Layout;
