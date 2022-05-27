<template>
  <div
    class="flex flex-col gap-5 w-full items-center pt-20 h-screen overflow-y-auto pb-20 bg-white"
  >
    <div class="lg:w-1/2 w-full">
      <p class="text-4xl font-bold text-sky-800 pb-10">Publish a new problem</p>
      <form class="mb-5 flex flex-col gap-5">
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
          <textarea
            id="title"
            v-model="summary"
            type="text"
            placeholder="Summary"
            class="form-input-style peer placeholder-transparent"
            required
          />
          <label class="input-label" for="title">Summary</label>
        </div>
        <div class="relative col-span-2 w-full">
          <Tiptap v-model="content" class="min-h-[20rem]" />
        </div>
        <div
          class="relative col-span-2 w-full flex flex-row content-center gap-4"
        >
          <Switch
            v-model="deadlineEnabled"
            :class="deadlineEnabled ? 'bg-brand-dark' : 'bg-white'"
            class="relative inline-flex p-[0.1rem] h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-brand-dark transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <span class="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              :class="
                deadlineEnabled
                  ? 'translate-x-[1.85rem]'
                  : 'translate-x-0 bg-brand-dark'
              "
              class="pointer-events-none inline-block h-[1.25rem] w-[1.25rem] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
            />
          </Switch>
          <p class="text-brand-dark font-medium">Problem has a deadline</p>
        </div>
        <div class="relative col-span-2 w-full" v-if="deadlineEnabled">
          <input
            id="deadline"
            v-model="deadline"
            type="datetime-local"
            class="form-input-style peer placeholder-transparent w-2/"
            required
          />
          <label class="input-label" for="deadline"
            >Set deadline for this problem</label
          >
        </div>
        <div class="relative col-span-2 w-full">
          <input
            id="prize"
            v-model="prize"
            type="text"
            placeholder="Prize for the solution"
            class="form-input-style peer placeholder-transparent"
            required
          />
          <label class="input-label" for="prize">Prize for the solution</label>
        </div>
      </form>
      <div class="flex space-x-2">
        <button class="primary-button" @click="publish()">Publish</button>
        <button class="secondary-button" @click="$router.go(-1)">Cancel</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import Tiptap from "@/components/Tiptap.vue";
import { ref } from "vue";
import { Switch } from "@headlessui/vue";
import { postProblem } from "@/helpers/api/problem.js";
import { errorToast, successToast } from "@/helpers/toast.js";
import { useRouter } from "vue-router";

let router = useRouter();

let title = ref("");
let content = ref("");
let deadlineEnabled = ref(false);
let deadline = ref("");
let prize = ref("");
let summary = ref("");

let object = () => {
  return {
    title: title.value,
    content: content.value,
    deadlineEnabled: deadlineEnabled.value,
    deadline: deadline.value,
    prize: prize.value,
    summary: summary.value,
  };
};

let publish = async () => {
  if (summary.value.length == 0) {
    return errorToast("Summary can't be empty");
  }
  if (title.value.length == 0) {
    return errorToast("Title can't be empty");
  }
  if (content.value.length == 0) {
    return errorToast("Content can't be empty");
  }
  let res = await postProblem(object());
  if (res) {
    successToast("Problem published successfully");
    router.push({ path: `/problem/${res.data.data._id}` });
  } else {
    errorToast("Problem publishing failed");
  }
};
</script>
