import axios from "axios";

export const postComment = async (data) => {
  try {
    const response = await axios.post("/comment", { data });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getComments = async (id) => {
  try {
    const response = await axios.get(`/comments/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getComment = async (id) => {
  try {
    const response = await axios.get(`/comment/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const likeComment = async (id, state) => {
  try {
    const response = await axios.post(`/like-comment`, { id, state });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
