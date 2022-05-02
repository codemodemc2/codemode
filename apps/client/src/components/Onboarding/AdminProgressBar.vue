<template>
  <TransitionRoot
    appear
    :show="true"
    class="flex lg:flex-col flex-row gap-14 relative before:border before:lg:ml-[19px] before:absolute before:lg:h-full before:lg:w-0 before:w-full before:mt-[19px] before:lg:mt-0 min-w-max before:border-brand-light"
    enter="transition-all duration-500"
    enter-from="opacity-0 translate-x-16"
    enter-to="opacity-100 translate-y-0"
    leave="transition-all duration-500"
    leave-from="opacity-100"
    leave-to="opacity-0 -translate-x-96"
  >
    <div v-for="link in links" :key="link.id">
      <router-link :to="link.href" class="flex flex-row gap-3">
        <div
          class="w-10 h-10 z-1 rounded-xl flex justify-center items-center relative transform transition-all duration-500"
          :class="{
            'bg-brand-primary': adminOnboardingStore.steps[link.id].finished,
            'after:absolute after:border after:border-brand-primary after:lg:-bottom-14 after:lg:left-5 after:-right-14 after:lg:h-14 after:lg:w-0 after:w-14':
              adminOnboardingStore.steps[link.id].finished &&
              link.id < links.length
			  && link.id < adminOnboardingStore.currentStep,
            'border-brand-primary border-2 bg-white':
              link.id == adminOnboardingStore.currentStep &&
              !adminOnboardingStore.steps[link.id].finished,
            'bg-brand-light':
              !adminOnboardingStore.steps[link.id].finished &&
              link.id != adminOnboardingStore.currentStep,
          }"
        >
          <TransitionChild
            v-if="adminOnboardingStore.steps[link.id].finished"
            appear
            :show="link.id < adminOnboardingStore.currentStep"
            enter="transition-all transform duration-500"
            enter-from="opacity-0 scale-0 rotate-[720deg]"
            enter-to="opacity-100 scale-1 rotate-0"
          >
            <CheckIcon class="w-5 h-5 text-brand-light" />
          </TransitionChild>

          <p
            v-if="!adminOnboardingStore.steps[link.id].finished"
            class="font-medium z-20 text-brand-dark"
          >
            {{ link.id }}
          </p>
        </div>
        <div class="lg:flex hidden flex-col -space-y-1.5">
          <p class="text-brand-dark font-medium">{{ link.name }}</p>
          <p class="text-sm text-gray-400 font-light">{{ link.description }}</p>
        </div>
      </router-link>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { ref } from "vue";
import { CheckIcon } from "@heroicons/vue/solid";
import { useAdminOnboardingStore } from "@/stores/admin_onboarding.js";
import { TransitionRoot, TransitionChild } from "@headlessui/vue";

const adminOnboardingStore = useAdminOnboardingStore();

let links = ref([
  {
    name: "Your details",
    description: "Name & Email",
    href: "/register/user",
    id: 1,
  },
  {
    name: "Password",
    description: "Secure password for your admin account",
    href: "/register/password",
    id: 2,
  },
  {
    name: "Company details",
    description: "Enter your company details",
    href: "/register/company",
    id: 3,
  },
  {
    name: "Invite your team",
    description: "Send email invitations to your team members",
    href: "/register/invite",
    id: 4,
  },
]);
</script>
