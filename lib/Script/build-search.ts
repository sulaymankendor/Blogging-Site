const contentful = require("contentful");
const richText = require("@contentful/rich-text-react-renderer");
require("dotenv").config();
const algoliasearch = require("algoliasearch/lite");
// const client = require("../../Contentful/fetch_blogs");
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});
async function getAllBlogPosts() {
  // write your code to fetch your data
  const posts = await client.getEntries({ content_type: "blog" });
  return posts.items;
}

function transformPostsToSearchObjects(posts) {
  const transformed = posts.map((post) => {
    return {
      objectID: post.sys.id,
      title: post.fields.blogTitle,
      date: post.fields.dateTime,
      authorName: post.fields.authorName,
      authorImage: post.fields.authorImage.fields.file.url,
      content: richText.documentToReactComponents(post.fields.content),
    };
  });

  return transformed;
}

(async function () {
  try {
    const posts = await getAllBlogPosts();
    const transformed = transformPostsToSearchObjects(posts);

    // initialize the client with your environment variables
    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
      process.env.ALGOLIA_ADMIN_KEY
    );
    console.log(
      process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
      process.env.ALGOLIA_ADMIN_KEY
    );
    // initialize the index with your index name
    const index = client.initIndex("Blog_Site");

    // save the objects!
    const algoliaResponse = await index.saveObjects(transformed);

    // check the output of the response in the console
    console.log(
      `🎉 Sucessfully added ${
        algoliaResponse.objectIDs.length
      } records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join(
        "\n"
      )}`
    );
  } catch (error) {
    console.log(error);
  }
})();
