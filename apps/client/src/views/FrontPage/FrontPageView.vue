<template>

  <div class="flex flex-col h-screen relative">
    <div class="w-screen sticky top-0 z-50">
      <NavigationBarVue />
    </div>
    <div
      class="home-bg absolute top-0 h-full z-0 w-full bg-fixed blur-[1px] filter"
    />
    <div
      class="absolute top-0 z-10 h-full w-full bg-gradient-to-br from-transparent via-gray-50 to-gray-100 bg-fixed"
    />
<div
            class="absolute -left-60 top-40 z-10 h-[50vh] w-[200vw] -rotate-[10deg] transform bg-gradient-to-r from-sky-400 to-sky-600"
          ></div>
    <router-view class="z-50">
      
    </router-view>
  </div>
</template>

<script setup>
import NavigationBarVue from "@/components/FrontPage/FrontNavBar.vue";

import { RouterView } from "vue-router";
</script>
