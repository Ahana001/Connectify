import axios from "axios";
import { uploadImage } from "./uploadImageToCloudinary";
export async function getAllPostRequest() {
  return await axios.get("/api/posts");
}

export async function addPostRequest(postData, token) {
  if (postData.picture) {
    let data = {
      content: postData.content,
    };
    const uploadImageData = await uploadImage(postData.picture);
    data.picture_url = uploadImageData.secure_url;
    return await axios.post(`/api/posts`, data, {
      headers: {
        authorization: token,
      },
    });
  } else {
    const data = {
      content: postData.content,
    };
    return await axios.post(`/api/posts`, data, {
      headers: {
        authorization: token,
      },
    });
  }
}
export async function deletePostRequest(postId, token) {
  return await axios.delete(`/api/posts/${postId}`, {
    headers: {
      authorization: token,
    },
  });
}

export async function editPostRequest(postData, token) {
  if (postData.picture) {
    let data = {
      content: postData.content,
    };
    const uploadImageData = await uploadImage(postData.picture);
    data.picture_url = uploadImageData.secure_url;
    return await axios.post(`/api/posts/edit/${postData.id}`, data, {
      headers: {
        authorization: token,
      },
    });
  } else {
    const data = {
      content: postData.content,
      picture_url: null,
    };
    return await axios.post(`/api/posts/edit/${postData.id}`, data, {
      headers: {
        authorization: token,
      },
    });
  }
}
export async function likePostRequest(postId, token) {
  return await axios.post(
    `/api/posts/like/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
}
export async function dislikePostRequest(postId, token) {
  return await axios.post(
    `/api/posts/dislike/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
}
export async function bookmarkPostRequest(postId, token) {
  return await axios.post(
    `/api/posts/bookmark/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
}
export async function unBookmarkPostRequest(postId, token) {
  return await axios.post(
    `/api/posts/remove-bookmark/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
}
