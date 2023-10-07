import { Blog } from "@/Types/types";

export function devArticles(data: Blog[], data2: Blog[]): Blog[] {
  const articles: Blog[] = [];
  for (const index in data) {
    articles.push(data[index]);
  }
  for (const index in data2) {
    articles.push(data2[index]);
  }
  return articles;
}
