<template>
  <div v-for="problem in problems" class="flex flex-col gap-4">
    <FrontpagePostVue :post="problem" />
  </div>
</template>

<script setup>
import FrontpagePostVue from "@/components/Posts/FrontpagePost.vue";
import { ref } from "vue";
import { getProblems } from "@/helpers/api/problem.js";

let problems = ref([]);

(async () => {
  let res = await getProblems();
	problems.value = res.data.data;
	console.log(problems.value);

})();
</script>
