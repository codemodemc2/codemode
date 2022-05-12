<template>
  <div class="flex h-screen flex-col">
    <div class="sticky top-0 z-50 block w-screen sm:hidden">
      <DashNavBar />
      <hr />
    </div>
    <div class="flex h-full flex-row overflow-y-auto">
      <DashSideBar />
      <div class="w-full overflow-y-auto bg-white">
        <div class="sticky top-0 z-50 bg-white">
          <div
            class="flex h-11 flex-row content-center items-center justify-between"
          >
            <div
              class="text-md mx-5 flex flex-row font-semibold text-sky-500 lg:mx-20"
            >
              {{ $route.meta.title }}
            </div>
            <div
              class="mx-5 flex flex-row items-center justify-center gap-5 lg:mx-10"
            >
              <a
                href="https://status.autocodeai.com"
                rel="noreferrer noopener"
                target="_blank"
              >
                <div class="flex flex-row gap-1 text-green-600">
                  <StatusOnlineIcon
                    class="w-6 stroke-green-600 stroke-1 text-sm"
                    v-tippy="{
                      content: 'Website and API status',
                      theme: 'material',
                      arrow: true,
                    }"
                  ></StatusOnlineIcon>
                </div>
              </a>
              <router-link to="/admin" v-if="getAccountType == 'ADMIN'">
                <LockClosedIcon
                  class="w-6 stroke-sky-900 stroke-1 text-sm text-gray-600"
                  v-tippy="{
                    content: 'Admin Panel',
                    theme: 'material',
                    arrow: true,
                  }"
                ></LockClosedIcon>
              </router-link>
              <Menu as="div" class="relative inline-block">
                <div>
                  <MenuButton
                    class="inline-flex w-full justify-center rounded-full p-2 text-sm font-medium text-white hover:bg-sky-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-8 stroke-sky-900 stroke-1 text-sm text-gray-600"
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
                  </MenuButton>
                </div>

                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <MenuItems
                    class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div class="px-1 py-1">
                      <MenuItem>
                        <div class="ml-5 mt-3 flex flex-col text-xs">
                          <p class="font-medium text-gray-400">
                            {{ getUserData.email }}
                          </p>
                          <router-link to="/account/settings" class="link"
                            >
                            </router-link
                          >
                        </div>
                      </MenuItem>
                    </div>
                    <div class="px-1 py-1">
                      <MenuItem>
                        <div class="ml-5 text-xs">
                          <p class="font-semibold text-gray-700">
                            {{ getUsername }}
                          </p>
                        </div>
                      </MenuItem>
                    </div>
                    <div class="px-1 py-1">
                      <MenuItem v-slot="{ active }">
                        <div
                          class="flex cursor-pointer flex-row items-center gap-2 rounded-lg px-5 py-2 hover:bg-sky-50"
                        >
                          <router-link
                            to="/account/settings"
                            class="flex w-full flex-row justify-between pr-2"
                          >
                            <p class="text-md font-normal">Settings</p>
                          </router-link>
                        </div>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <div
                          class="flex cursor-pointer flex-row items-center gap-2 rounded-lg px-5 py-2 hover:bg-sky-50"
                        >
                          <router-link
                            to="/pricing"
                            class="flex w-full flex-row justify-between pr-2"
                          >
                            <p class="text-md font-normal">Pricing</p>
                          </router-link>
                        </div>
                      </MenuItem>
                    </div>

                    <div class="px-1 py-1">
                      <MenuItem v-slot="{ active }">
                        <div
                          class="flex cursor-pointer flex-row items-center gap-2 rounded-lg px-5 py-2 hover:bg-red-50"
                          @click="lout"
                        >
                          <LogoutIcon class="w-5 stroke-red-500" />
                          <div
                            class="flex w-full flex-row justify-between pr-2"
                          >
                            <p class="text-md font-normal">Logout</p>
                          </div>
                        </div>
                      </MenuItem>
                    </div>
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

<script>
import DashNavBar from "@/components/Dashboard/DashNavBar.vue";
import DashSideBar from "@/components/Dashboard/DashSideBar.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { LogoutIcon } from "@heroicons/vue/solid";
import { LockClosedIcon, StatusOnlineIcon } from "@heroicons/vue/outline";

export default {
  components: {
    DashNavBar,
    DashSideBar,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    LogoutIcon,
    LockClosedIcon,
    StatusOnlineIcon,
  },
  
  
};
</script>

<style></style>