<template>
  <div class="flex flex-col gap-5 w-full items-center pt-20 h-screen bg-white">
    <div class="w-1/2">
      <div class="pb-10">
        <p class="text-4xl font-bold text-sky-800">
          Post a new idea for problem:
        </p>
        <p v-if="problem" class="text-lg text-gray-400">{{ problem.title }}</p>
      </div>
      <form class="mb-5 flex flex-col gap-5" @submit.prevent>
        <div class="relative col-span-2 w-full">
          <input
            id="title"
            v-model="title"
            type="text"
            placeholder="Title"
            class="form-input-style peer placeholder-transparent"
            required
          />
          <label class="input-label" for="title">Title</label>
        </div>
        <div class="relative col-span-2 w-full">
          <Tiptap v-model="content" class="min-h-[20rem]" />
        </div>
      </form>
      <div class="flex space-x-2">
        <button class="primary-button" @click="publish()">Post</button>
        <button class="secondary-button">Cancel</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import Tiptap from "@/components/Tiptap.vue";
import { ref } from "vue";
import { getProblem } from "@/helpers/api/problem.js";
import { postIdea } from "@/helpers/api/idea.js";

import { errorToast, successToast } from "@/helpers/toast.js";
import { useRoute, useRouter } from "vue-router";

let route = useRoute();
let router = useRouter();

let title = ref("");
let content = ref("");

let object = () => {
  return {
    title: title.value,
    content: content.value,
    problemId: route.params.id,
  };
};

let problem = ref(null);

(async () => {
  try {
    let res = await getProblem(route.params.id);
    problem.value = res.data.problem;
  } catch (error) {
    console.log(error);
    router.push({
      name: "Error",
      error_code: error.response.status,
      error_message: error.response.data.message,
    });
  }
})();

let publish = async () => {
  if (!title.value.length == 0) {
    return errorToast("Title can't be empty");
  }
  if (!content.value.length == 0) {
    return errorToast("Content can't be empty");
  }

  let res = await postIdea(object());
  if (res) {
    successToast("Idea published successfully");
    router.push({ path: `/idea/${res.data.data._id}` });
  } else {
    errorToast("Idea publishing failed");
  }
};
</script>
