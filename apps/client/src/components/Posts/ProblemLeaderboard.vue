<template>
  <div class="flex flex-col h-max justify-center items-center pt-5">
    <div class="flex flex-col justify-center items-center">
      <p class="text-2xl text-brand-dark font-bold">LEADERBOARD</p>
      <p class="text-gray-700 text-sm">Top 3 ideas for this problem</p>
    </div>
    <div class="flex flex-col justify-center items-center gap-4 py-5 w-full">
      <div
        v-for="idea in ideas"
        :key="idea._id"
        class="border border-gray-200 rounded-lg px-4 w-full flex flex-row justify-between items-center"
      >
        <IdeaListing :idea="idea" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { UserIcon } from "@heroicons/vue/outline";
import IdeaListing from "@/components/Posts/IdeaListing.vue";
let props = defineProps({
  ideas: Object,
});
</script>
