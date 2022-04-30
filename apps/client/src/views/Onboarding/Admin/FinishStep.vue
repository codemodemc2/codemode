<template>
  <Transition name="slide-fade">
    <div
      v-if="show"
      class="flex flex-col h-full w-full content-center justify-center"
    >
      <div
        class="flex flex-col h-full w-1/3 content-center justify-center self-center gap-10 min-w-max"
      >
        <p class="text-3xl text-brand-medium self-center font-bold">
          You have finished setting up your account!
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

import { useAdminOnboardingStore } from "@/stores/admin_onboarding.js";

import router from "@/router";

const adminOnboardingStore = useAdminOnboardingStore();

adminOnboardingStore.currentStep = 5;

let email = ref("");
let username = ref("");

let onSubmit = () => {
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].data.username =
    username.value;
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].data.email =
    email.value;
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].finished = true;

  router.push("/register/finish");
};

let show = ref(false);
onMounted(() => (show.value = true));
onBeforeUnmount(() => (show.value = false));
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 100;
}
</style>
