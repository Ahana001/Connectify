const { createSlice } = require("@reduxjs/toolkit");

const displaySlice = createSlice({
  name: "display",
  initialState: {
    toggleModel: false,
    editBoxVisibility: {
      postId: null,
      visibility: false,
    },
    isEditProfileBoxVisible: false,
    logoutToggle: false,
  },
  reducers: {
    setToggleModel(state, action) {
      return { ...state, toggleModel: action.payload };
    },
    setEditBoxVisibility(state, action) {
      return { ...state, editBoxVisibility: action.payload };
    },
    setLogoutToggle(state, action) {
      return { ...state, logoutToggle: action.payload };
    },
    setIsEditProfileBoxVisibility(state, action) {
      return { ...state, isEditProfileBoxVisible: action.payload };
    },
  },
});

export const {
  setToggleModel,
  setEditBoxVisibility,
  setLogoutToggle,
  setIsEditProfileBoxVisibility,
} = displaySlice.actions;
export const displayReducer = displaySlice.reducer;
