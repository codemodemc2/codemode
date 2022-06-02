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
              class="h-14 stroke-[0.4] fill-gray-200 stroke-brand-dark"
            />
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
          class="bg-brand-dark border border-t-0 border-gray-200 h-10 rounded-b-2xl flex items-center px-10 justify-end"
        >
          <p class="text-brand-extralight font-medium text-sm underline">
            See all achievements ->
          </p>
        </div>
      </div>
      <div class="mx-auto w-full flex flex-row gap-10 items-center">
        <TabGroup class="rounded-lg shadow-md" @change="changeTab">
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
        </TabGroup>
      </div>
      <div class="bg-white max-w-4xl w-screen rounded-2xl p-10 border border-gray-200">
				<router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getUser } from "@/helpers/api/user";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { UserIcon } from "@heroicons/vue/outline";
import { TabGroup, TabList, Tab } from "@headlessui/vue";

let route = useRoute();
let router = useRouter();
let user = ref({});
let id = route.params.id;

let changeTab = (index) => {
  if (index == 0) {
    router.push({
      name: "userIdeas",
      params: {
        id: id,
      },
    });
  } else {
    router.push({
      name: "userComments",
      params: {
        id: id,
      },
    });
  }
};

(async () => {
  let res = await getUser(id);
  user.value = res.data.user;
})();
</script>
