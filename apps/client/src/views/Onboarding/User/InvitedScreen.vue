<template>
  <TransitionRoot
    v-if="show"
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
      class="flex flex-col h-full w-1/3 content-center justify-center self-center gap-5 max-w-max px-5"
    >
      <img src="/images/confetti.png" class="w-[15rem] self-center" />
      <p class="text-5xl text-brand-medium self-center font-bold">Hooray!</p>
      <p class="text-xl text-gray-800 font-medium">
        Your employer invited you to join the team!
      </p>
      <div class="flex flex-col gap-5 mt-5">
        <button
          class="submit-button"
          @click="$router.push({ path: '/register-invited' })"
        >
          Register an account ->
        </button>
        <div class="flex flex-row gap-5">
          <span class="h-0.5 bg-gray-200 w-full self-center"></span>
          <p class="text-gray-500 font-semibold text-sm">OR</p>
          <span class="h-0.5 bg-gray-200 w-full self-center"></span>
        </div>
        <button
          class="secondary-button w-full"
          @click="$router.push({ name: 'login' })"
        >
          Log In ->
        </button>
      </div>
    </div>
  </TransitionRoot>
  <div v-if="invalid">invite not valid</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { TransitionRoot } from "@headlessui/vue";
import { checkInviteLink } from "@/helpers/api/user.js";
import { useUserOnboardingStore } from "@/stores/user_onboarding.js";
import { useRoute, useRouter } from "vue-router";

let route = useRoute();
let router = useRouter();

let show = ref(false);
let invalid = ref(false);

const userOnboardingStore = useUserOnboardingStore();

const id = route.query.id;

let checkInvite = async () => {
  let response = await checkInviteLink(id);
  if (response.data.message == "invite_link_found") {
    show.value = true;
    userOnboardingStore.inviteCode = id;
    userOnboardingStore.invited = true;
  } else {
    invalid.value = true;
  }
};

onMounted(async () => {
  if (userOnboardingStore.registered)
    router.push({ path: "/register-invited/finish" });
  await checkInvite();
});
</script>
