// @desc Get all Posts
// @route GET /api/posts

let posts = [
    { id: 1, title: "Post one" },
    { id: 2, title: "Post two" },

    { id: 3, title: "Post three" },
];

export const getPosts = (req, res, next) => {
    // get x amount of posts, filtered by query
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json(posts.slice(0, limit));
    }

    // get all posts
    res.status(200).json(posts);
};

// @desc Get single Post
// @route GET /api/post/:d

export const getPost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (post) {
        res.status(200).json(post);
    } else {
        const error = new Error(`A post with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    }
};

// @desc create  single Post
// @route POST /api/post/:d

export const createPost = (req, res, next) => {
    console.log(req.body);
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
    };

    if (!newPost.title) {
        const error = new Error("Please include a title");
        error.status = 400;
        return next(error);
    }

    posts.push(newPost);

    res.status(201).json(posts);
};

// @desc create  update Post
// @route PUT /api/post/:d

export const updatePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        const error = new Error(`A post with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    }

    post.title = req.body.title;
    res.status(200).json(posts);
};

// @desc delete Post
// @route DELETE /api/post/:d
export const deletePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        const error = new Error(`A post with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    }

    posts = posts.filter((post) => post.id !== id);
    res.status(200).json(posts);
};
