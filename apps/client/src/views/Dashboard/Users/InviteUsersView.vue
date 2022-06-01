<template>
  <div class="flex flex-col">
    <div
      class="flex flex-1 mb-5 items-center content-center gap-10 justify-between"
    >
      <button
        class="primary-button self-center flex flex-row items-center gap-1"
        @click="openAddInviteLinkDialog()"
      >
        <PlusIcon class="w-5 text-white stroke-2" />
        <p>Create new</p>
      </button>
      <div class="flex flex-1 items-center justify-between self-center">
        <div>
          <p class="text-sm text-gray-700">Invite links: {{ items }}</p>
        </div>
        <div class="flex flex-row items-center gap-5">
          <div class="flex w-full flex-row items-center gap-2">
            <p class="whitespace-nowrap">Users per page:</p>
            <input
              v-model="perPage"
              class="form-input w-full rounded-md border-gray-300 bg-white text-sm opacity-100 outline-sky-400 focus:border-sky-700 focus:outline-none"
              type="number"
              min="1"
              max="50"
              true-value="yes"
              false-value="no"
              @change="updateLinks"
            />
          </div>
          <div class="flex flex-row items-center gap-2">
            <p class="whitespace-nowrap">Page {{ page }} of {{ pages }}</p>
            <nav
              class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <div
                href="#"
                :class="[page == 1 ? 'disabled-chevron-icon' : 'chevron-icon']"
                @click.prevent="pageDown"
              >
                <span class="sr-only">Previous</span>
                <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
              </div>
              <div
                href="#"
                :class="[
                  page >= pages ? 'disabled-chevron-icon' : 'chevron-icon',
                ]"
                @click.prevent="pageUp"
              >
                <span class="sr-only">Next</span>
                <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto border-b border-gray-200 shadow sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              ID
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Usages
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Max usages
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Expires
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Created by
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              For
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Manage
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="link in links" :key="link.id">
            <td
              class="whitespace-nowrap px-6 py-4 flex flex-row content-center gap-2"
            >
              <p class="text-sm text-gray-500">
                {{ link.id }}
              </p>
              <DuplicateIcon
                v-tippy="{ content: 'Copy link!' }"
                class="w-5 link"
                @click="copyLink(link.id)"
              />
            </td>
            <td class="whitespace-nowrap px-6 py-4">
              <p class="text-sm text-gray-500">
                {{ link.usages }}
              </p>
            </td>
            <td class="whitespace-nowrap px-6 py-4">
              <p class="text-sm text-gray-500">
                {{ link.max_usages == -1 ? "Unlimited" : link.max_usages }}
              </p>
            </td>
            <td class="whitespace-nowrap px-6 py-4">
              <p class="text-sm text-gray-500">
                {{
                  link.permanent
                    ? "Never"
                    : dateToHumanReadable(link.expiration)
                }}
              </p>
            </td>
            <td class="whitespace-nowrap px-6 py-4">
              <p class="text-sm text-gray-500">
                {{ link.created_by.username }}
              </p>
            </td>
            <td class="whitespace-nowrap px-6 py-4">
              <p class="text-sm text-gray-500">
                {{ link.type == 1 ? "Admins" : "Employees" }}
              </p>
            </td>
            <td class="whitespace-nowrap px-6 py-4">
              <div class="truncate text-sm text-gray-900">
                <p class="link underline">Manage</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <AddInviteLink ref="add_invite_link_dialog" @refresh="updateLinks" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  DuplicateIcon,
  PlusIcon,
} from "@heroicons/vue/outline";
import { getInviteLinks } from "@/helpers/api/admin";
import { errorToast, successToast } from "@/helpers/toast.js";
import AddInviteLink from "@/components/Dialogs/Admin/Users/AddInviteLink.vue";

let page = ref(1);
let pages = ref(1);
let perPage = ref(30);
let items = ref(0);
let links = ref([]);

const add_invite_link_dialog = ref(null);

let pageUp = async () => {
  if (page.value < pages.value) {
    page.value++;
    await updateLinks(page.value, perPage.value);
  }
};

let pageDown = async () => {
  if (page.value > 1) {
    page.value--;
    await updateLinks(page.value, perPage.value);
  }
};

let updateLinks = async () => {
  let data = await getInviteLinks(page.value, perPage.value);
  links.value = data.data.links;
  items.value = data.data.count;
  pages.value = Math.ceil(items.value / perPage.value);
};

let openAddInviteLinkDialog = async () => {
  console.log(add_invite_link_dialog);
  add_invite_link_dialog.value.openModal();
};

let dateToHumanReadable = (date) => {
  let d = new Date(date);
  return d.toLocaleString("GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

let inviteString = (link) => {
  return `${window.location.origin}/invited?id=${link}`;
};

let copyLink = async (link) => {
  let textArea = document.createElement("textarea");
  textArea.value = inviteString(link);
  document.body.appendChild(textArea);
  textArea.select();
  let success = document.execCommand("copy");
  textArea.remove();
  if (!success) return errorToast("Failed to copy link!");
  await successToast("Link copied!");
};

(async () => {
  await updateLinks();
})();
</script>

<style scoped>
.current-page-number {
  @apply relative z-10 inline-flex items-center border border-sky-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-sky-600;
}

.normal-page-number {
  @apply relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50;
}

.disabled-page-number {
  @apply relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700;
}

.chevron-icon {
  @apply relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50;
}

.disabled-chevron-icon {
  @apply relative inline-flex cursor-not-allowed items-center rounded-r-md border border-gray-300 bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500;
}
</style>
