import { defineStore } from "pinia";
import { login } from "@/helpers/api/user.js";
import { changeUsername, changeEmail } from "@/helpers/api/account.js";

export const useUserStore = defineStore("user", {
	state: () => ({
		session: {
			logged_in: false,
			session_expires_at: 0,
		},
		user_data: Object.create(null),
	}),
	getters: {
		isLoggedIn: (state) =>
			state.session.logged_in &&
			state.session.session_expires_at - Date.now() > 0,
	},
	actions: {
		async login(email, password) {
			const response = await login(email, password);
			this.session.logged_in = true;
			this.session.session_expires_at =
				Date.now() + response.data.user.session_expires_in * 1000;
			this.user_data = response.data.user.data;
		},
		logout() {
			this.session.logged_in = false;
			this.session.session_expires_at = 0;
			this.user_data = Object.create(null);
		},
		async changeEmail(email) {
			try {
				const response = await changeEmail(email);
				this.user_data.email = email;
				return response.message;
			} catch (error) {
				console.log(error);
				throw error.message;
			}
		},
		async changeUsername(username) {
			try {
				const response = await changeUsername(username);
				this.user_data.username = username;
				return response.message;
			} catch (error) {
				console.log(error);
				throw error.message;
			}
		}
	},
	persist: true,
});
