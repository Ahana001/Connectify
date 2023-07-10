import axios from "axios";

export async function getSuggestionListRequest(token) {
  return await axios.get("/api/users/suggestionList", {
    headers: {
      authorization: token,
    },
  });
}

export async function getUserRequest() {
  return await axios.get("/api/user", {
    headers: {
      authorization: localStorage.getItem("authToken"),
    },
  });
}

export async function getAllUsersRequest(token) {
  return await axios.get("/api/users");
}

export async function editUserRequest(data, token) {
  return await axios.post(`/api/user/edit`, data, {
    headers: {
      authorization: token,
    },
  });
}
