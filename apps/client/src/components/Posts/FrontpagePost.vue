<template>
  <div
    v-if="post"
    class="w-full h-auto flex flex-row rounded-lg lg:p-5 p-2 py-10 border border-gray-200"
  >
    <div class="xl:pl-4 lg:pl-3 md:pl-2 pl-1 flex flex-col items-center">
      <TransitionRoot
        v-if="liked"
        appear
        :show="liked"
        enter="transition-all transform duration-500"
        enter-from="opacity-0 scale-0 rotate-[-720deg]"
        enter-to="opacity-100 scale-[110%] rotate-0"
        entered="opacity-100 scale-100"
        leave="transition-all transform duration-500"
        leave-from="opacity-100 scale-100 rotate-0"
        leave-to="opacity-0 scale-0 rotate-[720deg]"
        @click="like"
      >
        <LikedIcon class="w-7 h-7 stroke-1 text-brand-secondary" />
      </TransitionRoot>
      <TransitionRoot
        v-else
        appear
        :show="!liked"
        enter="transition-all transform duration-500"
        enter-from="opacity-0 scale-0 rotate-[720deg]"
        enter-to="opacity-100 scale-[110%] rotate-0"
        entered="opacity-100 scale-100"
        leave="transition-all transform duration-500"
        leave-from="opacity-100 scale-100 rotate-0"
        leave-to="opacity-0 scale-0 rotate-[-720deg]"
        @click="like"
      >
        <NotLikedIcon class="w-7 h-7 stroke-1 text-brand-secondary" />
      </TransitionRoot>

      <p class="select-none text-sm text-brand-dark">{{ showedLikes() }}</p>
    </div>
    <div class="flex flex-col xl:px-8 lg:px-6 px-2 gap-6 w-full">
      <p class="font-semibold text-xl text-gray-800">
        {{ post.title }}
      </p>
      <article class="prose line-clamp-[4]">
        {{ post.content }}
      </article>
      <hr />
      <div class="flex flex-row items-center justify-between">
        <div class="flex flex-row items-center">
          <img
            class="w-8 rounded-full mr-2"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <p class="font-regular text-sm mr-1 text-gray-700">Posted by:</p>
          <p class="link mr-4 font-medium text-sm">{{ post.user.username }}</p>
          <p class="font-regular text-sm mr-1 text-gray-700">{{ post.created_at }} ago</p>
        </div>
        <div class="flex flex-row gap-1 items-center">
          <DocumentTextIcon class="w-7 h-7 text-brand-secondary stroke-1" />
          <p class="font-regular text-sm mr-1 text-gray-700">Ideas:</p>
          <p class="link mr-4 font-medium text-sm">{{ post.idea_count }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ThumbUpIcon as LikedIcon } from "@heroicons/vue/solid";
import {
  ThumbUpIcon as NotLikedIcon,
  DocumentTextIcon,
} from "@heroicons/vue/outline";
import { onMounted, ref } from "vue";

import { TransitionRoot } from "@headlessui/vue";

let liked = ref(false);

let props = defineProps({
  post: Object,
});

let showedLikes = () => props.post.likes + liked.value;

let like = () => {
  liked.value = !liked.value;
};

onMounted(() => {
  console.log(props);
});
</script>
