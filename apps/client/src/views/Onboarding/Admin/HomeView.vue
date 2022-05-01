<template>
  <div class="flex flex-row h-screen w-screen">
    <div
      class="border-r border-gray-300 min-h-screen p-10 flex justify-center items-center"
    >
      <AdminProgressBarVue />
    </div>
    <div class="max-h-screen min-h-screen w-full overflow-hidden">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import AdminProgressBarVue from "@/components/Onboarding/AdminProgressBar.vue";

</script>
