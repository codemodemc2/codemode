<template>
  <div class="flex lg:flex-row justify-center flex-col max-h-screen h-full w-screen gap-10">
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
import { onBeforeUnmount } from "vue";

const adminOnboardingStore = useAdminOnboardingStore();

onBeforeUnmount(() => {
  if (adminOnboardingStore.registered) adminOnboardingStore.$reset();
});
</script>
