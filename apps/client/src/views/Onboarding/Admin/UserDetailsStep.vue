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
  </TransitionRoot>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useAdminOnboardingStore } from "@/stores/admin_onboarding.js";
import router from "@/router";
import { TransitionRoot } from "@headlessui/vue";
import { checkExistingUser } from "@/helpers/api/user.js";
import { errorToast } from "@/helpers/toast.js";

const adminOnboardingStore = useAdminOnboardingStore();

adminOnboardingStore.currentStep = 1;

let show = ref(false);
let email = ref(adminOnboardingStore.steps[1].data.email);
let username = ref(adminOnboardingStore.steps[1].data.username);

let onSubmit = async () => {
  let response = await checkExistingUser(email.value).catch((error) => {
    if (error == "email_already_exists") {
      errorToast("User with that email already exists");
      return;
    }
  });
  if (!response) return;
  if (response.data.message != "user_is_available") {
    errorToast("Please try again");
    return;
  }
  show.value = false;
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].data.username =
    username.value;
  adminOnboardingStore.steps[adminOnboardingStore.currentStep].data.email =
    email.value;

  adminOnboardingStore.steps[adminOnboardingStore.currentStep].finished = true;

  setTimeout(() => {
    router.push("/register/password");
  }, 500);
};

onMounted(() => {
  if (adminOnboardingStore.registered)
    router.push({ path: "/register/finish" });
  show.value = true;
});
onBeforeUnmount(() => (show.value = false));
</script>
