import axios from "axios";

export const postProblem = async (data) => {
	try {
		const response = await axios.post("/problem", { data });
		console.log(response);
		return response;
	} catch (error) {
		throw error.response.data.message;
	}
};

export const getProblems = async () => {
	try {
		const response = await axios.get("/problems");
		console.log(response);
		return response;
	} catch (error) {
		throw error.response.data.message;
	}
};
