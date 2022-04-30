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
          Choose a secure password
        </p>
        <div>
          <div>
            <form class="mb-5 flex flex-col gap-5" @submit.prevent="onSubmit">
              <div class="relative col-span-2 w-full">
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  name="password"
                  placeholder="Password"
                  class="form-input-style peer placeholder-transparent"
                  required
                />
                <label for="password" class="input-label">Password</label>
                <div
                  class="absolute top-3 right-5 w-5 text-brand-dark"
                  @click="showPassword = !showPassword"
                >
                  <EyeIcon v-if="!showPassword"></EyeIcon>
                  <EyeOffIcon v-else></EyeOffIcon>
                </div>
              </div>

              <div class="relative col-span-2 w-full">
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword1 ? 'text' : 'password'"
                  name="password"
                  placeholder="Repeat password"
                  class="form-input-style peer placeholder-transparent"
                  required
                />
                <label for="password" class="input-label"
                  >Repeat password</label
                >
                <div
                  class="absolute top-3 right-5 w-5 text-brand-dark"
                  @click="showPassword1 = !showPassword1"
                >
                  <EyeIcon v-if="!showPassword1"></EyeIcon>
                  <EyeOffIcon v-else></EyeOffIcon>
                </div>
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
import { EyeIcon, EyeOffIcon } from "@heroicons/vue/solid";

import { useAdminOnboardingStore } from "@/stores/admin_onboarding.js";

import router from "@/router";

const adminOnboardingStore = useAdminOnboardingStore();

adminOnboardingStore.currentStep = 2;

let email = ref("");
let username = ref("");
let showPassword = ref(false);

let showPassword1 = ref(false);

let onSubmit = () => {
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].data.username =
    username.value;
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].data.email =
    email.value;
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].finished = true;

  router.push("/register/company");
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
