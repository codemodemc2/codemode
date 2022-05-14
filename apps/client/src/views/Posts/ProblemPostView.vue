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
        <ProblemPost :post="problem" />
        <div
          class="border border-gray-200 rounded-lg h-full p-5 flex flex-col gap-1"
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
              @click="$router.push({ name: 'newIdea', params: { id: problem._id } })"
            >
              Post an idea
            </button>
          </div>
          <div v-else>
            <p class="text-sm text-gray-600">
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
            <div v-for="idea in problem.ideas">
              {{idea}}
            </div>
          </div>
        </div>
      </div>
      <div class="sticky hidden lg:flex flex-col h-min col-span-2 gap-4">
        <div
          class="border-brand-primary border rounded-xl px-5 py-6 flex flex-col"
        >
          <p class="text-brand-dark text-xl font-semibold text-center">
            Solve this problem and win
          </p>
          <div v-if="problem.prize">
            <p class="text-brand-primary text-2xl font-semibold text-center">
              {{ problem.prize }}
            </p>
            <p class="text-center">+ 100 shop points</p>
          </div>
          <div v-else>
            <p class="text-brand-primary text-2xl font-semibold text-center">
              100 shop points
            </p>
          </div>
        </div>
        <div
          v-if="problem.has_deadline"
          class="border-brand-primary border rounded-xl px-5 py-6 flex flex-col"
        >
          <p class="text-brand-dark text-xl font-semibold text-center">
            Time left
          </p>
          <p class="text-brand-primary text-2xl font-semibold text-center">
            {{ timeLeft }}
          </p>
        </div>
        <div
          class="border-brand-dark border rounded-xl px-5 py-6 flex flex-col"
        >
          <p>empty</p>
        </div>
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { TransitionRoot } from "@headlessui/vue";
import { getProblem } from "@/helpers/api/problem.js";
import { useRoute, useRouter } from "vue-router";
import ProblemPost from "@/components/Posts/ProblemPost.vue";
import { computed, ref } from "vue";
let route = useRoute();
let router = useRouter();

let problem = ref({});
let show = ref(false);

let timeLeft = computed(() => {
  let now = new Date();
  let deadline = new Date(problem.value.deadline);
  let timeDiff = deadline.getTime() - now.getTime();
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
