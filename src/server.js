import { Server, Model, RestSerializer } from "miragejs";
import { posts } from "./backend/db/posts";
import { users } from "./backend/db/users";
import {
  loginHandler,
  signupHandler,
} from "./backend/controllers/AuthController";
import {
  createPostHandler,
  getAllpostsHandler,
  getPostHandler,
  deletePostHandler,
  editPostHandler,
  likePostHandler,
  dislikePostHandler,
  getAllUserPostsHandler,
} from "./backend/controllers/PostController";
import {
  followUserHandler,
  getAllUsersHandler,
  bookmarkPostHandler,
  removePostFromBookmarkHandler,
  unfollowUserHandler,
  editUserHandler,
  getSuggestionListUsersHandler,
  getUserHandler,
} from "./backend/controllers/UserController";

export function makeServer({ environment = "development" } = {}) {
  return new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    // TODO: Use Relationships to have named relational Data
    models: {
      post: Model,
      user: Model,
    },

    // Runs on the start of the server
    seeds(server) {
      server.logging = false;
      users.forEach((item) =>
        server.create("user", {
          ...item,
          followers: [],
          following: [],
        })
      );
      posts.forEach((item) =>
        server.create("post", {
          ...item,
          like_count: 0,
          liked_by: [],
          bookmark_by: [],
        })
      );
    },

    routes() {
      this.namespace = "api";
      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      // post routes (public)
      this.get("/posts", getAllpostsHandler.bind(this));
      this.get("/posts/:postId", getPostHandler.bind(this));
      this.get("/posts/user/:username", getAllUserPostsHandler.bind(this));

      // post routes (private)
      this.post("/posts", createPostHandler.bind(this));
      this.delete("/posts/:postId", deletePostHandler.bind(this));
      this.post("/posts/edit/:postId", editPostHandler.bind(this));
      this.post("/posts/like/:postId", likePostHandler.bind(this));
      this.post("/posts/dislike/:postId", dislikePostHandler.bind(this));
      this.post("/posts/bookmark/:postId/", bookmarkPostHandler.bind(this));
      this.post(
        "/posts/remove-bookmark/:postId/",
        removePostFromBookmarkHandler.bind(this)
      );

      // user routes (private)
      this.get("/user", getUserHandler.bind(this));
      this.post("/users/edit", editUserHandler.bind(this));
      this.get(
        "/users/suggestionList",
        getSuggestionListUsersHandler.bind(this)
      );
      this.post("/users/follow/:followUserId/", followUserHandler.bind(this));
      this.post(
        "/users/unfollow/:followUserId/",
        unfollowUserHandler.bind(this)
      );
      this.passthrough(
        "https://api.cloudinary.com/v1_1/dcu6sympq/image/upload"
      );
    },
  });
}
