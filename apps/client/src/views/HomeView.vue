<template>
  <component :is="c"></component>
</template>

<script setup>
import { useUserStore } from "@/stores/user.js";
import { ref } from "vue";
import NotLoggedInView from "@/views/NotLoggedInView.vue";
import FrontPageView from "@/views/FrontPage/FrontPageView.vue";

let userStore = useUserStore();

let c = ref(null);
if (userStore.session.logged_in) {
  c = FrontPageView;
} else {
  c = NotLoggedInView;
}
</script>
