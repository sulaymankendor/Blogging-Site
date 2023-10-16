import { client } from "@/Contentful/fetch_blogs";
import { Blog } from "@/Types/types";
import { favouriteBlogs } from "@/lib/utilities/favouriteBlogs";
import Link from "next/link";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import BlogArticles2 from "@/components/Home/blogs/BlogArticles2";

export async function getStaticProps() {
  const blogs2 = await client.getEntries({ content_type: "blog2" });
  return {
    props: { blogs2: blogs2.items },
  };
}

function Favourites(props) {
  const blog: Blog[] = favouriteBlogs;

  return (
    <div className="flex justify-around items-start">
      {favouriteBlogs.length === 0 ? (
        <p className="text-center mt-16">
          No Favourite Blog added,{" "}
          <Link
            href="/"
            className="text-blue-500 underline hover:text-blue-800"
          >
            Click Here
          </Link>{" "}
          to add blogs to favourites.
        </p>
      ) : (
        <section className="">
          <div>
            {blog.map((article) => {
              return (
                <div
                  key={article.sys.id}
                  className="bg-white w-[60vw] mt-2 rounded-md border border-gray-200 border-solid mb-3 "
                >
                  <Image
                    src={"https://" + article.fields.Image.fields.file.url}
                    alt={article.fields.Image.fields.file.fileName}
                    width={1000}
                    height={0}
                    className="w-full h-96 object-cover rounded-t"
                  />
                  <div className="flex ml-14 mt-7">
                    <Avatar
                      alt={article.fields.authorImage.fields.file.fileName}
                      src={article.fields.authorImage.fields.file.url}
                      style={{ zIndex: "0" }}
                    />
                    <p className=" ml-2">{article.fields.authorName}</p>
                  </div>
                  <p className="text-5xl font-extrabold w-[630px] ml-14 mt-10">
                    {article.fields.blogTitle}
                  </p>
                  <p className="ml-14 mt-8 font-sans font-light w-4/5 leading-[35px] text-xl mb-3">
                    {documentToReactComponents(article.fields.content)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}
      <BlogArticles2 secondArticles={props.blogs2} width="w-96" />
    </div>
  );
}

export default Favourites;
