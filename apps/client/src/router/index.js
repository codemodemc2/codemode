import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/about",
			name: "about",
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import("@/views/AboutView.vue"),
		},
		{
			path: "/login",
			name: "login",
			component: () => import("@/views/LoginView.vue"),
		},
		{
			path: "/register",
			name: "register",
			component: () => import("@/views/Onboarding/Admin/HomeView.vue"),
			redirect: {
				name: "AdminUserDetailsStep",
			},
			children: [
				{
					path: "user",
					name: "AdminUserDetailsStep",
					component: () => import("@/views/Onboarding/Admin/UserDetailsStep.vue"),
				},
				{
					path: "password",
					name: "AdminPasswordStep",
					component: () => import("@/views/Onboarding/Admin/PasswordStep.vue"),
				},
				{
					path: "company",
					name: "AdminCompanyDetailsStep",
					component: () => import("@/views/Onboarding/Admin/CompanyDetailsStep.vue"),
				},
				{
					path: "invite",
					name: "InviteTeamStep",
					component: () => import("@/views/Onboarding/Admin/InviteTeamStep.vue"),
				},
				{
					path: "finish",
					name: "FinishStep",
					component: () => import("@/views/Onboarding/Admin/FinishStep.vue"),
				},

			],
		},
	],
});

export default router;
