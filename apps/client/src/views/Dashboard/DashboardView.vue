<template>
  <div class="flex flex-col gap-10 p-5 lg:p-0">
    <div class="flex flex-col gap-5">
      <div>
        <p class="text-lg font-semibold text-sky-900">Dashboard</p>
      </div>
      <hr />
      <div class="flex flex-row flex-wrap gap-14">
        <router-link
          v-for="product in products"
          :key="product.name"
          :to="product.href"
          class="flex h-auto w-full flex-col gap-5 rounded-xl lg:w-72"
        >
          <div
            class="flex h-28 w-full flex-row items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-sky-200 to-sky-500 shadow-sky-500"
          >
            <component :is="product.icon" class="h-8 w-8 stroke-sky-900" />
            <p class="text-2xl font-medium text-sky-50">
              {{ product.name }}
            </p>
          </div>
          <div class="relative flex h-max flex-col gap-1">
            <div class="flex w-full flex-row justify-between">
              <div
                class="w-min whitespace-nowrap text-sm font-semibold text-sky-900 underline"
              >
                {{ product.name }} ->
              </div>
            </div>

            <p class="text-lg font-medium text-sky-500">
              {{ product.pitch }}
            </p>
            <p class="text-sm text-gray-400">{{ product.description }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {
  LightBulbIcon,
  UserGroupIcon,
  QuestionMarkCircleIcon,
  CogIcon,
} from "@heroicons/vue/outline";
const products = [
  {
    name: "Users",
    pitch: "Manage users",
    description:
      "View and manage your employes. Invite new users, and manage their permissions.",
    icon: UserGroupIcon,
    href: "/dashboard/users",
  },
  {
    name: "Problems",
    pitch: "Manage problems",
    description:
      "See the problems you posted, edit them, add new rewards and more.",
    icon: QuestionMarkCircleIcon,
    standard: true,
    href: "/dashboard/problems",
  },
  {
    name: "Ideas",
    pitch: "See the ideas your employes posted",
    description:
      "See and manage ideas from your employes, award the best ones.",
    icon: LightBulbIcon,
    pro: true,
    href: "/dashboard/ideas",
  },
  {
    name: "Settings",
    pitch: "General website settings",
    description:
      "Configure the website to match your company's image and needs.",
    icon: CogIcon,
    href: "/dashboard/settings",
  },
];
export default {
  data() {
    return {
      products,
    };
  },
};
</script>
