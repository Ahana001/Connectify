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
    isEmojiSelectorVisible: false,
  },
  reducers: {
    setToggleModel(state, action) {
      return { ...state, toggleModel: action.payload };
    },
    setEditBoxVisibility(state, action) {
      return { ...state, editBoxVisibility: action.payload };
    },
    setIsEditProfileBoxVisibility(state, action) {
      return { ...state, isEditProfileBoxVisible: action.payload };
    },
    setIsEmojiSelectorVisible(state, action) {
      return { ...state, isEmojiSelectorVisible: action.payload };
    },
  },
});

export const {
  setToggleModel,
  setEditBoxVisibility,
  setIsEditProfileBoxVisibility,
  setIsEmojiSelectorVisible,
} = displaySlice.actions;
export const displayReducer = displaySlice.reducer;
