import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useUserStore } from "@/stores/user.js";

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
			meta: { requiresAdmin: true },
			component: () => import("@/views/Dashboard/DashboardHomeView.vue"),
			redirect: {
				name: "DashboardView",
			},
			children: [
				{
					path: "",
					meta: { title: "Dashboard overview" },
					name: "DashboardView",
					component: () => import("@/views/Dashboard/DashboardView.vue"),
				},
				{
					path: "users",
					meta: { title: "Manage users" },
					name: "DashboardUsersView",
					redirect: {
						name: "DashboardUsersAdminView",
					},
					component: () => import("@/views/Dashboard/ManageUsersView.vue"),
					children: [
						{
							path: "admins",
							meta: { title: "Manage admins" },
							name: "DashboardUsersAdminView",
							component: () => import("@/views/Dashboard/Users/ManageAdminsView.vue"),
						},
						{
							path: "employees",
							meta: { title: "Manage employees" },
							name: "ManageEmployeesView",
							component: () => import("@/views/Dashboard/Users/ManageEmployeesView.vue"),
						},
						{
							path: "invite",
							meta: { title: "Invite new users" },
							name: "InviteUsersView",
							component: () => import("@/views/Dashboard/Users/InviteUsersView.vue"),
						},
					]
				},
				{
					path: "user/:userId",
					meta: { title: "User details" },
					name: "ManageUserView",
					component: () => import("@/views/Dashboard/Users/ManageUserView.vue"),
				}
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
					component: () => import("@/views/FrontPage/FrontPageListingView.vue"),
				},
				{
					path: "/new-problem",
					name: "newProblem",
					meta: { requiresAdmin: true },
					component: () => import("@/views/NewProblemView.vue"),
				},
				{
					path: "/new-idea/:id",
					name: "newIdea",
					component: () => import("@/views/NewIdeaView.vue"),
				},
				{
					path: "/problem/:id",
					name: "problem",
					component: () => import("@/views/Posts/ProblemPostView.vue"),
				},
				{
					path: "/idea/:id",
					name: "idea",
					component: () => import("@/views/Posts/IdeaPostView.vue"),
				},
				{
					path: "/user/:id",
					name: "UserProfile",
					component: () => import("@/views/Profiles/UserProfileView.vue"),
					redirect: { name: "userIdeas" },
					children: [
						{
							path: "ideas",
							name: "userIdeas",
							component: () => import("@/views/Profiles/UserIdeasView.vue"),
						},
						{
							path: "comments",
							name: "userComments",
							component: () => import("@/views/Profiles/UserCommentsView.vue"),
						},
					],
				},
			],
		},

		{
			path: '/account',
			name: 'Account',
			component: () => import('@/views/Account/AccountHome.vue'),
			meta: { requiresAuth: true },
			redirect: {
				name: 'AccSettings'
			},

			children: [
				{
					path: 'settings',
					meta: { title: 'Settings' },
					name: 'AccSettings',
					component: () => import('@/views/Account/AccSettings.vue')
				},
				{
					path: 'security',
					meta: { title: 'Security' },
					name: 'AccSecurity',
					component: () => import('@/views/Account/Security.vue')
				},
				{
					path: 'security/2fa',
					meta: { title: 'Two-Factor Authentication' },
					name: 'AccSecurity2FA',
					component: () => import('@/views/Account/2fa.vue')
				}

			]
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

router.beforeEach((to, from, next) => {
	let store = useUserStore();

	const isLoggedIn = store.session.logged_in;
	if (!isLoggedIn && to.meta.requiresAuth) {
		store.logout();
		next({
			name: "Login",
			params: {
				to: to.path,
			},
		});
	} else if (to.meta.requiresAdmin && !store.user_data.is_admin) {
		next({
			name: "Error",
			params: {
				error_code: 403,
				error_message: "Unauthorized",
				error_details: "You are not authorized to access this page",
				from: {
					path: from.path,
					name: from.name,
				},
			},
		});
	} else {
		next();
	}
});

export default router;
