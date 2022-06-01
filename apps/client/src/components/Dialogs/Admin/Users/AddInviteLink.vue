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

      <div class="fixed inset-0">
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
              class="w-full relative max-w-xl transform rounded-2xl bg-white py-6 px-12 text-left align-middle shadow-xl transition-all"
            >
              <div
                v-if="loading"
                class="absolute top-0 left-0 z-10 w-full h-full rounded-2xl bg-black bg-opacity-40 flex flex-col gap-1 justify-center items-center"
              >
                <RefreshIcon
                  class="w-10 h-10 rotate-180 animate-spin self-center text-white"
                />
                <p class="text-xl text-white">Creating invite link</p>
              </div>
              <div
                v-if="generated && !loading"
                class="flex pt-5 gap-5 flex-col justify-center items-center w-full h-full"
              >
                <p class="font-bold text-2xl w-full">Invite link:</p>
                <div
                  v-if="link"
                  class="form-input-style-disabled relative flex flex-row items-center"
                >
                  <p class="font-mono pr-6">
                    {{ inviteString() }}
                  </p>
                  <div
                    class="absolute right-1 border-[1px] hover:cursor-pointer hover:border-brand-secondary outline-none decoration-transparent border-transparent rounded-md p-1 ml-1"
                    @click="copyLink"
                  >
                    <DocumentDuplicateIcon
                      v-tippy="{ content: 'Copy link!' }"
                      class="w-5 h-5 text-brand-secondary"
                    />
                  </div>
                </div>
              </div>
              <div v-else class="my-4 flex flex-col overflow-visible gap-4">
                <DialogTitle as="div" class="flex flex-col leading-6">
                  <p class="text-lg font-medium text-gray-900">
                    Create invite link
                  </p>
                  <p class="text-sm text-gray-500">
                    Create link to invite new users to the team.
                  </p>
                </DialogTitle>
                <hr class="mt-2" />

                <div class="flex flex-col gap-2">
                  <div class="flex flex-row justify-between items-center mt-2">
                    <p class="font-medium text-gray-700">Number of usages</p>
                    <div v-if="!unlimitedUsages" class="w-28 relative">
                      <input
                        id="usages"
                        v-model="usages"
                        placeholder="Usages"
                        type="number"
                        class="form-input-style shadow-none peer placeholder-transparent"
                      />
                      <label class="input-label" for="usages">Usages</label>
                    </div>
                    <div v-else class="flex flex-row items-center gap-2">
                      <svg
                        class="h-4 w-4 fill-brand-secondary"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path
                          d="M494.9 96.01c-38.78 0-75.22 15.09-102.6 42.5L320 210.8L247.8 138.5c-27.41-27.41-63.84-42.5-102.6-42.5C65.11 96.01 0 161.1 0 241.1v29.75c0 80.03 65.11 145.1 145.1 145.1c38.78 0 75.22-15.09 102.6-42.5L320 301.3l72.23 72.25c27.41 27.41 63.84 42.5 102.6 42.5C574.9 416 640 350.9 640 270.9v-29.75C640 161.1 574.9 96.01 494.9 96.01zM202.5 328.3c-15.31 15.31-35.69 23.75-57.38 23.75C100.4 352 64 315.6 64 270.9v-29.75c0-44.72 36.41-81.13 81.14-81.13c21.69 0 42.06 8.438 57.38 23.75l72.23 72.25L202.5 328.3zM576 270.9c0 44.72-36.41 81.13-81.14 81.13c-21.69 0-42.06-8.438-57.38-23.75l-72.23-72.25l72.23-72.25c15.31-15.31 35.69-23.75 57.38-23.75C539.6 160 576 196.4 576 241.1V270.9z"
                        />
                      </svg>
                      <p>Unlimited</p>
                    </div>
                  </div>
                  <div class="flex flex-row justify-between">
                    <p class="text-sm text-gray-500">Unlimited usages?</p>
                    <div class="flex flex-row items-center gap-2">
                      <p class="uppercase text-xs text-gray-500">
                        {{ unlimitedUsages ? "yes" : "no" }}
                      </p>
                      <Switch
                        v-model="unlimitedUsages"
                        :class="unlimitedUsages ? 'bg-brand-dark' : 'bg-white'"
                        class="relative inline-flex p-[0.15rem] h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-brand-dark transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      >
                        <span class="sr-only">Use setting</span>
                        <span
                          aria-hidden="true"
                          :class="
                            unlimitedUsages
                              ? 'translate-x-[1rem]'
                              : 'translate-x-0 bg-gray-500'
                          "
                          class="pointer-events-none inline-block h-[0.7rem] w-[0.7rem] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                        />
                      </Switch>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col gap-2">
                  <div class="flex flex-row justify-between items-center mt-2">
                    <p class="font-medium text-gray-700">Expiration date</p>
                    <div v-if="expires" class="min-w-min relative">
                      <input
                        id="expiration"
                        v-model="expiration"
                        placeholder="Expiration"
                        type="datetime-local"
                        class="form-input-style shadow-none peer placeholder-transparent"
                      />
                      <label class="input-label" for="expiration"
                        >Expiration</label
                      >
                    </div>
                    <div v-else class="flex flex-row items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        class="h-4 w-4 fill-brand-secondary"
                      >
                        <path
                          d="M352 0C369.7 0 384 14.33 384 32C384 49.67 369.7 64 352 64V74.98C352 117.4 335.1 158.1 305.1 188.1L237.3 256L305.1 323.9C335.1 353.9 352 394.6 352 437V448C369.7 448 384 462.3 384 480C384 497.7 369.7 512 352 512H32C14.33 512 0 497.7 0 480C0 462.3 14.33 448 32 448V437C32 394.6 48.86 353.9 78.86 323.9L146.7 256L78.86 188.1C48.86 158.1 32 117.4 32 74.98V64C14.33 64 0 49.67 0 32C0 14.33 14.33 0 32 0H352zM111.1 128H272C282.4 112.4 288 93.98 288 74.98V64H96V74.98C96 93.98 101.6 112.4 111.1 128zM111.1 384H272C268.5 378.7 264.5 373.7 259.9 369.1L192 301.3L124.1 369.1C119.5 373.7 115.5 378.7 111.1 384V384z"
                        />
                      </svg>
                      <p>Never</p>
                    </div>
                  </div>
                  <div class="flex flex-row justify-between">
                    <p class="text-sm text-gray-500">Has expiration date?</p>
                    <div class="flex flex-row items-center gap-2">
                      <p class="uppercase text-xs text-gray-500">
                        {{ expires ? "yes" : "no" }}
                      </p>
                      <Switch
                        v-model="expires"
                        :class="expires ? 'bg-brand-dark' : 'bg-white'"
                        class="relative inline-flex p-[0.15rem] h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-brand-dark transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      >
                        <span class="sr-only">Use setting</span>
                        <span
                          aria-hidden="true"
                          :class="
                            expires
                              ? 'translate-x-[1rem]'
                              : 'translate-x-0 bg-gray-500'
                          "
                          class="pointer-events-none inline-block h-[0.7rem] w-[0.7rem] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                        />
                      </Switch>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col gap-2">
                  <div class="flex flex-row justify-between items-center mt-2">
                    <p class="font-medium text-gray-700">Invite for</p>

                    <div class="flex flex-row items-center gap-2 self-center">
                      <Listbox v-model="selectedRole">
                        <div class="relative mt-1">
                          <ListboxButton
                            class="relative flex h-max w-full min-w-[10rem] flex-row content-center items-center gap-2 rounded-lg form-input-style shadow-none"
                          >
                            <div
                              class="flex flex-row content-center items-center gap-1 self-center"
                            >
                              <p class="text-sm lg:text-base">
                                {{ selectedRole.name }}
                              </p>
                            </div>
                            <span
                              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                            >
                              <SelectorIcon
                                class="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </ListboxButton>

                          <transition
                            leave-active-class="transition duration-100 ease-in"
                            leave-from-class="opacity-100"
                            leave-to-class="opacity-0"
                          >
                            <ListboxOptions
                              class="absolute mt-1 max-h-60 w-full divide-y overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                            >
                              <ListboxOption
                                v-for="l in roles"
                                v-slot="{ active, selected }"
                                :key="l"
                                :value="l"
                                as="template"
                                class=""
                              >
                                <div
                                  class="flex flex-row justify-between py-2 px-4"
                                  :class="{
                                    'bg-gray-100': active,
                                    'bg-white': !active && selected,
                                  }"
                                >
                                  <p class="font-medium text-sky-900">
                                    {{ l.name }}
                                  </p>
                                </div>
                              </ListboxOption>
                            </ListboxOptions>
                          </transition>
                        </div>
                      </Listbox>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-10 flex flex-row gap-2">
                <button
                  v-if="!generated && !loading"
                  type="button"
                  class="primary-button"
                  @click="createLink"
                >
                  Create invite link
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
  Switch,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import {
  RefreshIcon,
  SelectorIcon,
  DocumentDuplicateIcon,
} from "@heroicons/vue/outline";
import { errorToast, successToast } from "@/helpers/toast.js";
import { generateInviteLink } from "@/helpers/api/admin.js";

const emit = defineEmits(["refresh"]);

const roles = [
  { name: "Employees", type: 0 },
  { name: "Admins", type: 1 },
];
const selectedRole = ref(roles[0]);

let loading = ref(false);
let generated = ref(false);

let unlimitedUsages = ref(true);
let usages = ref(10);

let expires = ref(false);
let expiration = ref();

let isOpen = ref(false);

let link = ref();

const closeModal = () => {
  isOpen.value = false;
};
const openModal = () => {
  isOpen.value = true;
  // clear all data
  unlimitedUsages.value = true;
  usages.value = 10;
  expires.value = false;
  expiration.value = "";
  selectedRole.value = roles[0];
  link.value = "";
  generated.value = false;
};

const createLink = async () => {
  loading.value = true;
  let data = {
    unlimitedUsages: unlimitedUsages.value,
    usages: unlimitedUsages.value ? -1 : usages.value,
    expires: expires.value,
    expiration: expiration.value,
    selectedRole: selectedRole.value.type,
  };
  try {
    let res = await generateInviteLink(data);
    link.value = res.data.inviteLink;
    loading.value = false;
    generated.value = true;
    emit("refresh");
    successToast("Admins invited!");
  } catch (error) {
    errorToast("An error occurred while generating invite link");
  }
};

let inviteString = () => {
  return `${window.location.origin}/invited?id=${link.value.id}`;
};

let copyLink = async () => {
  let textArea = document.createElement("textarea");
  textArea.value = inviteString(link.value.id);
  document.body.appendChild(textArea);
  textArea.select();
  let success = document.execCommand("copy");
  textArea.remove();
  if (!success) return errorToast("Failed to copy link!");
  await successToast("Link copied!");
};

defineExpose({
  isOpen,
  openModal,
  closeModal,
});
</script>
