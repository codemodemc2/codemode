<template>
  <div class="flex flex-col gap-1 border-2 rounded-xl px-5 py-2 border-gray-800 m-2">
    <div class="flex flex-row gap-2">
      <p>{{ post.username }}</p>
      •
      <p class="font-bold">{{ post.time }}</p>
      •
      <p><span class="font-bold">{{ post.likes }}</span> likes</p>
    </div>
    <div>
      <p class="font-medium text-gray-800">{{ post.title }}</p>
    </div>
    <div>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  post: Object,
});
</script>
