<template>
  <div class="flex flex-col h-max justify-center items-center pt-5">
    <div class="flex flex-col justify-center items-center">
      <p class="text-2xl text-brand-dark font-bold">LEADERBOARD</p>
      <p class="text-gray-700 text-sm">Top 3 employees this month</p>
    </div>

    <div
      v-if="users.length > 0"
      class="flex flex-col justify-center items-center gap-4 py-5 w-full"
    >
      <div
        v-for="user in users"
        :key="user._id"
        class="border rounded-lg w-full"
        :class="
          [
            'border-amber-300 shadow-sm shadow-amber-300',
            'border-zinc-300 shadow-sm shadow-zinc-300',
            'border-amber-700 shadow-sm shadow-amber-700',
          ][users.indexOf(user)]
        "
      >
        <div
          v-if="users.indexOf(user) == 0"
          class="w-full flex flex-col justify-between items-center"
        >
          <div class="relative p-3">
            <img
              src="/images/laurelgold.png"
              class="absolute h-24 top-1 left-0"
            />
            <img
              :src="images[users.indexOf(user)]"
              class="absolute h-14 -top-7 left-[1.32rem]"
            />
            <UserIcon
              v-if="!user.profile_image"
              class="h-20 rounded-full border border-brand-dark stroke-[0.5] p-1 text-brand-dark"
            />
            <img
              v-else
              :src="user.profile_image"
              class="h-20 rounded-full border border-brand-dark stroke-[0.5]"
            />
          </div>
          <p class="font-bold text-gray-800 text-center text-2xl flex-wrap">
            {{ user.first_name }} {{ user.last_name }}
          </p>
          <p class="space-x-1 pb-4">
            <span class="link">{{ user.likes }}</span>
            <span v-if="user.likes == 1" class="font-medium">pt.</span>
            <span v-else class="font-medium">pts.</span>
          </p>
        </div>
        <div
          v-else
          class="w-full flex flex-row justify-between items-center px-5"
        >
          <div class="relative p-3">
            <img
              :src="images[users.indexOf(user)]"
              class="absolute h-50 top-0.5 left-0 bg-none"
            />
            <UserIcon
              v-if="!user.profile_image"
              class="h-14 rounded-full border border-brand-dark stroke-[0.5] p-1 text-brand-dark"
            />
            <img v-else :src="user.profile_image" class="h-14 rounded-full" />
          </div>
          <p class="font-bold text-gray-800 text-center flex-wrap">
            {{ user.first_name }} {{ user.last_name }}
          </p>
          <p class="space-x-1">
            <span class="link">{{ user.likes }}</span>
            <span v-if="user.likes == 1" class="font-medium">pt.</span>
            <span v-else class="font-medium">pts.</span>
          </p>
        </div>
        <div
          v-if="users.indexOf(user) == 0"
          class="relative py-3 self-center flex flex-col justify-center items-center bg-gradient-to-tl from-amber-200 to-amber-300 rounded-b-lg"
        >
          <p class="uppercase text-2xl font-bold text-amber-700">reward</p>
          <div class="flex">
            <p class="link text-2xl text-amber-900">
              {{ rewards[users.indexOf(user)] }}
            </p>
            <img
              v-tippy="{ content: 'Shop coins' }"
              src="/images/idea-coin.png"
              class="h-8"
            />
          </div>
        </div>
        <div
          v-else
          class="relative py-3 self-center flex flex-row justify-center items-center rounded-b-lg"
          :class="
            [
              'bg-gradient-to-tl from-zinc-200 to-zinc-300',
              ' bg-gradient-to-tl from-amber-600 to-amber-700',
            ][users.indexOf(user) - 1]
          "
        >
          <p
            class="uppercase text-lg font-bold"
            :class="
              ['text-zinc-900', 'text-amber-300'][users.indexOf(user) - 1]
            "
          >
            reward: &nbsp;
          </p>
          <p
            class="link text-lg"
            :class="
              ['text-zinc-900', 'text-amber-300'][users.indexOf(user) - 1]
            "
          >
            {{ rewards[users.indexOf(user)] }}
          </p>
          <img
            v-tippy="{ content: 'Shop coins' }"
            src="/images/idea-coin.png"
            class="h-8"
          />
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col h-max justify-center items-center p-5">
      <p class="text-brand-dark text-2xl font-bold">Leaderboard is empty</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { UserIcon } from "@heroicons/vue/outline";
import { getFrontPageLeaderboard } from "@/helpers/api/frontpage.js";

let images = ref([
  "/images/crowngold.png",
  "/images/laurelsilver.png",
  "/images/laurelbronze.png",
]);

let rewards = ref(["500", "250", "100"]);

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
