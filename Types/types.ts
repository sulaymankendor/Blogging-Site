export type Blog = {
  sys: { id: string };
  fields: {
    blogImage: { fields: { file: { url: string; fileName: string } } };
    blogTitle: string;
    authorImage: { fields: { file: { url: string; fileName: string } } };
    authorName: string;
    content: any;
    dateTime: string;
  };
};

export type Paths = {
  params: { author: string; post: string };
};
