import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@mui/material";

import { BlogContext } from "@/lib/utilities/context";
import { Blog } from "@/Types/types";
import { date } from "@/lib/utilities/date";

function BlogArticles({ blogArcticles }) {
  const router = useRouter();
  const blogContext = useContext(BlogContext);
  const [autoORHidden, setAutoORHidden] = useState("auto");
  let data = blogArcticles;
  if (router.query.latest === "") {
    data = blogArcticles.slice(0, 4);
  }

  const useBodyScrollLock = () => {
    useLayoutEffect((): any => {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = autoORHidden;
      return () => (document.body.style.overflow = originalStyle);
    }, [autoORHidden]);
  };
  useEffect(() => {
    for (
      let index = 0;
      index < document.getElementsByClassName("svg").length;
      index++
    ) {
      blogContext[2].map((blog) => {
        if (
          blog.sys.id ===
          // @ts-ignore
          document.getElementsByClassName("svg")[index].dataset.blogID
        ) {
          // @ts-ignore
          document.getElementsByClassName("svg")[index].style.fill = "red";
        }
      });
    }
  }, [router.asPath]);
  useBodyScrollLock();
  return (
    <section>
      {data.map((article: Blog) => {
        return (
          <div
            key={article.sys.id}
            className="w-[54vw] mx-2 max-md:w-[100vw] max-md:mx-auto max-[900px]:w-[61vw] max-[900px]:ml-2 bg-white mt-2 rounded-md border border-gray-200 border-solid pb-9 "
          >
            <Link
              href={`/${article.fields.authorName.replaceAll(" ", "-")}/${
                article.fields.slug
              }`}
              onClick={() => {
                if (
                  `/${article.fields.authorName}/${article.fields.blogTitle}` !==
                  router.asPath.replaceAll("-", " ")
                ) {
                  blogContext[0](true);
                  blogContext[1](true);
                  setAutoORHidden("hidden");
                }
              }}
            >
              <Image
                src={"https:" + article.fields.Image.fields.file.url}
                alt={article.fields.blogTitle}
                width={10000}
                height={0}
                style={{
                  width: "100%",
                  height: "270px",
                  borderTopLeftRadius: "6px",
                  borderTopRightRadius: "6px",
                  objectFit: "cover",
                }}
                className="pb-3"
              />
            </Link>
            <div className="ml-7">
              <div className="flex">
                <Avatar
                  alt={article.fields.authorImage.fields.file.fileName}
                  src={article.fields.authorImage.fields.file.url}
                  style={{ zIndex: "0" }}
                />
                <div>
                  <p className="text-sm font-medium	font-sans pl-2 text-gray-700">
                    {article.fields.authorName}
                  </p>
                  <p className="text-xs pl-2 text-gray-600">{`${
                    date(article.fields.dateTime)[0]
                  } ${date(article.fields.dateTime)[1]} ${
                    date(article.fields.dateTime)[2]
                  }
                  `}</p>
                </div>
              </div>
              <div className="ml-12 mt-5">
                <Link
                  href={`/${article.fields.authorName.replaceAll(" ", "-")}/${
                    article.fields.slug
                  }`}
                  className="text-gray-900 text-2xl font-bold font-sans text-start hover:text-blue-800"
                  onClick={() => {
                    if (
                      `/${article.fields.authorName}/${article.fields.blogTitle}` !==
                      router.asPath.replaceAll("-", " ")
                    ) {
                      blogContext[0](true);
                      blogContext[1](true);
                      setAutoORHidden("hidden");
                    }
                  }}
                >
                  {article.fields.blogTitle}
                </Link>
              </div>
            </div>
            <div className="flex justify-around max-md:mt-5 mt-9">
              <p className=" mt-3 pr-5 text-gray-600 text-[12px]">
                4 mins read
              </p>
              <button
                ref={blogContext[7]}
                className="active:text-red-900"
                onClick={(e) => {
                  // @ts-ignore
                  // @ts-ignore

                  if (e.target.parentElement.style.fill === "") {
                    if (blogContext[2].length === 0) {
                      blogContext[4]([article]);
                      blogContext[6](true);
                    } else {
                      for (
                        let index = 0;
                        index < blogContext[2].length;
                        index++
                      ) {
                        if (!blogContext[2].includes(article)) {
                          blogContext[4]([...blogContext[2], article]);
                          blogContext[6](true);
                        }
                      }
                    }
                    // @ts-ignore
                    e.target.parentElement.style.fill = "red";
                  } else {
                    const removeFromFavourites = blogContext[2].filter(
                      (blog) => {
                        return blog.sys.id !== article.sys.id;
                      }
                    );
                    blogContext[4](removeFromFavourites);
                    // @ts-ignore
                    e.target.parentElement.style.fill = "";
                    blogContext[6](false);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 svg"
                  data-blogID={article.sys.id}
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default BlogArticles;
