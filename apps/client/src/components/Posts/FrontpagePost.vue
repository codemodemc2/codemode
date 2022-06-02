<template>
  <div
    v-if="post"
    class="w-full h-auto flex flex-row rounded-lg lg:p-5 p-2 py-10 border border-gray-200 bg-white"
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
        class="cursor-pointer"
        @click="like"
      >
        <LikedIcon class="w-7 h-7 stroke-1 mt-2 text-brand-secondary" />
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
        class="cursor-pointer"
        @click="like"
      >
        <NotLikedIcon class="w-7 h-7 stroke-1 mt-2 text-brand-secondary" />
      </TransitionRoot>

      <p class="select-none text-sm text-brand-dark">{{ showedLikes }}</p>
    </div>
    <div class="flex flex-col xl:px-8 lg:px-6 px-2 gap-6 w-full">
      <router-link
        :to="{ path: `/problem/${post._id}` }"
        class="font-semibold 2xl:text-2xl xl:text-xl md:text-lg sm:text-sm text-sm text-gray-800 mb-[-1rem]"
      >
        {{ post.title }}
      </router-link>
      <!--<hr /> -->
      <article
        class="line-clamp-5 prose text-xs xl:prose-lg md:prose-sm sm:prose-xs -mb-4"
      >
        <div v-html="post.summary" />
      </article>
      <hr />
      <div class="flex flex-row gap-2 2xl:text-xl xl:text-lg md:text-md -my-4">
        <p class="text-brand-dark font-bold">Prize:</p>
        <p v-if="post.prize.length > 0" class="link">
          {{ post.prize }}
          <span class="font-normal text-base text-gray-700"
            >+ 100 shop points</span
          >
        </p>
        <p v-else class="link">100 shop points</p>
      </div>
      <hr />
      <div class="flex flex-row items-center justify-between -my-2">
        <div class="flex flex-row items-center">
          <UserCircleIcon
            class="w-8 rounded-full mr-2 stroke-1 text-brand-dark"
          />
          <p class="font-regular text-sm mr-1 text-gray-700">Posted by:</p>
          <p class="link mr-4 font-medium text-sm">
            {{ post.created_by.username }}
          </p>
          <p class="font-regular text-sm mr-1 text-gray-700">
            {{ formatDate(post.created_at) }}
          </p>
          <p
            v-if="post.has_deadline"
            class="font-regular space-x-1 text-sm ml-2"
          >
            <span class="text-brand-dark font-bold">Deadline:</span>

            <span class="text-red-400">{{ timeLeft(post.deadline) }}</span>
          </p>
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
  UserCircleIcon,
} from "@heroicons/vue/outline";
import { ref } from "vue";
import { TransitionRoot } from "@headlessui/vue";
import { likeProblem } from "@/helpers/api/problem.js";

// eslint-disable-next-line no-undef
let props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  post: Object,
});

let liked = ref(props.post.liked);

let showedLikes = ref(props.post.like_count);

let like = async () => {
  let temp = liked.value;
  liked.value = !liked.value;
  showedLikes.value += liked.value ? 1 : -1;
  await likeProblem(props.post._id, !temp);
};

let formatDate = (date) => {
  date = new Date(date);
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor(diff / (1000 * 60 * 60));
  let minutes = Math.floor(diff / (1000 * 60));
  let seconds = Math.floor(diff / 1000);
  if (days > 0) {
    return days + "d ago";
  } else if (hours > 0) {
    return hours + "h ago";
  } else if (minutes > 0) {
    return minutes + "m ago";
  } else if (seconds > 0) {
    return seconds + "s ago";
  } else {
    return "now";
  }
};

let timeLeft = (d) => {
  let now = new Date();
  let deadline = new Date(d);
  let timeDiff = deadline.getTime() - now.getTime();
  if (timeDiff < 0) {
    return "Deadline passed";
  }
  let seconds = Math.floor(timeDiff / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  hours %= 24;
  minutes %= 60;
  seconds %= 60;
  if (seconds > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }
  else {
    return "Expired";
  }
};
</script>
