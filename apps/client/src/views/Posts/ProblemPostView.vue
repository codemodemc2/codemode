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
      <div v-if="show" class="lg:col-span-4 gap-7 flex flex-col pb-20">
        <ProblemPost :post="problem" class="bg-white" />
        <div
          class="border border-gray-200 rounded-lg p-5 flex flex-col gap-1 h-min bg-white"
        >
          <div
            v-if="problem.idea_count < 1"
            class="flex flex-col justify-center items-center py-5"
          >
            <p class="text-center text-xl text-brand-dark font-semibold">
              There are no ideas for this problem yet.
            </p>
            <p class="text-center text-xl text-brand-dark font-semibold">
              Be the first one to post an idea!
            </p>
            <button
              class="primary-button my-4"
              @click="
                $router.push({ name: 'newIdea', params: { id: problem._id } })
              "
            >
              Post an idea
            </button>
          </div>
          <div v-else>
            <p class="text-sm text-gray-600 pb-1">
              Ideas ({{ problem.idea_count }})
            </p>
            <router-link
              :to="{ name: 'newIdea', params: { id: problem._id } }"
              class="relative col-span-2 w-full"
            >
              <input
                placeholder="Post your idea"
                class="form-input-style cursor-pointer"
                disabled
              />
            </router-link>
            <div class="flex flex-col gap-2 pt-4">
              <div v-for="idea in problem.ideas" :key="idea._id">
                <IdeaListing :idea="idea" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sticky hidden lg:flex flex-col h-min col-span-2 gap-4">
        <div
          class="rounded-xl flex flex-col bg-gradient-to-tl from-yellow-200 to-yellow-300 border border-yellow-300 shadow shadow-yellow-300"
        >
          <div
            class="bg-transparent rounded-t-xl flex flex-col items-center text-center justify-center py-5"
          >
            <p class="text-xl font-medium text-yellow-900">
              Solve this problem and win:
            </p>
            <p class="text-2xl font-bold text-yellow-900">
              {{ problem.prize }}
            </p>
          </div>
          <img
            :src="problem.prize_image"
            class="object-cover aspect-[3/1] w-full rounded-xl"
          />
        </div>
        <div
          v-if="problem.has_deadline"
          class="border-brand-primary border rounded-xl px-5 py-6 flex flex-col bg-white"
        >
          <p class="text-brand-dark text-xl font-semibold text-center">
            Time left
          </p>
          <p class="text-brand-primary text-2xl font-semibold text-center">
            {{ timeLeft }}
          </p>
        </div>
        <div
          class="border-brand-primary border rounded-xl px-5 py-6 flex flex-col bg-white"
        >
          <ProblemLeaderboard :id="$route.params.id" />
        </div>
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { TransitionRoot } from "@headlessui/vue";
import { getProblem, getTopIdeas } from "@/helpers/api/problem.js";
import { useRoute, useRouter } from "vue-router";
import ProblemPost from "@/components/Posts/ProblemPost.vue";
import { computed, ref } from "vue";
import IdeaListing from "@/components/Posts/IdeaListing.vue";
import ProblemLeaderboard from "@/components/Posts/ProblemLeaderboard.vue";

let route = useRoute();
let router = useRouter();

let problem = ref({});
let show = ref(false);

let timeLeft = computed(() => {
  let now = new Date();
  let deadline = new Date(problem.value.deadline);
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
  return `${days}d ${hours}h ${minutes}m`;
});

(async () => {
  try {
    let res = await getProblem(route.params.id);
    problem.value = res.data.problem;
    show.value = true;
  } catch (error) {
    if (error.response.status === 404) {
      router.push({
        name: "Error",
        params: {
          error_code: error.response.status,
          error_message: error.response.data.message,
        },
      });
    }
  }
})();
</script>
