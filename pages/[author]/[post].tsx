import { client } from "@/Contentful/fetch_blogs";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Avatar } from "@mui/material";
import Head from "next/head";
import Image from "next/image";

import { Blog } from "@/Types/types";
import { Paths } from "@/Types/types";
import { devArticles } from "@/lib/utilities/devArticles";
import BlogArticles2 from "@/components/Home/blogs/BlogArticles2";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getStaticPaths() {
  const blogs = await client.getEntries({ content_type: "blog" });
  const blogs2 = await client.getEntries({ content_type: "blog2" });
  const data: Blog[] = blogs.items;
  const data2: Blog[] = blogs2.items;

  const paths = devArticles(data, data2).map((article: Blog): Paths => {
    return {
      params: {
        author: article.fields.authorName,
        post: article.fields.blogTitle,
      },
    };
  });
  return {
    paths,
    fallback: true,
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
  // const path = useRouter();
  // console.log(path.query);
  // merge blogs and blog2. use useState
  const blog: Blog[] = props.blogs.filter((article): boolean => {
    return (
      article.fields.authorName === props.data.author &&
      article.fields.blogTitle === props.data.post
    );
  });
  const blog2: Blog[] = props.blogs2.filter((article): boolean => {
    return (
      article.fields.authorName === props.data.author &&
      article.fields.blogTitle === props.data.post
    );
  });
  if (blog2[0] !== undefined) {
    blog.push(blog2[0]);
  }
  let displayArticle = blog;
  // console.log(blog);
  return (
    <>
      <Head>
        <title>{props.data.post}</title>
      </Head>
      <section className="flex justify-around">
        <div>
          {displayArticle.map((article) => {
            return (
              <div
                key={article.sys.id}
                className="bg-white w-[60vw] mt-2 rounded-md border border-gray-200 border-solid mb-3 "
              >
                <Image
                  src={"https://" + article.fields.blogImage.fields.file.url}
                  alt={article.fields.blogImage.fields.file.fileName}
                  width={1000}
                  height={0}
                  className="w-full h-96 object-cover rounded-t"
                />
                <div className="flex ml-14 mt-7">
                  <Avatar
                    alt={article.fields.blogImage.fields.file.fileName}
                    src={article.fields.authorImage.fields.file.url}
                    style={{ zIndex: "0" }}
                  />
                  <p className=" ml-2">{article.fields.authorName}</p>
                </div>
                <p className="text-5xl font-extrabold w-[630px] ml-14 mt-10">
                  {article.fields.blogTitle}
                </p>
                <p className="ml-14 mt-8 font-sans font-light w-4/5 leading-[30px] text-xl mb-3">
                  {documentToReactComponents(article.fields.content)}
                </p>
              </div>
            );
          })}
        </div>
        <BlogArticles2 secondArticles={props.blogs2} width="w-96" />
      </section>
    </>
  );
}

export default Post;
