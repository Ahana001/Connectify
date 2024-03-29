import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

/**
 * All the routes related to post are present here.
 * */

/**
 * This handler handles gets all posts in the db.
 * send GET Request at /api/posts
 * */

export const getAllpostsHandler = function () {
  return new Response(200, {}, { posts: this.db.posts });
};

/**
 * This handler gets post by postId in the db.
 * send GET Request at /api/posts/:postId
 * */

export const getPostHandler = function (schema, request) {
  const postId = request.params.postId;
  try {
    const post = schema.posts.findBy({ _id: postId }).attrs;
    return new Response(200, {}, { post });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler gets posts of a user in the db.
 * send GET Request at /api/posts/user/:username
 * */

export const getAllUserPostsHandler = function (schema, request) {
  const { username } = request.params;
  try {
    const posts = schema.posts.where({ username })?.models;
    return new Response(200, {}, { posts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles creating a post in the db.
 * send POST Request at /api/user/posts/
 * body contains {content}
 * */

export const createPostHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const postData = JSON.parse(request.requestBody);
    const totalPost = this.db.posts.length;
    const post = {
      _id: uuid(),
      id: `POST${totalPost + 100}`,
      ...postData,
      like_count: 0,
      liked_by: [],
      bookmark_by: [],
      author_username: user.username,
      createdAt: formatDate(),
      updatedAt: formatDate(),
    };
    this.db.posts.insert(post);
    return new Response(201, {}, { posts: this.db.posts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles updating a post in the db.
 * send POST Request at /api/posts/edit/:postId
 * body contains { postData }
 * */
export const editPostHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const postId = request.params.postId;
    const postData = JSON.parse(request.requestBody);
    let post = schema.posts.findBy({ id: postId }).attrs;
    if (post.author_username !== user.username) {
      return new Response(
        400,
        {},
        {
          errors: ["Cannot edit a Post doesn't belong to the logged in User."],
        }
      );
    }
    post = { ...post, ...postData };
    this.db.posts.update({ id: postId }, post);
    return new Response(201, {}, { posts: this.db.posts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles liking a post in the db.
 * send POST Request at /api/posts/like/:postId
 * */

export const likePostHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const {
      _id,
      id,
      firstName,
      lastName,
      username,
      createdAt,
      updatedAt,
      followers,
      following,
    } = user;
    const postId = request.params.postId;
    const post = schema.posts.findBy({ id: postId }).attrs;
    if (post.liked_by.some((currUser) => currUser.id === user.id)) {
      return new Response(
        400,
        {},
        { errors: ["Cannot like a post that is already liked. "] }
      );
    }
    post.like_count += 1;
    post.liked_by.push({
      _id,
      id,
      firstName,
      lastName,
      username,
      createdAt,
      updatedAt,
      followers,
      following,
    });
    this.db.posts.update({ id: postId }, { ...post, updatedAt: formatDate() });
    return new Response(201, {}, { posts: this.db.posts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles disliking a post in the db.
 * send POST Request at /api/posts/dislike/:postId
 * */

export const dislikePostHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const postId = request.params.postId;
    let post = schema.posts.findBy({ id: postId }).attrs;
    if (post.like_count === 0) {
      return new Response(
        400,
        {},
        { errors: ["Cannot decrement like less than 0."] }
      );
    }
    if (!post.liked_by.some((currUser) => currUser.id === user.id)) {
      return new Response(
        400,
        {},
        { errors: ["Cannot dislike a post that is not liked. "] }
      );
    }
    post.like_count -= 1;
    const updatedLikedBy = post.liked_by.filter(
      (currUser) => currUser.id !== user.id
    );
    post = { ...post, liked_by: updatedLikedBy };
    this.db.posts.update({ id: postId }, { ...post, updatedAt: formatDate() });
    return new Response(201, {}, { posts: this.db.posts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles deleting a post in the db.
 * send DELETE Request at /api/user/posts/:postId
 * */
export const deletePostHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const postId = request.params.postId;
    let post = schema.posts.findBy({ id: postId }).attrs;
    if (post.author_username !== user.username) {
      return new Response(
        400,
        {},
        {
          errors: [
            "Cannot delete a Post doesn't belong to the logged in User.",
          ],
        }
      );
    }
    this.db.posts.remove({ id: postId });
    return new Response(201, {}, { posts: this.db.posts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
