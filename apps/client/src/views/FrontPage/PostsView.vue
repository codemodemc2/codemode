<template>
  <div
    class="w-full h-10 input-form-style bg-white rounded-lg border border-gray flex flex-row"
  >
    sort by
    <Listbox v-model="selectedPerson">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block truncate">{{ selectedPerson.name }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="person in people"
              :key="person.name"
              :value="person"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ person.name }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
  <div v-if="problems.length > 0">
    <div v-for="problem in problems" class="flex flex-col gap-4">
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
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";

let userStore = useUserStore();

let problems = ref([]);

const people = [
  {
    name: "default",
    id: 1,
  },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];
const selectedPerson = ref(people[0]);

(async () => {
  let res = await getProblems();
  problems.value = res.data.data;
})();

let updateSort = (id) => {
  console.log("Ok");
};

watch(selectedPerson, async (newQuestion, oldQuestion) => {
  updateSort(newQuestion.id);
});
</script>
