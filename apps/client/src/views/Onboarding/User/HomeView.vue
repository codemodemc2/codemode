<template>
  <div class="flex justify-center flex-col max-h-screen h-full w-screen gap-10">
    <div
      class="absolute top-5 left-5 cursor-pointer"
      @click="$router.push({ name: 'home' })"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
    <div class="border-gray-300 p-10 flex justify-center items-center">
      <UserProgressBarVue />
    </div>
    <div class="max-h-screen w-full overflow-clip">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import UserProgressBarVue from "@/components/Onboarding/UserProgressBar.vue";
import { useUserOnboardingStore } from "@/stores/user_onboarding.js";
import { onBeforeUnmount, onMounted } from "vue";
import { useRouter } from "vue-router";

const userOnboardingStore = useUserOnboardingStore();

let router = useRouter();

if (!userOnboardingStore.invited) {
  router.push({
    name: "Error",
    params: {
      error_code: 403,
      error_message: "Unauthorized",
      error_details: "You need to be invited to register",
      from: {
        path: "",
        name: "",
      },
    },
  });
}

onMounted(() => {
  if (userOnboardingStore.registered) userOnboardingStore.$reset();
});

onBeforeUnmount(() => {
  if (userOnboardingStore.registered) userOnboardingStore.$reset();
});
</script>
