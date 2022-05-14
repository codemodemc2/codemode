<template>
  <div
    class="border border-brand-dark px-4 py-2 flex flex-col gap-1 rounded-lg"
    v-if="i"
  >
    <div class="flex flex-row gap-1 text-sm items-center">
      <p class="text-sm font-thin">Posted by:</p>
      <div class="flex flex-row items-center text-brand-dark">
        <UserCircleIcon class="h-6 stroke-1" />
        {{ i.created_by.username }}
      </div>
      <p>•</p>
      <p>{{ formatDate(i.created_at) }}</p>
    </div>
    <hr />
    <p class="font-medium">{{ i.title }}</p>
    <div class="prose prose-sm line-clamp-3">
      <div v-html="i.content"></div>
    </div>
  </div>
</template>

<script setup>
import { getIdea } from "@/helpers/api/idea";
import { ref } from "vue";
import { UserCircleIcon } from "@heroicons/vue/outline";

let props = defineProps({
  idea: Object,
});

let i = ref();
(async () => {
  let res = await getIdea(props.idea);
  i.value = res.data.idea;
})();

let formatDate = (date) => {
  date = new Date(date);
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor(diff / (1000 * 60 * 60));
  let minutes = Math.floor(diff / (1000 * 60));
  let seconds = Math.floor(diff / 1000);
  if (days > 0) {
    return days + "d";
  } else if (hours > 0) {
    return hours + "h";
  } else if (minutes > 0) {
    return minutes + "m";
  } else if (seconds > 0) {
    return seconds + "s";
  } else {
    return "now";
  }
};
</script>
