<template>
  <div class="flex flex-col gap-10">
    <div class="flex flex-col">
      <p class="text-lg font-semibold text-sky-900">Manage website</p>
      <p class="text-gray-400 text font-base text-sm">
        Edit general website settings, team settings, colors etc.
      </p>
    </div>
    <div class="flex border-b border-brand-primary gap-5">
      <router-link
        v-for="item in navigation"
        :key="item.name"
        :to="{ name: item.href }"
        :class="[
          item.href == $route.name
            ? 'font-bold underline decoration-brand-dark decoration-[3px] underline-offset-[1rem]'
            : '',
        ]"
        class="rounded-md text-gray-800 decoration-2 pb-3.5 underline-offset-8 opacity-80 text-base"
        :aria-current="item.href == $route.name ? 'page' : undefined"
      >
        {{ item.name }}
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
const navigation = [
  { name: "General", href: "DashboardSettingsGeneralView" },
  { name: "Website theme", href: "DashboardSettingsColorsView" },
  { name: "Team", href: "" },
  { name: "Shop", href: "" },
  { name: "Rewards", href: "" },
  { name: "Integrations", href: "" },
];
</script>
