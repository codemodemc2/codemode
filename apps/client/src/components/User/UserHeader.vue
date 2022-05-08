<template>
  <div
    class="flex flex-row gap-1 border-2 rounded-xl px-6 py-6 border-gray-800 m-2"
  >
    <UserIcon class="w-20 h-20 border rounded-full p-1" />
    <div class="flex flex-col gap-2 px-1">
      <p>{{ profile.name }} ({{ profile.username }})</p>
      <div class="flex flex-row gap-2">
        <p>
          <span class="font-bold">{{ profile.points }}</span> pts
        </p>
        •
        <p>
          <span class="font-bold">{{ profile.posts }}</span> posts
        </p>
        •
        <p>
          <span class="font-bold">{{ profile.comments }}</span> comments
        </p>
        •
        <p>
          <span class="font-bold">{{ profile.rank }}</span> by points
        </p>
      </div>
      <p>{{ profile.position }}</p>
    </div>
  </div>
</template>

<script setup>
import { UserIcon } from "@heroicons/vue/outline";
const props = defineProps({
  profile: Object,
});
</script>
