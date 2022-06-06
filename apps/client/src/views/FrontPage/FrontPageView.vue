<template>
  <div class="flex flex-col h-screen relative">
    <div class="w-screen sticky top-0 z-50">
      <NavigationBarVue />
    </div>
    <div class="absolute top-0 h-full -z-50 w-full bg-fixed blur-[1px] filter">
      <img src="/images/ub-bg.svg" class="w-full -z-50" />
    </div>
    <router-view class="z-30 w-full"></router-view>
  </div>
</template>

<script setup>
import NavigationBarVue from "@/components/FrontPage/FrontNavBar.vue";

import { RouterView } from "vue-router";
</script>
