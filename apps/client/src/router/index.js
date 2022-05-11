import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
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
					component: () =>
						import("@/views/Onboarding/Admin/UserDetailsStep.vue"),
				},
				{
					path: "password",
					name: "AdminPasswordStep",
					component: () => import("@/views/Onboarding/Admin/PasswordStep.vue"),
				},
				{
					path: "company",
					name: "AdminCompanyDetailsStep",
					component: () =>
						import("@/views/Onboarding/Admin/CompanyDetailsStep.vue"),
				},
				{
					path: "invite",
					name: "InviteTeamStep",
					component: () =>
						import("@/views/Onboarding/Admin/InviteTeamStep.vue"),
				},
				{
					path: "finish",
					name: "AdminFinishStep",
					component: () => import("@/views/Onboarding/Admin/FinishStep.vue"),
				},
			],
		},
		{
			path: "/invited",
			name: "invited",
			component: () => import("@/views/Onboarding/User/InvitedScreen.vue"),
		},
		{
			path: "/register-invited",
			name: "register-invited",
			component: () => import("@/views/Onboarding/User/HomeView.vue"),
			redirect: {
				name: "UserDetailsStep",
			},
			children: [
				{
					path: "user",
					name: "UserDetailsStep",
					component: () =>
						import("@/views/Onboarding/User/UserDetailsStep.vue"),
				},
				{
					path: "password",
					name: "UserPasswordStep",
					component: () => import("@/views/Onboarding/User/PasswordStep.vue"),
				},
				{
					path: "finish",
					name: "UserFinishStep",
					component: () => import("@/views/Onboarding/User/FinishStep.vue"),
				},
			],
		},
    {
			path: "/dashboard",
			name: "DashboardHome",
			component: () => import("@/views/Dashboard/DashboardHomeView.vue"),
			redirect: {
				name: "UserDetailsStep",
			},
			children: [
				{
					path: "user",
					name: "UserDetailsStep",
					component: () =>
						import("@/views/Onboarding/User/UserDetailsStep.vue"),
				},
				{
					path: "password",
					name: "UserPasswordStep",
					component: () => import("@/views/Onboarding/User/PasswordStep.vue"),
				},
				{
					path: "finish",
					name: "UserFinishStep",
					component: () => import("@/views/Onboarding/User/FinishStep.vue"),
				},
			],
		},
		{
			path: "/",
			name: "home",
			component: HomeView,
			children: [
				{
					path: "",
					name: "FrontPage",
					component: () =>
						import("@/views/Frontpage/FrontPageListingView.vue"),
				},
				{
					path: "/new-problem",
					name: "newProblem",
					component: () => import("@/views/NewProblemView.vue"),
				},
			],
		},

		{
			path: "/error",
			name: "Error",
			component: () => import("@/views/Errors/DynamicError.vue"),
			props: true,
		},
		{
			path: "/:catchAll(.*)",
			name: "404",
			component: () => import("@/views/Errors/DynamicError.vue"),
		},
	],
});

export default router;
