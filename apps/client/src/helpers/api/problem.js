import axios from "axios";

export const postProblem = async (data) => {
  try {
    const response = await axios.post("/problem", { data });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProblems = async () => {
  try {
    const response = await axios.get("/problems");
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProblem = async (id) => {
  try {
    const response = await axios.get(`/problem/?id=${id}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTopIdeas = async (id) => {
  try {
    const response = await axios.get(`/top-ideas/?id=${id}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const likeProblem = async (id, state) => {
  try {
    const response = await axios.post(`/like-problem`, { id, state });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
