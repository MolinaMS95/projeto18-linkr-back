import urlMetadata from "url-metadata";

export async function collectMetadata(req, res, next) {
  const post = res.locals.post;
  await urlMetadata(post.url).then(
    function (metadata) {
      post.urlTitle = metadata.title;
      post.urlDescription = metadata.description;
      post.urlImage = metadata.image;
    },
    function (error) {
      // failure handler
      console.log(error);
    }
  );
  res.locals.post = post;
  next();
}
