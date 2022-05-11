<template>
  <div class="border-l-2 border-gray-500" v-if="comment">
    <div class="ml-2 flex flex-col gap-2">
      <div class="flex flex-row">
        {{ comment.user.username }} • {{ comment.created_at }}
      </div>
      <div class="flex flex-row">
        <span v-html="comment.content"></span>
      </div>
      <div class="flex flex-row gap-2">
        <div><ThumbUpIcon class="w-5" /></div>
        <div><ReplyIcon class="w-5" /></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ThumbUpIcon, ReplyIcon } from "@heroicons/vue/solid";
import { onMounted } from 'vue';
const props = defineProps({
  comment: Object,
});
onMounted(() => {
  console.log(props);
});
</script>
