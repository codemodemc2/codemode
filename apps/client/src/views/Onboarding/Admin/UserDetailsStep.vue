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
          Enter Username and Email
        </p>
        <div>
          <div>
            <form class="mb-5 flex flex-col gap-5" @submit.prevent="onSubmit">
              <div class="relative col-span-2 w-full">
                <input
                  id="username"
                  v-model="username"
                  type="text"
                  placeholder="Username"
                  class="form-input-style peer placeholder-transparent"
                  required
                />
                <label for="username" class="input-label">Username</label>
              </div>
              <div class="relative col-span-2 w-full">
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  class="form-input-style peer placeholder-transparent"
                  required
                />
                <label class="input-label" for="email">Email</label>
              </div>
              <button class="submit-button mt-5">Continue -></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

import { useAdminOnboardingStore } from "@/stores/admin_onboarding.js";

import router from "@/router";

const adminOnboardingStore = useAdminOnboardingStore();

adminOnboardingStore.currentStep = 1;

let email = ref("");
let username = ref("");

let onSubmit = () => {
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].data.username = username.value;
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].data.email = email.value;
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].finished = true;

  router.push("/register/password");
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
