import axios from "axios";
import router from "@/router";
import { useUserStore } from '@/stores/user.js';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (error.response.status == 401 && router.currentRoute.path != "/login") {
			const userStore = useUserStore();
			userStore.logout();
			router.push({ name: "login" });
		}
		console.log(error);
		return Promise.reject(error);
	}
);
