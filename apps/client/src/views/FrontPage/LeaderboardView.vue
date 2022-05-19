<template>
  <div class="flex flex-col h-max justify-center items-center pt-5">
    <div class="flex flex-col justify-center items-center">
      <p class="text-2xl text-brand-dark font-bold">LEADERBOARD</p>
      <p class="text-gray-700 text-sm">Top 3 employees this month</p>
    </div>
    <div class="flex flex-col justify-center items-center gap-4 py-5 w-full">
      <div
        v-for="user in employees"
        :key="user.name"
        class="border border-gray-200 rounded-lg px-4 w-full flex flex-row justify-between items-center"
      >
        <div class="relative p-3">
          <img :src="user.img" class="absolute h-14 -rotate-[40deg] -top-4 -left-2" />
          <UserIcon class="h-24  rounded-full border border-brand-dark stroke-[0.5] p-1 text-brand-dark" />
        </div>
        <p class="font-bold text-gray-800 text-center flex-wrap">
          {{ user.name }}
        </p>
        <p class="space-x-1">
          <span class="link">{{ user.points }}</span>
          <span class="font-medium">pts.</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { UserIcon } from "@heroicons/vue/outline";

let employees = ref([
  {
    position: 1,
    name: "Lovro Rogina",
    points: 400,
    img: "/images/crowngold.png",
  },
  {
    position: 2,
    name: "Marko Kunjesic",
    points: 350,
    img: "/images/crownsilver.png",
  },
  {
    position: 3,
    name: "Mihael Panjkrc",
    points: 100,
  },
]);
</script>
