<template>
  <div class="flex flex-col gap-5 w-full items-center pt-20 h-screen">
    <div class="w-1/2">
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
          <Tiptap v-model="content" />
        </div>
      </form>
      <div class="flex space-x-2">
        <button class="primary-button">Publish</button>
        <button class="secondary-button">Cancel</button>
      </div>
    </div>
		
		<article v-html="content"></article>

  </div>
</template>
<script setup>
import Tiptap from "@/components/Tiptap.vue";
import { ref } from "vue";

let content = ref("emtpy");
</script>
