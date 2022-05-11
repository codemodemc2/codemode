<template>
  <div class="flex flex-col gap-4">
    <FrontpagePostVue :post="post"/>
    <FrontpagePostVue :post="post"/>
    <FrontpagePostVue :post="post"/>
    <FrontpagePostVue :post="post"/>
    <FrontpagePostVue :post="post"/>

  </div>
</template>

<script setup>
import FrontpagePostVue from "@/components/Posts/FrontpagePost.vue";
import { ref } from "vue";

let post = ref({
  title: "Not enough enagagement on our new platform",
  content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde at itaque iure sit recusandae exercitationem ipsum laboriosam, dolore qui voluptatibus ducimus est aut fugit! Autem earum natus dolor dolorem incidunt? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde at itaque iure sit recusandae exercitationem ipsum laboriosam, dolore qui voluptatibus ducimus est aut fugit! Autem earum natus dolor dolorem incidunt?",
  likes: 0,
  user: {
    username: "lo",
  },
  created_at: 0,
	idea_count: 1,
	created_at: "12h"
});
</script>
