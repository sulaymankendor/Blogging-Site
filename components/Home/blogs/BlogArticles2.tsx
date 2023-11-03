import { useContext, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Blog } from "@/Types/types";
import { BlogContext } from "@/lib/utilities/context";

function BlogArticles2({ secondArticles, width }) {
  const router = useRouter();
  const blogs: Blog[] = secondArticles;
  const blogContext = useContext(BlogContext);
  const [autoORHidden, setAutoORHidden] = useState("auto");
  const useBodyScrollLock = () => {
    useLayoutEffect((): any => {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = autoORHidden;
      return () => (document.body.style.overflow = originalStyle);
    }, [autoORHidden]);
  };
  useBodyScrollLock();
  return (
    <section
      className={`max-md:hidden mr-[8px] mx-auto bg-white border border-gray-200 border-solid rounded-md border-b-0 ${width} `}
    >
      {blogs.map((article) => {
        return (
          <Link
            href={`/${article.fields.authorName.replaceAll(" ", "-")}/${
              article.fields.slug
            }`}
            key={article.sys.id}
            className="hover:text-blue-700 text-gray-500"
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
            <div className="max-md:border-b-0 max-md:border-r border-b max-md:h-[170px] border-gray-200 border-solid p-6">
              <h2>{article.fields.blogTitle}</h2>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

export default BlogArticles2;
