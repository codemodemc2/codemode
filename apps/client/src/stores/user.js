import { defineStore } from "pinia";
import { login } from "../helpers/api/user.js";

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
    async login() {
      const response = await login("ok", "test");
      console.log(this);
      this.session.logged_in = true;
      this.session.session_expires_at = Date.now() + response.expires_in * 1000;
      this.user_data = response.user;
      console.log(this.session);
    },
    logout() {
      this.session.logged_in = false;
      this.session.session_expires_at = 0;
      this.user_data = Object.create(null);
    },
  },
  persist: true,
});
