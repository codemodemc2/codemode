<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Disclosure v-slot="{ open }" as="nav" class="bg-white">
    <div class="max-w-full xl mx-auto px-2 sm:px-6 lg:px-16 z-50">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <router-link
            :to="{ path: '/' }"
            class="flex-shrink-0 flex items-center"
          >
            <div class="flex flex-row items-center justify-center text-xl">
              <p
                class="bg-gradient-to-r from-brand-primary to-brand-dark bg-clip-text font-extrabold text-transparent"
              >
                Idea
              </p>
              <p class="font-bold text-gray-800">Storm</p>
            </div>
          </router-link>
          <div
            class="hidden sm:flex self-center w-full sm:ml-6 md:px-[10%] xl:px-[20%]"
          >
            <div
              class="border-brand-primary w-full border h-10 rounded-lg flex flex-row items-center px-4 gap-4 focus-within:border-sky-900"
            >
              <SearchIcon class="text-brand-secondary h-5" />
              <input
                type="text"
                class="w-full h-full outline-none"
                placeholder="Search for problems and ideas"
              />
              <p
                class="hover:underline text-brand-secondary font-medium text-md hover:cursor-pointer"
              >
                Search
              </p>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <button
            v-if="userStore.user_data.is_admin"
            class="primary-button flex flex-row gap-2 items-center justify-center text-sm"
            @click="$router.push({ path: '/new-problem' })"
          >
            New problem
            <PencilIcon class="w-5 h-5 text-white link" />
          </button>
          <!-- Notification dropdown -->
          <Menu as="div" class="ml-3 relative">
            <div>
              <MenuButton
                class="bg-white border-sky-500 z-50 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span class="sr-only">Open user menu</span>
                <BellIcon
                  class="h-6 w-6 m-1 text-brand-secondary"
                  aria-hidden="true"
                />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="origin-top-right z-50 absolute flex flex-col right-0 mt-2 w-96 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="px-4 py-2 flex flex-row justify-between">
                  <p class="font-bold text-gray-700">Notifications</p>

                  <p class="link hover:underline text-sm">Mark all as read</p>
                </div>
                <MenuItem v-slot="{ active }">
                  <div
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'flex flex-row justify-between items-center text-sm text-gray-700 z-50',
                    ]"
                  >
                    <div
                      class="flex flex-row px-4 py-3 gap-2 text-sm text-gray-700"
                    >
                      <div
                        class="w-2 h-2 mt-[7px] min-w-max bg-brand-primary rounded-full self-start"
                      ></div>
                      <p class="font-medium text-gray-700 w-fit">
                        Please verify your email address!
                      </p>
                    </div>
                    <div class="mt-1 min-w-max rounded-full self-center mx-3">
                      <XIcon class="w-4 h-4" />
                    </div>
                  </div>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <div
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'flex flex-row justify-between items-center text-sm text-gray-700',
                    ]"
                  >
                    <div
                      class="flex flex-row px-4 py-3 gap-2 text-sm text-gray-700"
                    >
                      <div
                        class="w-2 h-2 mt-[7px] min-w-max bg-brand-primary rounded-full self-start"
                      ></div>
                      <p class="font-medium text-gray-700 w-fit">
                        <span class="font-bold">@lovro.rogina</span> mentioned
                        you in a post!
                      </p>
                    </div>
                    <div class="mt-1 min-w-max rounded-full self-center mx-3">
                      <XIcon class="w-4 h-4" />
                    </div>
                  </div>
                </MenuItem>
                <hr />
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'underline' : '',
                      'block px-4 py-2 link text-sm',
                    ]"
                    >See all notification</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>

          <Menu as="div" class="ml-3 relative">
            <div>
              <MenuButton
                class="bg-white border-sky-500 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span class="sr-only">Open user menu</span>
                <UserIcon class="w-6 h-6 m-1 text-sky-700"></UserIcon>
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="px-4 py-2">{{ userStore.user_data.username }}</div>
                <MenuItem v-slot="{ active }">
                  <router-link
                    :to="{ path: '/dashboard' }"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Dashboard</router-link
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Your Profile</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="/account"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Settings</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    @click="lout()"
                    >Sign out</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <div
          class="hidden sm:flex self-center w-full sm:ml-6 md:px-[10%] xl:px-[20%]"
        >
          <div
            class="border-brand-primary w-full border h-10 rounded-lg flex flex-row items-center px-4 gap-4 focus-within:border-sky-900"
          >
            <SearchIcon class="text-brand-secondary h-5" />
            <input
              type="text"
              class="w-full h-full outline-none"
              placeholder="Search for problems and ideas"
            />
            <p
              class="hover:underline text-brand-secondary font-medium text-md hover:cursor-pointer"
            >
              Search
            </p>
          </div>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
  <hr />
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import {
  BellIcon,
  MenuIcon,
  XIcon,
  UserIcon,
  PencilIcon,
} from "@heroicons/vue/outline";
import { SearchIcon } from "@heroicons/vue/solid";
import { useUserStore } from "@/stores/user.js";

let userStore = useUserStore();

import { useRouter } from "vue-router";

let router = useRouter();

let lout = () => {
  userStore.logout();
  router.push("/login");
};

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];
</script>
