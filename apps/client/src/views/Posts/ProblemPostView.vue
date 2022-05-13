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
      <div v-if="show" class="lg:col-span-4 h-[120rem] gap-7 flex flex-col">
        <ProblemPost :post="problem" />
        <div class="border border-gray-200 rounded-lg h-full"></div>
      </div>
      <div
        class="sticky hidden lg:block h-min border border-gray-200 col-span-2 rounded-xl p-4"
      >
        <LeaderboardView />
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import LeaderboardView from "@/views/FrontPage/LeaderboardView.vue";
import { TransitionRoot } from "@headlessui/vue";
import { getProblem } from "@/helpers/api/problem.js";
import { useRoute } from "vue-router";
import ProblemPost from "@/components/Posts/ProblemPost.vue";
import { ref } from "vue";
let route = useRoute();

let problem = ref({});
let show = ref(false);

(async () => {
  let res = await getProblem(route.params.id);
  problem.value = res.data.problem;
  show.value = true;
})();
</script>
