import axios from "axios";

export async function loginRequest(username, password) {
  return await axios.post(`/api/auth/login`, {
    username,
    password,
  });
}
export async function signupRequest(username, password, city) {
  return await axios.post(`/api/auth/signup`, {
    username,
    password,
    city,
  });
}
export async function followUserRequest(userId, token) {
  return await axios.post(
    `/api/users/follow/${userId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
}

export async function UnFollowUserRequest(userId, token) {
  return await axios.post(
    `/api/users/unfollow/${userId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
}
