<template>
  <div
    v-if="show"
    class="flex flex-col h-full w-full content-center justify-center"
  >
    <div
      class="flex flex-col h-full w-1/3 content-center justify-center self-center gap-5 max-w-max px-5"
    >
      <p class="text-3xl text-brand-medium self-center font-bold">
        Please wait
      </p>
      <p>We are creating your account</p>
      <RefreshIcon
        class="w-10 h-10 rotate-180 animate-spin self-center text-brand-primary"
      />
    </div>
  </div>
  <div
    v-if="registered"
    class="flex flex-col h-full w-full content-center justify-center"
  >
    <div
      class="flex flex-col h-full w-1/3 content-center justify-center self-center gap-5 max-w-max px-5"
    >
      <p class="text-3xl text-brand-medium self-center font-bold">
        You are all set!
      </p>
      <p class="">Continue to the Admin panel to start managing your team.</p>
      <button
        class="submit-button mt-5"
        @click="$router.push({ path: '/dashboard' })"
      >
        Go to dashboard ->
      </button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useAdminOnboardingStore } from "@/stores/admin_onboarding.js";
import { RefreshIcon } from "@heroicons/vue/outline";

const adminOnboardingStore = useAdminOnboardingStore();

let registered = ref(adminOnboardingStore.registered);
let show = ref(false);

let reg = async () => {
  try {
    await adminOnboardingStore.register();
    show.value = false;
    registered.value = true;
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  if (!registered.value) {
    show.value = true;
    await reg();
  }
});
onBeforeUnmount(() => {
  show.value = false;
});
</script>
