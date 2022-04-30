<template>
  <Transition name="slide-fade">
    <div
      v-if="show"
      class="flex flex-col gap-14 relative before:border before:ml-5 before:absolute before:h-full min-w-max before:border-brand-light"
    >
      <div v-for="link in links" :key="link.id" class="flex flex-row gap-3">
        <div
          class="w-10 h-10 z-10 bg-brand-light rounded-xl flex justify-center items-center relative"
          :class="{
            'bg-brand-primary after:absolute after:border after:border-brand-primary after:-bottom-16 after:h-16 after:z-50':
              link.id == 1,
            'border-brand-primary border-2 bg-white': link.id === 2,
            
          }"
        >
          <p
            v-if="link.id !== 1"
            class="font-medium z-20 text-brand-dark"
            :class="{ 'text-brand-light': link.id === 1 }"
          >
            {{ link.id }}
          </p>
          <CheckIcon v-else class="w-5 h-5 text-brand-light"/>
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

let show = ref(false);
onMounted(() => (show.value = true));

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
