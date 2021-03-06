import axios from 'axios';


export const changePassword = async (data) => {
	try {
		const response = await axios.post('/account/change-password', data);
		return response.data.message;
	} catch (error) {
		console.log(error);
	}
};


export const changeEmail = async (email) => {
	try {
		const response = await axios.post('/account/change-email', { newEmail: email });
		return response.data;
	} catch (error) {
		console.log(error);
	}
};


export const changeUsername = async (username) => {
	try {
		const response = await axios.post('/account/change-username', { newUsername: username });
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const changeProfileImage = async (profile_image) => {
	try {
		const response = await axios.post('/account/change-profile-image', { profile_image });
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const changeFirstLastName = async (first_name, last_name) => {
	try {
		const response = await axios.post('/account/change-first-last-name', { first_name, last_name });
		return response.data;
	} catch (error) {
		console.log(error);
	}
};