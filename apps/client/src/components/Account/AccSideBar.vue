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

      <div>
        <router-link
          v-for="link in navigation[0]"
          :key="link.href"
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
      <hr />
      <div class="flex flex-col gap-1">
        <router-link
          to="/dashboard"
          class="mx-2 flex flex-row items-center gap-2 rounded-lg bg-gray-100 px-1 py-3 pl-4 hover:bg-sky-100"
        >
          <HomeIcon class="w-6 text-sm text-sky-900"></HomeIcon>
          <div class="flex w-full flex-row justify-between pr-2">
            <p class="text-md font-normal">Dashboard</p>
          </div>
        </router-link>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <!-- <div class="flex flex-col gap-1">
        <router-link
          v-for="link in navigation[2]"
          :to="link.href"
          class="
            flex flex-row
            mx-2
            px-1
            py-3
            pl-4
            items-center
            gap-2
            rounded-lg
            bg-gray-100
            hover:bg-sky-100
          "
        >
          <component
            :is="link.icon"
            class="text-sm w-6"
            :class="[
              link.href === $route.path ? 'text-sky-900' : 'text-sky-600',
            ]"
          ></component>
          <div class="flex flex-row justify-between w-full pr-2">
            <p
              class="font-normal text-md"
              :class="[
                link.href === $route.path ? 'text-sky-900' : 'text-gray-700',
              ]"
            >
              {{ link.name }}
            </p>
          </div>
        </router-link>
      </div> -->
      <!-- <hr />

      <div
        class="
          cursor-pointer
          flex flex-row
          mx-2
          px-1
          py-3
          pl-4
          items-center
          gap-2
          rounded-lg
          hover:bg-red-50
        "
        @click="lout"
      >
        <LogoutIcon class="stroke-red-500 w-5" />
        <div class="flex flex-row justify-between w-full pr-2">
          <p class="font-normal text-md">Logout</p>
        </div>
      </div>

      <hr />
      <div class="flex flex-row items-center gap-2 px-4 pt-2 pb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="text-sm text-gray-600 w-8 stroke-sky-900 stroke-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div class="flex flex-col text-xs">
          <p class="font-medium text-gray-400">
            {{ $store.getters["user/getUserData"].email }}
          </p>
          <router-link to="/account/settings" class="link"
            >{{ $store.getters["user/getAccountType"] }} account</router-link
          >
        </div>
      </div> -->

      <p class="p-2 text-center text-xs text-gray-400">
        © IdeaStorm {{ year() }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { CogIcon, HomeIcon, LockClosedIcon } from "@heroicons/vue/outline";

const navigation = [
  [
    {
      name: "Settings",
      href: "/account/settings",
      icon: CogIcon,
    },

    {
      name: "Security",
      href: "/account/security",
      icon: LockClosedIcon,
    },
  ],
];

let year = () => new Date().getFullYear();
</script>

<style></style>
