<template>
  <div
    class="font-inter hidden h-screen w-72 flex-col justify-between overflow-hidden overflow-y-auto border-r border-gray-200 bg-white sm:flex"
  >
    <div class="flex flex-col gap-2">
      <div class="mt-2">
        <router-link to="/dashboard" class="cursor-pointer select-none">
          <div class="flex flex-row items-center justify-center text-xl">
            <p
              class="bg-gradient-to-r from-brand-primary to-brand-dark bg-clip-text font-extrabold text-transparent"
            >
              Idea
            </p>
            <p class="font-bold text-gray-800">Storm</p>
          </div>
          <hr class="mt-2" />
        </router-link>
      </div>

      <div class="flex flex-col gap-[3px]">
        <router-link
          v-for="link in navigation[0]"
          :to="link.href"
          class="mx-2 flex flex-row items-center gap-2 rounded-lg px-1 py-3 pl-4 hover:bg-gray-100"
          :class="{ 'bg-sky-100 font-medium': link.href === $route.path }"
        >
          <component
            :is="link.icon"
            class="w-6 text-sm"
            :class="[
              link.href === $route.path ? 'text-sky-900' : 'text-sky-600',
            ]"
          ></component>
          <div class="flex w-full flex-row justify-between pr-2">
            <p
              class="text-md font-normal"
              :class="[
                link.href === $route.path ? 'text-sky-900' : 'text-gray-700',
              ]"
            >
              {{ link.name }}
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {
  LightBulbIcon,
  HomeIcon,
  CogIcon,
  UserCircleIcon,
  UserIcon,
  LogoutIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/vue/outline";
const navigation = [
  [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon,
    },
    {
      name: "Users",
      href: "/dashboard/users",
      icon: UserIcon,
    },
    {
      name: "Problems",
      href: "/dashboard/problems",
      icon: QuestionMarkCircleIcon,
    },
    {
      name: "Ideas",
      href: "/dashboard/ideas",
      icon: LightBulbIcon,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: CogIcon,
    },
  ],
];
export default {
  components: {
    CogIcon,
    UserCircleIcon,
    LogoutIcon,
  },
  data() {
    return {
      navigation,
    };
  },
};
</script>

<style></style>
