import { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import Link from "next/link";
import { Oval } from "react-loader-spinner";
import Head from "next/head";

import { client } from "@/Contentful/fetch_blogs";
import BlogArticles2 from "@/components/Home/blogs/BlogArticles2";
import { BlogContext } from "@/lib/utilities/context";
import { date } from "@/lib/utilities/date";

export async function getStaticProps() {
  const blogs2 = await client.getEntries({ content_type: "blog2" });
  return {
    props: { blogs2: blogs2.items },
  };
}

function Favourites(props) {
  const blogContext = useContext(BlogContext);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Favourite Blogs</title>
      </Head>
      {loading && (
        <div className="fixed top-[45vh] left-[47vw] z-50">
          <Oval secondaryColor="azure" />
        </div>
      )}
      <div className="flex justify-around items-start max-md:flex-col-reverse">
        {blogContext[2].length === 0 ? (
          <p className="max-w-[100%] mx-auto mt-16">
            No Favourite Blog added, Click{" "}
            <span className="font-bold">Home</span> to add blogs to favourites.
          </p>
        ) : (
          <section className=" max-md:w-[100%]">
            <div className="flex flex-wrap w-[73vw] max-md:w-[100vw]">
              {blogContext[2].map((article) => {
                return (
                  <div
                    key={article.sys.id}
                    className="max-lg:w-[80vw] max-md:mx-[6px] max-md:w-[48vw] max-sm:w-[100vw] ml-1 mr-[4px] bg-white w-[35vw] mt-2 rounded-md border border-gray-200 border-solid mb-[-5px]"
                  >
                    <Link
                      href={`/${article.fields.authorName}/${article.fields.blogTitle}`}
                      onClick={() => {
                        setLoading(true);
                      }}
                    >
                      <Image
                        src={"https:" + article.fields.Image.fields.file.url}
                        alt={article.fields.Image.fields.file.fileName}
                        width={1000}
                        height={0}
                        className="h-[200px] object-cover rounded-t "
                      />
                    </Link>
                    <div className="flex items-center justify-between mt-[-20px] ">
                      <div className="flex ml-4 mt-7 items-center">
                        <Avatar
                          alt={article.fields.authorImage.fields.file.fileName}
                          src={article.fields.authorImage.fields.file.url}
                          style={{ zIndex: "0" }}
                        />
                        <p className="text-sm ml-2">
                          {article.fields.authorName}
                        </p>
                      </div>
                      <p className="text-xs text-gray-600 mr-[20px] mt-7">{`${
                        date(article.fields.dateTime)[0]
                      } ${date(article.fields.dateTime)[1]} ${
                        date(article.fields.dateTime)[2]
                      }
                    `}</p>
                    </div>
                    <Link
                      href={`/${article.fields.authorName}/${article.fields.blogTitle}`}
                      onClick={() => {
                        setLoading(true);
                      }}
                    >
                      <p className="hover:text-blue-800 mb-[15px] text-[19px] font-extrabold w-[90%] ml-4 text-start mt-5 text-gray-800">
                        {article.fields.blogTitle}
                      </p>
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        )}
        <BlogArticles2 secondArticles={props.blogs2} width="w-[300px]" />
      </div>
      {loading && (
        <div className="bg-black fixed top-[56px] right-[-35vw] left-[-21vw] bottom-[-178vh] opacity-20 z-[5]"></div>
      )}
    </>
  );
}

export default Favourites;
