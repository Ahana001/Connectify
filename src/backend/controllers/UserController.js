import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to user are present here.
 * */

/**
 * This handler handles gets all users in the db.
 * send GET Request at /api/users
 * */

export const getAllUsersHandler = function () {
  return new Response(200, {}, { users: this.db.users });
};

/**
 * This handler handles updating user details.
 * send POST Request at /api/users/edit
 * body contains { userData }
 * */

export const editUserHandler = function (schema, request) {
  let user = requiresAuth.call(this, request);
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
    const { userData } = JSON.parse(request.requestBody);
    if (userData && userData.username && userData.username !== user.username) {
      return new Response(
        404,
        {},
        {
          errors: ["Username cannot be changed"],
        }
      );
    }

    user = { ...user, ...userData, updatedAt: formatDate() };
    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { user });
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
 * This handler handles adding a post to user's bookmarks in the db.
 * send POST Request at /api/users/bookmark/:postId/
 * */

export const bookmarkPostHandler = function (schema, request) {
  const { postId } = request.params;
  const post = schema.posts.findBy({ id: postId }).attrs;
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
    const isBookmarked = post.bookmark_by.some(
      (currUser) => currUser.id === user.id
    );
    if (isBookmarked) {
      return new Response(
        400,
        {},
        { errors: ["This Post is already bookmarked"] }
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
    post.bookmark_by.push({
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
    return new Response(200, {}, { posts: this.db.posts });
  } catch (error) {
    console.error(error);
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
 * This handler handles adding a post to user's bookmarks in the db.
 * send POST Request at /api/users/remove-bookmark/:postId/
 * */

export const removePostFromBookmarkHandler = function (schema, request) {
  const { postId } = request.params;
  let post = schema.posts.findBy({ id: postId }).attrs;
  let user = requiresAuth.call(this, request);
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
    const isBookmarked = post.bookmark_by.some(
      (currUser) => currUser.id === user.id
    );
    if (!isBookmarked) {
      return new Response(400, {}, { errors: ["Post not bookmarked yet"] });
    }
    const filteredBookmarks = post.bookmark_by.filter(
      (currUser) => currUser.id !== user.id
    );
    post = { ...post, bookmark_by: filteredBookmarks };
    this.db.posts.update({ id: postId }, { ...post, updatedAt: formatDate() });
    return new Response(200, {}, { posts: this.db.posts });
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
 * This handler handles follow action.
 * send POST Request at /api/users/follow/:followUserId/
 * */

export const followUserHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  const { followUserId } = request.params;
  const followUser = schema.users.findBy({ _id: followUserId }).attrs;
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

    if (user._id === followUser._id) {
      return new Response(
        404,
        {},
        {
          errors: ["You cannot follow yourself"],
        }
      );
    }

    const isFollowing = user.following.some(
      (currUser) => currUser._id === followUser._id
    );

    if (isFollowing) {
      return new Response(400, {}, { errors: ["User Already following"] });
    }

    const updatedUser = {
      ...user,
      following: [...user.following, { ...followUser }],
    };
    const updatedFollowUser = {
      ...followUser,
      followers: [...followUser.followers, { ...user }],
    };
    this.db.users.update(
      { _id: user._id },
      { ...updatedUser, updatedAt: formatDate() }
    );
    this.db.users.update(
      { _id: followUser._id },
      { ...updatedFollowUser, updatedAt: formatDate() }
    );
    return new Response(
      200,
      {},
      { user: updatedUser, followUser: updatedFollowUser }
    );
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
 * This handler handles unfollow action.
 * send POST Request at /api/users/unfollow/:followUserId/
 * */

export const unfollowUserHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  const { followUserId } = request.params;
  const followUser = this.db.users.findBy({ _id: followUserId });
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
    const isFollowing = user.following.some(
      (currUser) => currUser._id === followUser._id
    );

    if (!isFollowing) {
      return new Response(400, {}, { errors: ["User already not following"] });
    }

    const updatedUser = {
      ...user,
      following: user.following.filter(
        (currUser) => currUser._id !== followUser._id
      ),
    };
    const updatedFollowUser = {
      ...followUser,
      followers: followUser.followers.filter(
        (currUser) => currUser._id !== user._id
      ),
    };
    this.db.users.update(
      { _id: user._id },
      { ...updatedUser, updatedAt: formatDate() }
    );
    this.db.users.update(
      { _id: followUser._id },
      { ...updatedFollowUser, updatedAt: formatDate() }
    );
    return new Response(
      200,
      {},
      { user: updatedUser, followUser: updatedFollowUser }
    );
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
 * This handler handles gets all users in the db.
 * send GET Request at /api/users/suggestionList
 * */

export const getSuggestionListUsersHandler = function (schema, request) {
  let user = requiresAuth.call(this, request);
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

    let suggestionList = this.db.users.filter((allUser) => {
      return user.following.find(
        (followingUser) => followingUser.id === allUser.id
      )
        ? false
        : true;
    });
    suggestionList = suggestionList.filter(
      (suggestionUser) => suggestionUser.id !== user.id
    );
    return new Response(200, {}, { users: suggestionList });
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
 * This handler handles gets all users in the db.
 * send GET Request at /api/users/suggestionList
 * */

export const getUserHandler = function (schema, request) {
  let user = requiresAuth.call(this, request);
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
    return new Response(200, {}, { user: user });
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
