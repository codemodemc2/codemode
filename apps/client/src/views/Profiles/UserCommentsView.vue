<template>
  <div v-if="comments.length > 0" class="px-5 py-2">
    <div class="flex flex-col">
      <div
        v-for="parent in comments"
        :key="parent._id"
        class="flex flex-col gap-4"
      >
        <CommentComponent :comment="parent" @refresh="refreshComments" />
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col items-center justify-center py-10">
    <p class="text-brand-dark text-xl">No comments yet.</p>
    <p class="text-brand-dark text-xl">
      Be the first one to comment on this idea!
    </p>
  </div>
</template>
<script setup>
import CommentComponent from "@/components/Comments/CommentComponent.vue";

import { getUserComments } from "@/helpers/api/user";
import { ref } from "vue";

let comments = ref([]);

let props = defineProps(["id"]);

(async () => {
  let res = await getUserComments(props.id);
  comments.value = res.data.comments;
})();
</script>
