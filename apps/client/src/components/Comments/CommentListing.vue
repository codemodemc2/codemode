<template>
  <div v-if="comments.length > 0">
    <div class="flex flex-col">
      <div
        v-for="parent in comments"
        :key="parent._id"
        class="flex flex-col gap-4"
      >
        <CommentComponent :comment="parent" @refresh="refreshComments"/>
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
import { onMounted, ref } from "vue";
import { getComments } from "@/helpers/api/comment.js";
import { errorToast } from "@/helpers/toast.js";
import CommentComponent from "./CommentComponent.vue";

let props = defineProps(["postId"]);

let comments = ref([]);

let refreshComments = async () => {
  try {
    let res = await getComments(props.postId);
    comments.value = res.data.comments;
  } catch (error) {
    console.log(error);
    errorToast("Error fetching comments");
  }
};

refreshComments();

defineExpose({
	refreshComments,
});
</script>
