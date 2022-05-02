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
      class="
        flex flex-col
        h-full
        w-1/3
        content-center
        justify-center
        self-center
        gap-10
        min-w-max
        px-5
      "
    >
      <p class="text-3xl text-brand-medium self-center font-bold">
        Generate link to invite your team
      </p>
      <p>{{ link }}</p>
      <div>
        <div>
          <button @click="generateLink" class="submit-button mt-5">{{ message }}</button>
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

import { generateInviteLink } from "@/helpers/api/user.js";

const adminOnboardingStore = useAdminOnboardingStore();

adminOnboardingStore.currentStep = 4;

let show = ref(false);

let onSubmit = () => {
  show.value = false;
  setTimeout(() => {
    router.push("/register/finish");
  }, 500);
};

let message = ref("Generate link");
let link = ref("");
let linkGenerated = false;

let generateLink = async () => {
  if (linkGenerated) {
    return onSubmit();
  }
  let response = await generateInviteLink();
  let l = response.data.inviteLink;
  console.log(response)
  link.value = `http://localhost:3000/invited?id=${l}`;
  message.value = "Finish ->";
};

onMounted(() => (show.value = true));
onBeforeUnmount(() => (show.value = false));
</script>
