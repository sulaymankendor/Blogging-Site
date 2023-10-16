import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@mui/material";

import { Blog } from "@/Types/types";
import { date } from "@/lib/utilities/date";
import { useRouter } from "next/router";
import Favourite from "@/components/svgs/favourite/Favourite";
import { favouriteBlogs } from "@/lib/utilities/favouriteBlogs";

function BlogArticles({ blogArcticles }) {
  const router = useRouter();
  let data = blogArcticles;
  if (router.query.latest === "") {
    data = blogArcticles.slice(0, 3);
  }

  return (
    <section>
      {data.map((article: Blog) => {
        return (
          <div
            key={article.sys.id}
            className="bg-white mt-2 rounded-md border border-gray-200 border-solid pb-9 w-[630px]"
          >
            <Link
              href={`/${article.fields.authorName}/${article.fields.blogTitle}`}
            >
              <Image
                src={"https://" + article.fields.Image.fields.file.url}
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
                  href={`/${article.fields.authorName}/${article.fields.blogTitle}`}
                  className="text-gray-900 text-2xl font-bold font-sans text-start hover:text-blue-800"
                >
                  {article.fields.blogTitle}
                </Link>
              </div>
            </div>
            <div className="flex justify-around">
              <p className=" mt-3 pr-5 text-gray-600 text-[12px]">
                4 mins read
              </p>
              <button
                className="bg-yellow-400"
                style={{ backgroundClip: "border-box" }}
                onClick={() => {
                  if (favouriteBlogs.length === 0) {
                    favouriteBlogs.push(article);
                  } else {
                    for (
                      let index = 0;
                      index < favouriteBlogs.length;
                      index++
                    ) {
                      if (article.sys.id !== favouriteBlogs[index].sys.id) {
                        favouriteBlogs.push(article);
                      }
                    }
                  }
                }}
              >
                <Favourite />
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default BlogArticles;
