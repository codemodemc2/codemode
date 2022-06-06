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
      class="flex flex-col h-full w-1/4 content-center justify-center self-center gap-10 min-w-max px-5"
    >
      <p class="text-3xl text-brand-medium self-center font-bold">
        Enter your company's details
      </p>
      <div>
        <div>
          <form class="mb-5 flex flex-col gap-5" @submit.prevent="onSubmit">
            <div class="relative col-span-2 w-full">
              <input
                id="username"
                v-model="companyName"
                type="text"
                placeholder="Company name"
                class="form-input-style peer placeholder-transparent"
                required
              />
              <label for="username" class="input-label">Company name</label>
            </div>
            <div class="relative col-span-2 w-full">
              <input
                @change="onLogoChange"
                id="logo"
                type="file"
                name="logo"
                placeholder="Company logo"
                class="form-input-style peer placeholder-transparent"
                required
              />
              <label for="logo" class="input-label">Company logo</label>
              <div class="absolute w-10 h-10 right-3 top-1">
                <img v-if="logo" :src="logo" class="w-full h-full" />
              </div>
            </div>

            <div class="relative col-span-2 w-full">
              <input
                @change="onBgChange"
                type="file"
                placeholder="Website background"
                class="form-input-style peer placeholder-transparent"
                required
              />
              <label class="input-label">Website background</label>
              <div v-if="bg" class="form-input-style relative my-2">
                <img :src="bg" class="object-cover aspect-[3/1] w-[33rem]" />
              </div>
            </div>
            <button class="submit-button mt-5">Continue -></button>
            <button
              class="link hover:underline"
              @click.prevent="$router.push('/register/password')"
            >
              &#60;- Back
            </button>
          </form>
        </div>
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

import { useAdminOnboardingStore } from "@/stores/admin_onboarding.js";

import router from "@/router";

import { TransitionRoot } from "@headlessui/vue";

const adminOnboardingStore = useAdminOnboardingStore();

adminOnboardingStore.currentStep = 3;

let companyName = ref(
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].data.companyName
);

let logo = ref();
let bg = ref();

let onLogoChange = (e) => {
  const file = e.target.files[0];
  logo.value = URL.createObjectURL(file);
};

let onBgChange = (e) => {
  const file = e.target.files[0];
  bg.value = URL.createObjectURL(file);
};

let onSubmit = () => {
  show.value = false;
  adminOnboardingStore.steps[
    adminOnboardingStore.currentStep
  ].data.companyName = companyName.value;
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].finished = true;
  setTimeout(() => {
    router.push("/register/invite");
  }, 500);
};

let show = ref(false);
onMounted(() => {
  if (adminOnboardingStore.registered)
    router.push({ path: "/register/finish" });
  show.value = true;
});
onBeforeUnmount(() => (show.value = false));
</script>
