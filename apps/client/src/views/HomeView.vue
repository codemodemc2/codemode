<template>
  <CommentComponent :comment="comment" />
</template>

<script setup>
import CommentComponent from "@/components/CommentComponent.vue";
let comment = {
  user: {
    username: "John Doe",
  },
  created_at: "2020-01-01",
  content:
    "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur euismod, nisl nisi porta nisl, euismod euismod nisi nisi euismod.</p>",
};
</script>
