import Link from "next/link";

import { Blog } from "@/Types/types";

function BlogArticles2({ secondArticles, width }) {
  const blogs: Blog[] = secondArticles;
  return (
    <section
      className={`bg-white border border-gray-200 border-solid rounded-md border-b-0 ${width} h-[680px]`}
    >
      {blogs.map((article) => {
        return (
          <Link
            href={`/${article.fields.authorName}/${article.fields.blogTitle}`}
            key={article.sys.id}
            className="hover:text-blue-700"
          >
            <div className="border-b border-gray-200 border-solid p-6">
              <h2 className=" text-gray-500 hover:text-blue-700">
                {article.fields.blogTitle}
              </h2>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

export default BlogArticles2;
