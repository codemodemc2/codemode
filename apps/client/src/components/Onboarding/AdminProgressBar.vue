<template>
  <Transition name="slide-fade">
    <div
      v-if="show"
      class="flex flex-col gap-14 relative before:border before:ml-[19px] before:absolute before:h-full min-w-max before:border-brand-light"
    >
      <div v-for="link in links" :key="link.id" class="flex flex-row gap-3">
        <div
          class="w-10 h-10 z-1 rounded-xl flex justify-center items-center relative transform transition-all duration-200"
          :class="{
            'bg-brand-primary': link.id < adminOnboardingStore.currentStep,
            'after:absolute after:border after:border-brand-primary after:-bottom-14 after:h-16': link.id < adminOnboardingStore.currentStep && link.id < links.length,
            'border-brand-primary border-2 bg-white':
              link.id == adminOnboardingStore.currentStep,
            'bg-brand-light': link.id > adminOnboardingStore.currentStep,
          }"
        >
          <CheckIcon
            v-if="link.id < adminOnboardingStore.currentStep"
            class="w-5 h-5 text-brand-light"
          />

          <p v-else class="font-medium z-20 text-brand-dark">
            {{ link.id }}
          </p>
        </div>
        <div class="flex flex-col -space-y-1.5">
          <p class="text-brand-dark font-medium">{{ link.name }}</p>
          <p class="text-sm text-gray-400 font-light">{{ link.description }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { CheckIcon } from "@heroicons/vue/solid";
import { useAdminOnboardingStore } from "@/stores/admin_onboarding.js";

const adminOnboardingStore = useAdminOnboardingStore();

let show = ref(false);

let links = ref([
  {
    name: "Your details",
    description: "Name & Email",
    href: "/register",
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
    href: "/register/team",
    id: 4,
  },
]);

onMounted(() => (show.value = true));
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.8s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
