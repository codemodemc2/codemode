<template>
  <div
    class="flex lg:flex-row justify-center flex-col max-h-screen h-full w-screen gap-10"
  >
    <div
      class="lg:border-r border-gray-300 lg:min-h-screen p-10 flex justify-center items-center"
    >
      <UserProgressBarVue />
    </div>
    <div class="max-h-screen lg:min-h-screen lg:h-full w-full overflow-clip">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import UserProgressBarVue from "@/components/Onboarding/UserProgressBar.vue";
import { useUserOnboardingStore } from "@/stores/user_onboarding.js";
import { onBeforeUnmount } from "vue";
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
onBeforeUnmount(() => {
  if (userOnboardingStore.registered) userOnboardingStore.$reset();
});
</script>
