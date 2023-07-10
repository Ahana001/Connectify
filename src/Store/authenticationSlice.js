import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  UnFollowUserRequest,
  followUserRequest,
  loginRequest,
  signupRequest,
} from "../Services/authenticateServices";
import { CustomizeToast } from "../Utils/CustomizeToast";
import {
  editUserRequest,
  getAllUsersRequest,
  getSuggestionListRequest,
} from "../Services/userService";

const initialState = {
  // getUserError: null,
  // getUserStatus: "idle",
  authToken: localStorage.getItem("authToken") ?? null,
  authUser: JSON.parse(localStorage.getItem("authUser")) ?? {},
  authStatus: "idle",
  authError: null,
  getSuggestionListData: [],
  getSuggestionListStatus: "idle",
  getSuggestionListError: null,
  getAllUsersData: [],
  profileData: {
    id: null,
    image: null,
    bio: "",
    profile_link: "",
  },
};
// export const getUser = createAsyncThunk(
//   "get/getUser",
//   async (undefined, { rejectWithValue }) => {
//     try {
//       const getUserResponse = await getUserRequest();
//       console.log("getUserResponse");
//       console.log(getUserResponse);
//       return getUserResponse.data;
//     } catch (error) {
//       console.error(error.response.data);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
export const getSuggestionList = createAsyncThunk(
  "get/getSuggestionList",
  async ({ token }, { rejectWithValue }) => {
    try {
      const getSuggestionListResponse = await getSuggestionListRequest(token);
      return getSuggestionListResponse.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllUsers = createAsyncThunk(
  "get/getAllUsers",
  // eslint-disable-next-line
  async (undefined, { rejectWithValue }) => {
    try {
      const getAllUsersResponse = await getAllUsersRequest();
      return getAllUsersResponse.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const editUser = createAsyncThunk(
  "authenticate/editUser",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const editUserResponse = await editUserRequest(data, token);
      return editUserResponse.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const loginUser = createAsyncThunk(
  "authenticate/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const loginResponse = await loginRequest(username, password);
      return loginResponse.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const signupUser = createAsyncThunk(
  "authenticate/signupUser",
  async ({ username, password, city }, { rejectWithValue }) => {
    try {
      const loginResponse = await signupRequest(username, password, city);
      return loginResponse.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const followUser = createAsyncThunk(
  "authenticate/followUser",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const followUserResponse = await followUserRequest(userId, token);
      return followUserResponse.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const unfollowUser = createAsyncThunk(
  "authenticate/unfollowUser",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const unfollowUserResponse = await UnFollowUserRequest(userId, token);
      return unfollowUserResponse.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logoutHandler: (state) => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      state.authToken = null;
      state.authUser = {};
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
  },
  extraReducers: {
    // [getUser.pending]: (state) => {
    //   state.getUserStatus = "pending";
    // },
    // [getUser.fulfilled]: (state, action) => {
    //   state.getUserStatus = "fulfilled";
    //   state.authToken = localStorage.getItem("authToken");
    //   state.authUser = localStorage.getItem("authUser");
    // },
    // [getUser.rejected]: (state, action) => {
    //   state.getUserStatus = "error";
    //   state.getUserError = action.payload.errors[0];
    // },
    [getAllUsers.pending]: (state) => {},
    [getAllUsers.fulfilled]: (state, action) => {
      state.getAllUsersData = action.payload.users;
    },
    [getAllUsers.rejected]: (state, action) => {
      CustomizeToast("error", action.payload.errors[0]);
    },
    [editUser.pending]: (state) => {},
    [editUser.fulfilled]: (state, action) => {
      state.authUser = action.payload.user;
      state.getAllUsersData = action.payload.users;
      localStorage.setItem("authUser", JSON.stringify(action.payload.user));
      CustomizeToast("success", "Profile Updated Successfully");
    },
    [editUser.rejected]: (state, action) => {
      CustomizeToast("error", action.payload.errors[0]);
    },
    [loginUser.pending]: (state) => {
      state.authStatus = "pending";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.authStatus = "fulfilled";
      state.authToken = action.payload.encodedToken;
      state.authUser = action.payload.foundUser;
      localStorage.setItem("authToken", action.payload.encodedToken);
      localStorage.setItem(
        "authUser",
        JSON.stringify(action.payload.foundUser)
      );

      CustomizeToast("success", "Login Successfully");
    },
    [loginUser.rejected]: (state, action) => {
      state.authStatus = "error";
      state.authError = action.payload.errors[0];
      CustomizeToast("error", action.payload.errors[0]);
    },
    [signupUser.pending]: (state) => {
      state.authStatus = "pending";
    },
    [signupUser.fulfilled]: (state, action) => {
      state.authStatus = "fulfilled";
      state.authToken = action.payload.encodedToken;
      state.authUser = action.payload.createdUser;
      localStorage.setItem("authToken", action.payload.encodedToken);
      localStorage.setItem(
        "authUser",
        JSON.stringify(action.payload.createdUser)
      );
      CustomizeToast("success", "Sign Up Successfully");
    },
    [signupUser.rejected]: (state, action) => {
      state.authStatus = "error";
      state.authError = action.payload.errors[0];
      CustomizeToast("error", action.payload.errors[0]);
    },
    [getSuggestionList.pending]: (state) => {
      state.getSuggestionListStatus = "pending";
    },
    [getSuggestionList.fulfilled]: (state, action) => {
      state.getSuggestionListStatus = "fulfilled";
      state.getSuggestionListData = action.payload.users.map((user) => ({
        ...user,
        followUserStatus: "idle",
      }));
    },
    [getSuggestionList.rejected]: (state, action) => {
      state.getSuggestionListStatus = "error";
      state.getSuggestionListError = action.payload.errors[0];
    },
    [followUser.pending]: (state, action) => {
      const { userId } = action.meta.arg;
      state.getSuggestionListData = state.getSuggestionListData.map((user) =>
        user.id === userId ? { ...user, followUserStatus: "pending" } : user
      );
      state.getAllUsersData = state.getAllUsersData.map((user) =>
        user.id === userId ? { ...user, followUserStatus: "pending" } : user
      );
    },
    [followUser.fulfilled]: (state, action) => {
      const authUser = JSON.parse(localStorage.getItem("authUser"));
      const { userId } = action.meta.arg;

      state.getSuggestionListData = state.getSuggestionListData.map((user) =>
        user.id === userId
          ? {
              ...user,
              followUserStatus: "idle",
            }
          : user
      );
      state.getAllUsersData = action.payload.users.map((user) => {
        if (user.id === userId) {
          return {
            ...action.payload.followUser,
            followUserStatus: "idle",
          };
        } else if (user.id === authUser.id) {
          return action.payload.user;
        } else {
          return user;
        }
      });
      state.authUser = action.payload.users.find(
        (user) => user.id === authUser.id
      );
      CustomizeToast("success", `Followed Successfully`);
    },
    [followUser.rejected]: (state, action) => {
      state.getSuggestionListData = state.getSuggestionListData.map((user) => ({
        ...user,
        followUserStatus: "idle",
      }));
      state.getAllUsersData = state.getAllUsersData.map((user) => ({
        ...user,
        followUserStatus: "idle",
      }));
      CustomizeToast("error", action.payload.errors[0].message);
    },
    [unfollowUser.pending]: (state, action) => {
      const { userId } = action.meta.arg;
      state.getAllUsersData = state.getAllUsersData.map((user) =>
        user.id === userId ? { ...user, followUserStatus: "pending" } : user
      );
    },
    [unfollowUser.fulfilled]: (state, action) => {
      const authUser = JSON.parse(localStorage.getItem("authUser"));
      const { userId } = action.meta.arg;
      state.getAllUsersData = action.payload.users.map((user) =>
        user.id === userId
          ? {
              ...user,
              followUserStatus: "idle",
            }
          : user
      );
      state.authUser = action.payload.users.find(
        (user) => user.id === authUser.id
      );
      CustomizeToast("success", `UnFollowed Successfully`);
    },
    [unfollowUser.rejected]: (state, action) => {
      state.getAllUsersData = state.getAllUsersData.map((user) => ({
        ...user,
        followUserStatus: "idle",
      }));
      CustomizeToast("error", action.payload.errors[0].message);
    },
  },
});

export const { logoutHandler, setProfileData } = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
