<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <!-- filter backdrop-blur-[9px] -->
  <Disclosure
    as="nav"
    class="transform-gpu bg-white filter lg:bg-transparent"
    v-slot="{ open }"
  >
    <div class="mx-auto w-full px-6 lg:px-10">
      <div class="relative flex h-12 items-center justify-between md:h-20">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between"
        >
          <!-- bg-white sm:bg-gray-50-->
          <router-link
            to="/"
            class="relative flex flex-shrink-0 items-center px-3"
          >
            <div class="z-10 flex flex-row items-center gap-2">
              <div
                class="flex flex-row items-center justify-center text-lg lg:text-2xl"
              >
                <p
                  class="bg-gradient-to-r from-sky-500 to-sky-900 bg-clip-text font-extrabold text-transparent"
                >
                  Idea
                </p>
                <p class="font-bold text-gray-800">Storm</p>
              </div>
            </div>
            <!-- <div class="absolute right-0 z-0 h-full w-full rounded-lg bg-gray-50 opacity-70"/> -->
          </router-link>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  item.href === $route.path
                    ? 'font-bold underline decoration-sky-500 decoration-2 underline-offset-8'
                    : '',
                ]"
                class="transform rounded-md px-3 py-2 text-sky-800 decoration-2 underline-offset-8 opacity-80 transition-all duration-150 hover:-translate-y-[2px] hover:underline active:underline-offset-4 sm:text-base lg:text-lg"
                :aria-current="item.href === $route.path ? 'page' : undefined"
                >{{ item.name }}</a
              >
            </div>
          </div>
        </div>
        <div
          class="static inset-auto inset-y-0 right-0 ml-4 hidden pr-2 sm:block"
        >
          <div class="flex items-center gap-4">
            <!-- <button
              class="secondary-button text-lg"
              @click="$router.push({ name: 'Login' })"
            >
              Log In
            </button> -->
            <button
              @click="$router.push({ name: 'login' })"
              class="transform rounded-md px-3 py-2 text-sky-800 decoration-2 underline-offset-8 opacity-80 transition-all duration-150 hover:-translate-y-[2px] hover:underline active:underline-offset-4 sm:text-base lg:text-lg"
            >
              Log In
            </button>

            <button
              class="primary-button text-lg"
              @click="$router.push({ name: 'register' })"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-sky-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</DisclosureButton
        >
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/vue/outline";
const navigation = [
  { name: "Sign Up", href: "/register" },
  { name: "Log In", href: "/login" },
  { name: "Support", href: "/support" },
];
export default {
  data() {
    return {};
  },
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
  },
  setup() {
    return {
      navigation,
    };
  },
};
</script>
