<template>
  <div class="flex w-full h-full justify-center py-5 min-w-4xl">
    <div class="flex flex-col gap-4">
      <div class="rounded-2xl shadow-md">
        <div
          class="bg-white w-full h-min rounded-t-2xl p-10 border border-b-0 border-gray-200 flex flex-row gap-5"
        >
          <div
            class="rounded-full h-20 w-20 border flex justify-center items-center border-brand-dark"
          >
            <UserIcon
              v-if="!user.profile_image"
              class="h-14 stroke-[0.4] fill-gray-200 stroke-brand-dark"
            />
            <img v-else :src="user.profile_image" class="rounded-full h-20" />
          </div>
          <div class="flex flex-col">
            <div class="flex flex-row gap-2 items-center">
              <p class="font-semibold text-xl">
                {{ user.first_name }} {{ user.last_name }}
              </p>
              <p class="text-lg text-brand-dark">({{ user.username }})</p>
            </div>
            <div class="flex flex-row gap-2">
              <p class="space-x-1">
                <span class="font-semibold text-brand-dark">
                  {{ user.likes }}
                </span>
                <span>pts.</span>
              </p>
              •
              <p class="space-x-1">
                <span class="font-semibold text-brand-dark">
                  {{ user.post_count }}
                </span>
                <span>ideas</span>
              </p>
              •
              <p class="space-x-1">
                <span class="font-semibold text-brand-dark">
                  {{ user.comment_count }}
                </span>
                <span>comments</span>
              </p>
            </div>
          </div>
        </div>
        <div
          class="bg-brand-light border border-t-0 border-gray-200 h-14 rounded-b-2xl flex items-center px-10 justify-between"
        >
          <div class="flex flex-row gap-2">
            <img src="/images/b-d-1.png" class="h-10" />
            <img src="/images/b-g-1.png" class="h-10" />
            <img src="/images/b-p-1.png" class="h-10" />
            <img src="/images/b-s-1.png" class="h-10" />
          </div>
          <p class="text-brand-dark font-medium text-base underline">
            See all achievements ->
          </p>
        </div>
      </div>
      <div class="mx-auto w-full flex flex-row gap-10 items-center">
        <TabGroup class="flex flex-col gap-5" as="div">
          <TabList class="flex flex-row font-medium text-brand-dark">
            <Tab v-slot="{ selected }" as="div" class="outline-none">
              <div
                class="border rounded-l-lg py-2 px-5 cursor-pointer w-max text-center outline-none"
                :class="[
                  selected
                    ? 'bg-brand-dark text-brand-extralight'
                    : 'bg-white text-brand-dark',
                ]"
              >
                <p>Ideas</p>
              </div>
            </Tab>
            <Tab v-slot="{ selected }" as="div" class="outline-none">
              <div
                class="border rounded-r-lg py-2 px-5 cursor-pointer w-max text-center outline-none"
                :class="[
                  selected
                    ? 'bg-brand-dark text-brand-extralight'
                    : 'bg-white text-brand-dark',
                ]"
              >
                <p>Comments</p>
              </div>
            </Tab>
          </TabList>
          <TabPanels
            class="bg-white max-w-4xl w-screen rounded-2xl border border-gray-200"
          >
            <TabPanel as="div"><UserIdeasView :id="id" /></TabPanel>
            <TabPanel as="div"><UserCommentsView :id="id" /></TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getUser } from "@/helpers/api/user";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { UserIcon } from "@heroicons/vue/outline";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import UserIdeasView from "@/views/Profiles/UserIdeasView.vue";
import UserCommentsView from "@/views/Profiles/UserCommentsView.vue";

let route = useRoute();
let user = ref({});
let id = route.params.id;

(async () => {
  let res = await getUser(id);
  user.value = res.data.user;
})();
</script>
