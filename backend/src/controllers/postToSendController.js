import PostToSend from "../models/PostToSend.js";

// GET /api/posts-to-send
export const listAllPostsToSend = async (req, res) => {
  try {
    const posts = await PostToSend.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error listing posts to send:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// POST /api/posts-to-send
export const addPostToSend = async (req, res) => {
  try {
    const {
      postTitle,
      postDescription,
      postBody,
      postImages,
      typeOfPost,
    } = req.body;

    const newPost = await PostToSend.create({
      postTitle,
      postDescription,
      postBody,
      postImages,
      typeOfPost,
    });

    return res.status(201).json(newPost);
  } catch (error) {
    console.error("Error adding post to send:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// PUT /api/posts-to-send/:id
export const editPostToSend = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      postTitle,
      postDescription,
      postBody,
      postImages,
      typeOfPost,
    } = req.body;

    const post = await PostToSend.findByPk(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.postTitle = postTitle ?? post.postTitle;
    post.postDescription = postDescription ?? post.postDescription;
    post.postBody = postBody ?? post.postBody;
    post.postImages = postImages ?? post.postImages;
    post.typeOfPost = typeOfPost ?? post.typeOfPost;

    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    console.error("Error editing post to send:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /api/posts-to-send/:id
export const deletePostToSend = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await PostToSend.findByPk(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await post.destroy();

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post to send:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// POST /api/posts-to-send/:id/send-now
export const sendNowPostToSend = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await PostToSend.findByPk(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Aqui futuramente você chama o Job/Queue (Bull, Agenda, etc.)
    console.log(
      `[JOB-STUB] Would enqueue post ${id} (${post.postTitle}) to be sent now`
    );

    // Pode marcar algo tipo "enqueued" depois, se quiser
    return res
      .status(200)
      .json({ message: "Post send job triggered (stub)", post });
  } catch (error) {
    console.error("Error sending post now:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
