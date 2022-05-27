<template>
  <div
    class="flex lg:flex-row justify-center flex-col max-h-screen h-full w-screen gap-10"
  >
    <div
      class="absolute top-5 left-5 cursor-pointer"
      @click="$router.push({ name: 'home' })"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
    <div
      class="lg:border-r border-gray-300 lg:min-h-screen p-10 flex justify-center items-center"
    >
      <AdminProgressBarVue />
    </div>
    <div class="max-h-screen lg:min-h-screen lg:h-full w-full overflow-clip">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import AdminProgressBarVue from "@/components/Onboarding/AdminProgressBar.vue";
import { useAdminOnboardingStore } from "@/stores/admin_onboarding.js";
import { onBeforeUnmount, onMounted } from "vue";

const adminOnboardingStore = useAdminOnboardingStore();

onMounted(() => {
  if (adminOnboardingStore.registered) adminOnboardingStore.$reset();
});

onBeforeUnmount(() => {
  if (adminOnboardingStore.registered) adminOnboardingStore.$reset();
});
</script>
