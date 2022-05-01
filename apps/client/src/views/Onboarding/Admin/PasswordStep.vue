<template>
  <TransitionRoot
    appear
    :show="show"
    class="flex flex-col h-full w-full content-center justify-center"
    enter="transition-all duration-500"
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
                id="password2"
                v-model="repeatPassword"
                :type="showPassword1 ? 'text' : 'password'"
                name="password"
                placeholder="Repeat password"
                class="form-input-style peer placeholder-transparent"
                required
              />
              <label for="password2" class="input-label">Repeat password</label>
              <div
                class="absolute top-3 right-5 w-5 text-brand-dark"
                @click="showPassword1 = !showPassword1"
              >
                <EyeIcon v-if="!showPassword1"></EyeIcon>
                <EyeOffIcon v-else></EyeOffIcon>
              </div>
            </div>
            <button class="submit-button mt-5">Continue -></button>
            <button class="secondary-button mt-5" @click="$router.go(-1)">
              Back
            </button>
          </form>
        </div>
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { EyeIcon, EyeOffIcon } from "@heroicons/vue/solid";

import { useAdminOnboardingStore } from "@/stores/admin_onboarding.js";

import { TransitionRoot } from "@headlessui/vue";

import router from "@/router";

const adminOnboardingStore = useAdminOnboardingStore();

adminOnboardingStore.currentStep = 2;

let password = ref(
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].data.password
);
let repeatPassword = ref(
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].data
    .repeatPassword
);
let showPassword = ref(false);

let showPassword1 = ref(false);

let onSubmit = () => {
  show.value = false;
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].data.password =
    password.value;
  adminOnboardingStore.steps[
    adminOnboardingStore.currentStep
  ].data.repeatPassword = repeatPassword.value;
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].finished = true;
  setTimeout(() => {
    router.push("/register/company");
  }, 500);
};

let show = ref(false);
onMounted(() => (show.value = true));
onBeforeUnmount(() => (show.value = false));
</script>
