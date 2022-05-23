<template>
  <div
    v-if="comment"
    class="border-l-2 border-brand-primary pl-3 flex flex-col mt-3"
  >
    <div class="flex flex-col">
      <div class="flex flex-row gap-1 items-center">
        <p class="link font-medium text-sm">
          {{ comment.created_by.username }}
        </p>
        <p>•</p>
        <p class="font-regular text-sm text-gray-700">
          {{ formatDate(comment.created_at) }}
        </p>
      </div>
      <div>
        <div class="-my-2 prose prose-sm">
          <div v-html="comment.content" />
        </div>
        <div class="flex flex-row text-sm items-center gap-4">
          <div
            class="flex flex-row items-center gap-1 cursor-pointer"
            @click="like"
          >
            <TransitionRoot
              v-if="liked"
              appear
              :show="liked"
              class="self-center"
              enter="transition-all transform duration-500"
              enter-from="opacity-0 scale-0 rotate-[-720deg]"
              enter-to="opacity-100 scale-[110%] rotate-0"
              entered="opacity-100 scale-100"
              leave="transition-all transform duration-500"
              leave-from="opacity-100 scale-100 rotate-0"
              leave-to="opacity-0 scale-0 rotate-[720deg]"
            >
              <LikedIcon class="w-5 h-5 stroke-1 text-brand-secondary" />
            </TransitionRoot>
            <TransitionRoot
              v-else
              appear
              :show="!liked"
              class="self-center"
              enter="transition-all transform duration-500"
              enter-from="opacity-0 scale-0 rotate-[720deg]"
              enter-to="opacity-100 scale-[110%] rotate-0"
              entered="opacity-100 scale-100"
              leave="transition-all transform duration-500"
              leave-from="opacity-100 scale-100 rotate-0"
              leave-to="opacity-0 scale-0 rotate-[-720deg]"
            >
              <NotLikedIcon class="w-5 h-5 stroke-1 text-brand-secondary" />
            </TransitionRoot>
            <p class="select-none text-sm text-brand-dark">
              {{ showedLikes }}
            </p>
          </div>
          <div
            v-if="comment.level == 0"
            class="flex flex-row items-center gap-1 cursor-pointer"
            @click="writingComment = true"
          >
            <ReplyIcon class="w-5 stroke-1 text-brand-secondary" />
            <p class="select-none text-sm text-brand-dark">Reply</p>
          </div>
        </div>
        <div v-if="writingComment" class="flex flex-col gap-2 py-4">
          <Tiptap v-model="content" class="min-h-[1rem]" />
          <div class="flex flex-row gap-2">
            <button class="primary-button" @click="reply">Comment</button>
            <button class="secondary-button" @click="writingComment = false">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="comment.children_objects.length > 0">
      <div class="flex flex-col">
        <div
          v-for="child in comment.children_objects"
          class="flex flex-col gap-4"
        >
          <CommentComponent :comment="child" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ThumbUpIcon as LikedIcon } from "@heroicons/vue/solid";
import { ThumbUpIcon as NotLikedIcon, ReplyIcon } from "@heroicons/vue/outline";
import { TransitionRoot } from "@headlessui/vue";
import { likeComment, postComment } from "@/helpers/api/comment.js";
import Tiptap from "@/components/Tiptap.vue";
import { successToast, errorToast } from "@/helpers/toast.js";

import { ref } from "vue";

const emit = defineEmits(["refresh"]);

let props = defineProps(["comment"]);

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

let liked = ref(props.comment.liked);
let showedLikes = ref(props.comment.like_count);
let writingComment = ref(false);

let content = ref("");

let like = async () => {
  let temp = liked.value;
  liked.value = !liked.value;
  showedLikes.value += liked.value ? 1 : -1;
  let res = await likeComment(props.comment._id, !temp);
};

let reply = async () => {
  try {
    if (!content.value.length > 0) {
      return errorToast("Please enter a comment");
    }
    let res = await postComment({
      content: content.value,
      level: 1,
      parent: props.comment._id,
    });
    content.value = "";
    writingComment.value = false;
    emit("refresh");
    successToast("Comment posted!");
  } catch (error) {
    errorToast("Failed to post comment");
  }
};
</script>
