import axios from "axios";

export async function getSuggestionListRequest(token) {
  return await axios.get("/api/users/suggestionList", {
    headers: {
      authorization: token,
    },
  });
}

export async function getUserRequest() {
  console.log(localStorage.getItem("authToken"));
  return await axios.get("/api/user", {
    headers: {
      authorization: localStorage.getItem("authToken"),
    },
  });
}
