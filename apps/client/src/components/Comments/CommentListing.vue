<template>
  <div v-if="comments">
    <div class="flex flex-col">
      <div
        v-for="parent in comments"
        :key="parent._id"
        class="flex flex-col gap-4"
      >
        <CommentComponent :comment="parent" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { getComments } from "@/helpers/api/comment.js";
import { errorToast } from "@/helpers/toast.js";
import CommentComponent from "./CommentComponent.vue";

let props = defineProps(["postId"]);

let comments = ref([]);


(async () => {
  try {
    let res = await getComments(props.postId);
    comments.value = res.data.comments;
  } catch (error) {
    console.log(error);
    errorToast("Error fetching comments");
  }
})();
</script>
