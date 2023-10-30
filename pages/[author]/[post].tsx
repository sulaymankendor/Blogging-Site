import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import { client } from "@/Contentful/fetch_blogs";
import Head from "next/head";
import { Oval } from "react-loader-spinner";

import { Blog } from "@/Types/types";
import { Paths } from "@/Types/types";
import { devArticles } from "@/lib/utilities/devArticles";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import BlogArticles2 from "@/components/Home/blogs/BlogArticles2";
import { date } from "@/lib/utilities/date";

export async function getStaticPaths() {
  const blogs = await client.getEntries({ content_type: "blog" });
  const blogs2 = await client.getEntries({ content_type: "blog2" });
  const data: Blog[] = blogs.items;
  const data2: Blog[] = blogs2.items;
  const paths = devArticles(data, data2).map((article: Blog): Paths => {
    return {
      params: {
        author: article.fields.authorName.replaceAll(" ", "-"),
        post: article.fields.slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(props: Paths) {
  const blogs = await client.getEntries({ content_type: "blog" });
  const blogs2 = await client.getEntries({ content_type: "blog2" });
  return {
    props: { data: props.params, blogs: blogs.items, blogs2: blogs2.items },
  };
}
function Post(props: {
  data: { author: string; post: string };
  blogs: Blog[];
  blogs2: Blog[];
}) {
  const route = useRouter();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const blog1: Blog[] = props.blogs.filter((article): boolean => {
      return (
        article.fields.authorName === props.data.author.replaceAll("-", " ") &&
        article.fields.slug === props.data.post
      );
    });
    const blog2: Blog[] = props.blogs2.filter((article): boolean => {
      return (
        article.fields.authorName === props.data.author.replaceAll("-", " ") &&
        article.fields.slug === props.data.post
      );
    });
    if (blog2[0] !== undefined) {
      blog1.push(blog2[0]);
    }
    setBlog(blog1[0]);
  }, [route.asPath]);

  const [lockScroll, setLockScroll] = useState("auto");
  const useBodyScrollLock = () => {
    useLayoutEffect((): any => {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = lockScroll;
      return () => (document.body.style.overflow = originalStyle);
    }, [route.asPath]);
  };
  useEffect(() => {
    setLockScroll("auto");
  }, []);
  console.log(blog);
  useBodyScrollLock();

  return (
    <>
      <Head>
        <title>{props.data.post}</title>
      </Head>
      <section className="flex justify-around items-start max-md:flex-col-reverse ">
        <div>
          {blog ? (
            <div
              key={blog.sys.id}
              className="bg-white max-md:w-[100vw] w-[60vw] mt-2 rounded-md border border-gray-200 border-solid mb-3 max-md:ml-0 ml-1"
            >
              <Image
                src={"https://" + blog.fields.Image.fields.file.url}
                alt={blog.fields.Image.fields.file.fileName}
                width={1000}
                height={0}
                className="w-full h-96 object-cover rounded-t"
              />
              <div className="flex items-center justify-between">
                <div className="flex ml-14 mt-7 items-center">
                  <Avatar
                    alt={blog.fields.authorImage.fields.file.fileName}
                    src={blog.fields.authorImage.fields.file.url}
                    style={{ zIndex: "0" }}
                  />
                  <p className=" ml-2">{blog.fields.authorName}</p>
                </div>
                <p className="text-xs pl-2 text-gray-600 mr-[30px] mt-9">{`${
                  date(blog.fields.dateTime)[0]
                } ${date(blog.fields.dateTime)[1]} ${
                  date(blog.fields.dateTime)[2]
                }
                  `}</p>
              </div>
              <p className="max-[900px]:text-[38px] max-md:text-[40px] max-md:mx-[30px] max-md:w-[87%] text-[39px] font-extrabold w-[85%] ml-14 mt-10">
                {blog.fields.blogTitle}
              </p>
              <p className="max-md:w-[85%] max-md:mx-[30px] ml-14 mt-8 font-sans font-light w-4/5 leading-[35px] text-xl mb-3">
                {documentToReactComponents(blog.fields.content)}
              </p>
            </div>
          ) : (
            <div className="fixed top-[45vh] left-[35vw] z-50">
              <Oval secondaryColor="azure" />
            </div>
          )}
        </div>
        <BlogArticles2 secondArticles={props.blogs2} width="w-96" />
      </section>
    </>
  );
}

export default Post;
