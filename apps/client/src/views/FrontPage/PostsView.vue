<template>
  <div
    class="w-full h-max min-h-[3rem] input-form-style bg-white rounded-lg border border-gray flex flex-row"
  >
    <div class="mx-auto w-full flex flex-row gap-10 px-10 items-center">
      <p class="uppercase text-brand-dark font-bold text-sm">sort by:</p>
      <RadioGroup v-model="selected">
        <div class="flex flex-row gap-2">
          <RadioGroupOption
            v-for="plan in plans"
            :key="plan.name"
            v-slot="{ active, checked }"
            as="template"
            :value="plan"
          >
            <div
              :class="[
                active
                  ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-brand-light'
                  : '',
                checked
                  ? 'bg-brand-dark bg-opacity-75 text-white'
                  : 'bg-white ',
              ]"
              class="relative flex cursor-pointer rounded-lg focus:outline-none"
            >
              <RadioGroupLabel
                as="p"
                :class="checked ? 'text-white' : 'text-gray-900'"
                class="font-medium py-1 px-2"
              >
                {{ plan.name }}
              </RadioGroupLabel>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
    </div>
  </div>
  <div v-if="problems.length > 0" class="flex flex-col gap-6">
    <div v-for="problem in problems" :key="problem._id">
      <FrontpagePostVue :post="problem" />
    </div>
  </div>
  <div
    v-else
    class="w-full bg-white rounded-lg border border-gray-200 flex flex-col justify-center items-center h-1/2 gap-4"
  >
    <p class="text-brand-dark text-2xl font-bold">No problems posted yet</p>
    <p>
      <button
        v-if="userStore.user_data.is_admin"
        class="primary-button flex flex-row gap-2 items-center justify-center"
        @click="$router.push({ path: '/new-problem' })"
      >
        New problem
        <PencilIcon class="w-5 h-5 text-white link" />
      </button>
    </p>
  </div>
</template>

<script setup>
import FrontpagePostVue from "@/components/Posts/FrontpagePost.vue";
import { ref, watch } from "vue";
import { getProblems } from "@/helpers/api/problem.js";
import { PencilIcon } from "@heroicons/vue/outline";
import { useUserStore } from "@/stores/user.js";
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";

let userStore = useUserStore();

let problems = ref([]);

const plans = [
  {
    name: "Newest",
    id: 1,
  },
  {
    name: "Likes",
    id: 2,
  },
  {
    name: "Deadline",
    id: 3,
  },
];

const selected = ref(plans[0]);
(async () => {
  let res = await getProblems();
  problems.value = res.data.data;
})();

let updateSort = (id) => {
  if (id == 1) {
    // sort problems by newest by created_at field
    problems.value.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
  } else if (id == 2) {
    problems.value.sort((a, b) => {
      return b.like_count - a.like_count;
    });
  } else if (id == 3) {
    problems.value.sort((a, b) => {
      return new Date(b.deadline) - new Date(a.deadline);
    });
  }
};

watch(selected, async (newQuestion, oldQuestion) => {
  updateSort(newQuestion.id);
});
</script>
