import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post("/login", { email, password });
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const registerAdmin = async (data, email, password) => {
  try {
    const response = await axios.post("/register-admin", {
      data,
      email,
      password,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (data, email, password) => {
  try {
    const response = await axios.post("/register-user", {
      data,
      email,
      password,
    });
    console.log(response);
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const checkExistingUser = async (email) => {
  try {
    const response = await axios.post("/check-user-exists", { email });
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const generateInviteLink = async () => {
  try {
    const response = await axios.get("/invite-link");
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const checkInviteLink = async (id) => {
  try {
    const response = await axios.post("/check-invite", { id });
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getUser = async (id) => {
	try {
		const response = await axios.get('/user', { params: { id } });
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getUserIdeas = async (id) => {
	try {
		const response = await axios.get('/user/ideas', { params: { id } });
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getUserComments = async (id) => {
	try {
		const response = await axios.get('/user/comments', { params: { id } });
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

