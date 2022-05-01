<template>
  <TransitionRoot
    appear
    :show="show"
    class="flex flex-col h-full w-full content-center justify-center"
    enter="transition-all duration-1000"
    enter-from="opacity-0 translate-x-96"
    enter-to="opacity-100 translate-y-0"
    leave="transition-all duration-500"
    leave-from="opacity-100"
    leave-to="opacity-0 -translate-x-96"
  >
    <div
      class="flex flex-col h-full w-1/3 content-center justify-center self-center gap-10 min-w-max"
    >
      <p class="text-3xl text-brand-medium self-center font-bold">
        You are all set!
      </p>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

import { useAdminOnboardingStore } from "@/stores/admin_onboarding.js";

import router from "@/router";

import { TransitionRoot } from "@headlessui/vue";

const adminOnboardingStore = useAdminOnboardingStore();

adminOnboardingStore.currentStep = 5;

let email = ref("");
let username = ref("");

let onSubmit = () => {
  show.value = false;
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].data.username =
    username.value;
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].data.email =
    email.value;
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].finished = true;
  setTimeout(() => {
    router.push("/register/finish");
  }, 500);
};

let show = ref(false);
onMounted(() => (show.value = true));
onBeforeUnmount(() => (show.value = false));
</script>
