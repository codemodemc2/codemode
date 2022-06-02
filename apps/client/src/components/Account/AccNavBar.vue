<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Disclosure v-slot="{ open }" as="nav" class="bg-white">
    <div class="px-2 sm:px-6">
      <div class="relative flex h-12 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            id="closeOpenButton"
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-sky-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex flex-shrink-0 items-center">
            <router-link to="/">
              <div class="flex flex-row items-center gap-2 xl:hidden">
                <div class="flex flex-row items-center justify-center text-xl">
                  <p
                    class="bg-gradient-to-r from-sky-500 to-sky-900 bg-clip-text font-extrabold text-transparent"
                  >
                    AutoCode
                  </p>
                  <p class="font-bold text-gray-800">AI</p>
                </div>
              </div>
            </router-link>
            <router-link to="/">
              <div class="hidden flex-row items-center gap-2 xl:flex">
                <div class="flex flex-row items-center justify-center text-xl">
                  <p
                    class="bg-gradient-to-r from-sky-500 to-sky-900 bg-clip-text font-extrabold text-transparent"
                  >
                    AutoCode
                  </p>
                  <p class="font-bold text-gray-800">AI</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <!-- user acc -->
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <router-link
          v-for="link in navigation[0]"
          :key="link.href"
          :to="link.href"
          class="mx-2 flex flex-row items-center gap-2 rounded-lg px-1 py-3 pl-4 hover:bg-gray-100"
          :class="{ 'bg-sky-100 font-medium': link.href === $route.path }"
          @click="doClose(close)"
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
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

import {
  CogIcon,
  LockClosedIcon,
  MenuIcon,
  XIcon,
  HomeIcon,
} from "@heroicons/vue/outline";

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

const doClose = () => {
  document.getElementById("closeOpenButton").click();
};
</script>
