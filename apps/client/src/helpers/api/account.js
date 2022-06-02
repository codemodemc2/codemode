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