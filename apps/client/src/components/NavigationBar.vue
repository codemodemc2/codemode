<template>
  <div class="flex flex-row gap-1 my-6 px-5 py-2">
    <p class="mx-[4%]">IdeaStorm</p>
    <div class="border-2 rounded-xl border-gray-800 w-[72%]" style="margin:0 20% 0 0">
      <form class="searchform flex flex-row gap-1 p-1 w-[100%]" action="" >
        <button type="submit"><SearchIcon class="w-7 h-7 border-0 p-1"/></button>
        <input type="text" name="search" style="width:95%;"> 
      </form>
    </div>
    
    <div class="flex flex-row gap-2">
    </div>
  </div>
</template>

<script setup>
import { SearchIcon } from "@heroicons/vue/outline";
const props = defineProps({
  post: Object,
});
</script>