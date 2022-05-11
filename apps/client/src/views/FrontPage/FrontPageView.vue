<template>
  <div class="flex flex-col h-screen relative">
    <div class="w-screen sticky top-0 z-50">
      <NavigationBarVue />
    </div>

    <router-view></router-view>
  </div>
</template>

<script setup>
import NavigationBarVue from "@/components/FrontPage/FrontNavBar.vue";

import { RouterView } from "vue-router";
</script>
