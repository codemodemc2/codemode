import { defineStore } from "pinia";

export const useAdminOnboardingStore = defineStore("admin_onboarding", {
	state: () => ({
		currentStep: 1,
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
					confirmPassword: ""
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
					users: []
				}
			},
		}
	}),

	persist: false,
});
