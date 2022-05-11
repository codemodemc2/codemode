<template>
  <TransitionRoot
    appear
    :show="true"
    enter="transition-all duration-500"
    enter-from="opacity-0 translate-x-[100%]"
    enter-to="opacity-100 translate-y-0"
    leave="transition-all duration-500"
    leave-from="opacity-100"
    leave-to="opacity-0 -translate-x-96"
    class="overflow-y-auto justify-center flex"
  >
    <div
      class="grid grid-flow-col lg:grid-cols-6 py-10 grid-cols-1 gap-7 h-screen justify-center snap-parent xl:w-[60%] lg:w-[70%] md:w-[80%] sm:w-[90%] xs:w-[100%]"
    >
      <div class="lg:col-span-4 h-[120rem] gap-7 flex flex-col">
        <PostsView />
      </div>
      <div
        class="sticky hidden lg:block h-48 border border-gray-200 col-span-2 rounded-xl p-4"
      >
        leaderboard
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import PostsView from "./PostsView.vue";
import { TransitionRoot } from "@headlessui/vue";
</script>
