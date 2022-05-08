import { defineStore } from "pinia";
import { useUserStore } from './user.js';
import { registerAdmin } from "@/helpers/api/user.js";

let userStore = useUserStore();

export const useAdminOnboardingStore = defineStore("admin_onboarding", {
	state: () => ({
		currentStep: 1,
		registered: false,
		steps: {
			1: {
				finished: false,
				data: {
					username: "",
					email: ""
				}
			},
			2: {
				finished: false,
				data: {
					password: "",
					repeatPassword: ""
				}
			},
			3: {
				finished: false,
				data: {
					companyName: "",

				}

			},
			4: {
				finished: false,
				data: {
					inviteLink: "",
					inviteLinkId: "",
				}
			},
		}
	}),
	actions: {
		async register() {
			try {
				let response = await registerAdmin(this.$state, this.steps[1].data.email, this.steps[2].data.password);
				userStore.session.logged_in = true;
				userStore.session.session_expires_at = Date.now() + response.expires_in * 1000;
				userStore.user_data = response.user;
				this.registered = true;
			} catch (error) {
				console.log(error);
			}
		}
	},

	persist: true,
});
