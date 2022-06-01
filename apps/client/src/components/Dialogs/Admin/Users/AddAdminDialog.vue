<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full relative max-w-2xl transform overflow-hidden rounded-2xl bg-white py-6 px-12 text-left align-middle shadow-xl transition-all"
            >
              <div
                v-if="loading"
                class="absolute top-0 left-0 z-10 w-full h-full bg-black bg-opacity-40 flex flex-col gap-1 justify-center items-center"
              >
                <RefreshIcon
                  class="w-10 h-10 rotate-180 animate-spin self-center text-white"
                />
                <p class="text-xl text-white">Inviting admins</p>
              </div>
              <DialogTitle as="div" class="flex flex-col leading-6">
                <p class="text-lg font-medium text-gray-900">Invite admins</p>
                <p class="text-sm text-gray-500">
                  Invite other admins to the team.
                </p>
              </DialogTitle>
              <hr class="mt-2" />
              <div class="my-4 flex flex-col max-h-60 overflow-y-auto">
                <div class="relative my-2">
                  <p
                    class="link underline absolute right-4 top-2 rounded-full"
                    @click="addUser()"
                  >
                    Add
                  </p>
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    class="form-input-style peer placeholder-transparent pr-16"
                    maxlength="254"
                    required
                    @keydown.enter="addUser()"
                    @submit.prevent="addUser()"
                  />
                  <label class="input-label" for="email">Email</label>
                </div>
                <div
                  class="flex flex-1 flex-wrap gap-1 text-sm text-brand-secondary"
                >
                  <div
                    v-for="(user, index) in users"
                    :key="index"
                    class="rounded-full py-1 px-3 gap-1 bg-brand-light flex flex-row items-center"
                  >
                    <p>{{ user }}</p>
                    <XIcon class="w-4 h-4" @click="removeUser(index)" />
                  </div>
                </div>
              </div>

              <div class="mt-4 flex flex-row gap-2">
                <button
                  type="button"
                  class="primary-button"
                  @click="inviteAdmins"
                >
                  Add admins
                </button>
                <button
                  type="button"
                  class="secondary-button"
                  @click="closeModal"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { XIcon, RefreshIcon } from "@heroicons/vue/outline";
import { errorToast, successToast } from "@/helpers/toast.js";

let users = ref([]);
let email = ref("");
let loading = ref(false);

let isOpen = ref(false);

const closeModal = () => {
  isOpen.value = false;
};
const openModal = () => {
  isOpen.value = true;
};

const addUser = () => {
  if (email.value.length < 1) return;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errorToast("Invalid email address");
    return;
  }
  users.value.push(email.value);
  email.value = "";
};

const removeUser = (index) => {
  users.value.splice(index, 1);
};

const inviteAdmins = () => {
  if (users.value.length < 1) return errorToast("Add at least one admin");
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    successToast("Admins invited!");
    closeModal();
  }, 5000);
};

defineExpose({
  isOpen,
  openModal,
  closeModal,
});
</script>
