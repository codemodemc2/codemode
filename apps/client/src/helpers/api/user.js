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
		const response = await axios.post("/register-admin", { data, email, password });
		return response;
	} catch (error) {
		throw error.response.data.message;
	}
};

export const registerUser = async (data, email, password) => {
	try {
		const response = await axios.post("/register-user", { data, email, password });
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
