import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CustomizeToast } from "../Utils/CustomizeToast";
import {
  addPostRequest,
  bookmarkPostRequest,
  deletePostRequest,
  dislikePostRequest,
  editPostRequest,
  getAllPostRequest,
  likePostRequest,
  unBookmarkPostRequest,
} from "../Services/postService";

const initialState = {
  getAllPostData: [],
  getAllPostStatus: "idle",
  postSorting: "latest",
  postStatus: null,
  postData: {
    id: null,
    content: "",
    picture: null,
    displayPicture: null,
  },
};

export const getAllPost = createAsyncThunk(
  "post/getAllPost",
  // eslint-disable-next-line
  async (undefined, { rejectWithValue }) => {
    try {
      const getAllPostResponse = await getAllPostRequest();
      return getAllPostResponse.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const addPost = createAsyncThunk(
  "posts/addPost",
  async ({ postData, token }, { rejectWithValue }) => {
    try {
      delete postData.displayPicture;
      delete postData.id;
      const response = await addPostRequest(postData, token);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ postData, token }, { rejectWithValue }) => {
    try {
      delete postData.displayPicture;
      if (!postData?.picture) {
        delete postData.picture;
      }
      const response = await editPostRequest(postData, token);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const response = await deletePostRequest(postId, token);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const likePost = createAsyncThunk(
  "post/likePost",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const response = await likePostRequest(postId, token);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const dislikePost = createAsyncThunk(
  "post/dislikePost",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const response = await dislikePostRequest(postId, token);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const bookmarkPost = createAsyncThunk(
  "post/bookmarkPost",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const response = await bookmarkPostRequest(postId, token);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const unBookmarkPost = createAsyncThunk(
  "post/unBookmarkPost",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const response = await unBookmarkPostRequest(postId, token);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    changeSorting: (state, action) => {
      state.postSorting = action.payload;
    },
    setPostData: (state, action) => {
      state.postData = action.payload;
    },
  },
  extraReducers: {
    [getAllPost.pending]: (state) => {
      state.getAllPostStatus = "pending";
    },
    [getAllPost.fulfilled]: (state, action) => {
      state.getAllPostStatus = "fulfilled";
      state.getAllPostData = action.payload.posts;
    },
    [getAllPost.rejected]: (state, action) => {
      state.getAllPostStatus = "error";
      CustomizeToast("error", action.payload.errors[0]);
    },
    [addPost.pending]: (state) => {
      state.postStatus = "pending";
    },
    [addPost.fulfilled]: (state, action) => {
      state.postStatus = "fulfilled";
      state.getAllPostData = action.payload.posts.map((post) => {
        return { ...post };
      });
      CustomizeToast("info", "Post Created Successfully");
    },
    [addPost.rejected]: (state, action) => {
      state.postStatus = "error";
      CustomizeToast("error", action.payload.errors[0]);
    },
    [deletePost.pending]: (state) => {
      state.postStatus = "pending";
    },
    [deletePost.fulfilled]: (state, action) => {
      state.postStatus = "fulfilled";
      state.getAllPostData = action.payload.posts;
      CustomizeToast("info", "Post Deleted Successfully");
    },
    [deletePost.rejected]: (state, action) => {
      state.postStatus = "error";
      CustomizeToast("error", action.payload.errors[0]);
    },
    [editPost.pending]: (state) => {
      state.postStatus = "pending";
    },
    [editPost.fulfilled]: (state, action) => {
      state.postStatus = "fulfilled";
      state.getAllPostData = action.payload.posts;
      CustomizeToast("info", "Post Edited Successfully");
    },
    [editPost.rejected]: (state, action) => {
      state.postStatus = "error";
      CustomizeToast("error", action.payload.errors[0]);
    },
    [likePost.pending]: (state, action) => {},
    [likePost.fulfilled]: (state, action) => {
      state.postStatus = "fulfilled";
      state.getAllPostData = action.payload.posts;
      CustomizeToast("info", "Post Liked Successfully");
    },
    [likePost.rejected]: (state, action) => {
      CustomizeToast("error", action.payload.errors[0]);
    },
    [dislikePost.pending]: (state, action) => {},
    [dislikePost.fulfilled]: (state, action) => {
      state.getAllPostData = action.payload.posts;
      CustomizeToast("info", "Post Disliked Successfully");
    },
    [dislikePost.rejected]: (state, action) => {
      CustomizeToast("error", action.payload.errors[0]);
    },
    [bookmarkPost.pending]: (state, action) => {},
    [bookmarkPost.fulfilled]: (state, action) => {
      state.getAllPostData = action.payload.posts;
      CustomizeToast("info", "Post Bookmarked Successfully");
    },
    [bookmarkPost.rejected]: (state, action) => {
      CustomizeToast("error", action.payload.errors[0]);
    },
    [unBookmarkPost.pending]: (state, action) => {},
    [unBookmarkPost.fulfilled]: (state, action) => {
      state.getAllPostData = action.payload.posts;
      CustomizeToast("info", "Post Unbookmarked Successfully");
    },
    [unBookmarkPost.rejected]: (state, action) => {
      CustomizeToast("error", action.payload.errors[0]);
    },
  },
});

export const postReducer = postSlice.reducer;
export const { changeSorting, setPostData } = postSlice.actions;
