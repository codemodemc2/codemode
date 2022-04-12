import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post("/login", { email, password });
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
};
