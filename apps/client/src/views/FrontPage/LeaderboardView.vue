<template>
  <div class="flex flex-col h-max justify-center items-center pt-5">
    <div class="flex flex-col justify-center items-center">
      <p class="text-2xl text-brand-dark font-bold">LEADERBOARD</p>
      <p class="text-gray-700 text-sm">Top 3 employees this month</p>
    </div>
    <div class="flex flex-col justify-center items-center gap-4 py-5 w-full">
      <div
        v-for="user in users"
        :key="user._id"
        class="border border-gray-200 rounded-lg px-4 w-full flex flex-row justify-between items-center"
      >
        <div class="relative p-3">
          <img
            :src="images[users.indexOf(user)]"
            class="absolute h-14 -rotate-[40deg] -top-4 -left-2"
          />
          <UserIcon
            class="h-24 rounded-full border border-brand-dark stroke-[0.5] p-1 text-brand-dark"
          />
        </div>
        <p class="font-bold text-gray-800 text-center flex-wrap">
          {{ user.username }}
        </p>
        <p class="space-x-1">
          <span class="link">{{ user.likes }}</span>
          <span class="font-medium">pts.</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { UserIcon } from "@heroicons/vue/outline";
import { getFrontPageLeaderboard } from "@/helpers/api/frontpage.js";

let images = ref([
  "/images/crowngold.png",
  "/images/crownsilver.png",
  "/images/crownbronze.png",
]);

let users = ref([]);
(async () => {
  try {
    let res = await getFrontPageLeaderboard();
    users.value = res.data;
    console.log(users.value);
  } catch (error) {
    console.log(error);
  }
})();
</script>
