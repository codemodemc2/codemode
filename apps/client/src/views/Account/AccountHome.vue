<template>
  <div class="flex h-screen flex-col">
    <div class="sticky top-0 z-10 block w-screen sm:hidden">
      <AccNavBar />
      <hr />
    </div>
    <div class="flex h-full flex-row overflow-y-auto">
      <AccSideBar />
      <div class="w-full overflow-y-auto bg-white">
        <div class="sticky top-0 z-10 bg-white">
          <div
            class="flex h-11 flex-row content-center items-center justify-between"
          >
            <div
              class="text-md mx-5 flex flex-row font-semibold text-sky-500 lg:mx-20"
            >
              {{ $route.meta.title }}
            </div>
            <div
              class="mx-5 flex flex-row items-center justify-center gap-2 lg:mx-10"
            >
              <router-link :to="{ path: '/' }">
                <ExternalLinkIcon
                  class="w-6 h-6 m-1 text-sky-700"
                ></ExternalLinkIcon>
              </router-link>

              <Menu as="div" class="relative">
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
                    <div class="px-4 py-2">
                      {{ userStore.user_data.username }}
                    </div>
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
                        href="#"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                        >Settings</a
                      >
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a
                        href="#"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                        >Sign out</a
                      >
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <hr />
        </div>
        <div class="h-max overflow-y-auto px-2 py-5 lg:px-20 lg:py-10">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AccNavBar from "@/components/Account/AccNavBar.vue";
import AccSideBar from "@/components/Account/AccSideBar.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { UserIcon, ExternalLinkIcon } from "@heroicons/vue/outline";
import { useUserStore } from "@/stores/user.js";
let userStore = useUserStore();
</script>
