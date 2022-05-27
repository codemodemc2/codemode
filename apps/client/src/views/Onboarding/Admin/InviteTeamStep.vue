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
        Generate link to invite your team
      </p>
      <div
        v-if="link"
        class="form-input-style-disabled relative flex flex-row items-center"
      >
        <p class="font-mono pr-6">
          {{ inviteString() }}
        </p>
        <div
          class="absolute right-1 border-[1px] hover:cursor-pointer hover:border-brand-secondary outline-none decoration-transparent border-transparent rounded-md p-1 ml-1"
          @click="copyLink"
        >
          <DocumentDuplicateIcon
            v-tippy="{ content: 'Copy link!' }"
            class="w-5 h-5 text-brand-secondary"
          />
        </div>
      </div>
      <div>
        <div>
          <button class="submit-button mt-5" @click="generateLink">
            {{ link ? "Finish ->" : "Generate link" }}
          </button>
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

import { DocumentDuplicateIcon } from "@heroicons/vue/solid";
import { errorToast, successToast } from "@/helpers/toast.js";

const adminOnboardingStore = useAdminOnboardingStore();

adminOnboardingStore.currentStep = 4;

let show = ref(false);

let onSubmit = () => {
  show.value = false;
  setTimeout(() => {
    router.push("/register/finish");
  }, 500);
};

let link = ref(adminOnboardingStore.steps[4].data.inviteLink);
let inviteString = () => {
  return `${window.location.origin}/invited?id=${link.value}`;
};
let linkGenerated = adminOnboardingStore.steps[4].finished;

let generateLink = async () => {
  if (linkGenerated) {
    return onSubmit();
  }
  let response = await generateInviteLink();
  let l = response.data.inviteLink;
  link.value = l.id;
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].data.inviteLink =
    l.id;
  linkGenerated = true;
  adminOnboardingStore.steps[
    adminOnboardingStore.currentStep
  ].data.inviteLinkId = l._id;
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].finished = true;
};

let copyLink = async () => {
  let textArea = document.createElement("textarea");
  textArea.value = inviteString();
  document.body.appendChild(textArea);
  textArea.select();
  let success = document.execCommand("copy");
  textArea.remove();
  if (!success) return errorToast("Failed to copy link!");
  await successToast("Link copied!");
};

onMounted(() => {
  if (adminOnboardingStore.registered)
    router.push({ path: "/register/finish" });
  show.value = true;
});
onBeforeUnmount(() => (show.value = false));
</script>
