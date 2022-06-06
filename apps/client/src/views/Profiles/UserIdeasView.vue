<template>
  <div class="flex flex-col gap-2 py-5 px-4">
    <router-link
      v-for="i in ideas"
			:key="i._id"
      :to="{ name: 'idea', params: { id: i._id } }"
      class="border border-gray-200 px-4 py-2 flex flex-col gap-1 rounded-lg"
    >
      <div class="flex flex-row gap-1 text-sm items-center">
        <p class="text-sm font-light">Posted</p>
        <p>{{ formatDate(i.created_at) }} ago</p>
        <p>•</p>
        <p>
          <span class="link">{{ i.like_count }}</span> {{ i.like_count == 1 ? 'like' : 'likes' }}
        </p>
      </div>
      <hr />
      <p class="font-medium xl:text-lg md:text-md text-sm">{{ i.title }}</p>
      <div class="text-xs xl:prose-md md:prose-sm sm:prose-xs line-clamp-3">
        <div v-html="i.content"></div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { getUserIdeas } from "@/helpers/api/user";
import { ref } from "vue";

let ideas = ref([]);

let props = defineProps(["id"]);

(async () => {
  let res = await getUserIdeas(props.id);
  ideas.value = res.data.ideas;
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
