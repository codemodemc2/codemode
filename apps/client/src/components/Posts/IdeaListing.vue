<template>
  <router-link
    v-if="i"
    :to="{ name: 'idea', params: { id: i._id } }"
    class="border border-gray-200 px-4 py-2 flex flex-col gap-1 rounded-lg"
  >
    <div class="flex flex-row gap-1 text-sm items-center">
      <p class="text-sm font-light">Posted by:</p>
      <div class="flex flex-row gap-[0.2rem] items-center text-brand-dark">
        <UserCircleIcon
          v-if="!i.created_by.profile_image"
          class="h-6 stroke-1"
        />
        <img
          v-else
          :src="i.created_by.profile_image"
          alt=""
          class="h-6 rounded-full border border-brand-dark"
        />
        {{ i.created_by.username }}
      </div>
      <p>•</p>
      <p>{{ formatDate(i.created_at) }} ago</p>
      <p>•</p>
      <p>
        <span class="link">{{ i.like_count }}</span> likes
      </p>
    </div>
    <hr />
    <p class="font-medium xl:text-lg md:text-md text-sm">{{ i.title }}</p>
    <div class="text-xs xl:prose-md md:prose-sm sm:prose-xs line-clamp-3">
      <div v-html="i.content"></div>
    </div>
  </router-link>
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
