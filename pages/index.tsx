import Head from "next/head";
import { client } from "@/Contentful/fetch_blogs";

import BlogArticles from "@/components/Home/blogs/BlogArticles";
import MainNavs from "@/components/Home/navs/MainNavs";
import BlogArticles2 from "@/components/Home/blogs/BlogArticles2";
import { useRouter } from "next/router";

export async function getStaticProps() {
  const response = await client.getEntries({ content_type: "blog" });
  const secondResponse = await client.getEntries({ content_type: "blog2" });
  return {
    props: { data: [response.items, secondResponse.items], revalidate: 60 },
  };
}

export default function Home({ data }) {
  // console.log(path.query);

  return (
    <>
      <Head>
        <title>DEV Community</title>
      </Head>
      <section className="flex justify-around">
        <section className="w-[238px]">
          <div className="w-60 bg-white h-60 p-3 border border-gray-200 border-solid rounded-md mb-4">
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
        <BlogArticles blogArcticles={data[0]} />
        <BlogArticles2 secondArticles={data[1]} width="w-80" />
      </section>
    </>
  );
}
