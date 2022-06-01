import axios from "axios";

export const getAdmins = async (page, perPage) => {
	try {
		const response = await axios.get('/admin/admins', { params: { page, perPage } });
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getEmployees = async (page, perPage) => {
	try {
		const response = await axios.get('/admin/employees', { params: { page, perPage } });
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getInviteLinks = async (page, perPage) => {
	try {
		const response = await axios.get('/admin/invite-links', { params: { page, perPage } });
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getUser = async (id) => {
	try {
		const response = await axios.get('/admin/user', { params: { id } });
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};


export const generateInviteLink = async (data) => {
	try {
		const response = await axios.post('/admin/generate-invite-link', { data });
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
