
export async function collectHashtags(req, res, next) {
    const post  = req.body;
    const hashtags = findHashtags(post.content)
    res.locals.hashtags = hashtags;
    next();
}

  
function findHashtags(searchText) {
    var regexp = /\B\#\w\w+\b/g
    const result = searchText.match(regexp);
    if (result) {
        return result;
    } else {
        return [];
    }
}
