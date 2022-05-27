import axios from "axios";

export const postIdea = async (data) => {
  try {
    const response = await axios.post("/idea", { data });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getIdeas = async () => {
  try {
    const response = await axios.get("/ideas");
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getIdea = async (id) => {
  try {
    const response = await axios.get(`/idea/?id=${id}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const likeIdea = async (id, state) => {
  try {
    const response = await axios.post(`/like-idea`, { id, state });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
