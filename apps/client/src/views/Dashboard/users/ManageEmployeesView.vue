<template>
  <div class="flex flex-col">
    <div
      class="mb-5 flex flex-1 items-center gap-10 justify-between overflow-x-auto min-w-max"
    >
      <button
        class="primary-button self-center flex flex-row items-center gap-1"
        @click="openAddEymployeeDialog()"
      >
        <PlusIcon class="w-5 text-white stroke-2" />
        <p>Add user</p>
      </button>
      <div
        class="flex flex-1 items-center justify-between gap-2 text-xs lg:text-sm"
      >
        <div>
          <p class="text-sm text-gray-700">Users: {{ items }}</p>
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
              @change="updateUsers"
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
              <!-- <div v-for="(page, index) in pages" :key="index">
						
						
						</div>
          <a href="#" aria-current="page" class="current-page-number"> 1 </a>
          <a href="#" class="normal-page-number"> 2 </a>
-->
              <!-- <span class="disabled-page-number"> {{ page }} </span> -->

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
    <div class="border-b border-gray-200 shadow sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Username & Email
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Role
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
          <tr v-for="u in users" :key="u.username">
            <td class="whitespace-nowrap px-6 py-4">
              <div class="flex items-center">
                <div>
                  <div class="text-sm font-medium text-gray-900">
                    {{ u.username }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ u.email }}
                  </div>
                </div>
              </div>
            </td>
            <td class="whitespace-nowrap px-6 py-4">
              <div class="truncate text-sm text-gray-900">
                <p class="line-clamp-1 capitalize">
                  {{ u.is_admin ? "Admin" : "Employee" }}
                </p>
              </div>
            </td>
            <td class="whitespace-nowrap px-6 py-4">
              <div class="truncate text-sm text-gray-900">
                <router-link
                  :to="{
                    name: 'ManageUserView',
                    params: { userId: u._id },
                  }"
                  class="link underline"
                  >Manage</router-link
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <AddEmployeeDialog ref="add_employee_dialog" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  PlusIcon,
} from "@heroicons/vue/outline";
import { getEmployees } from "@/helpers/api/admin";
import AddEmployeeDialog from "@/components/Dialogs/Admin/Users/AddEmployeeDialog.vue";

let page = ref(1);
let pages = ref(1);
let perPage = ref(30);
let items = ref(0);
let users = ref([]);

const add_employee_dialog = ref(null);

let pageUp = async () => {
  if (page.value < pages.value) {
    page.value++;
    await updateUsers(page.value, perPage.value);
  }
};

let pageDown = async () => {
  if (page.value > 1) {
    page.value--;
    await updateUsers(page.value, perPage.value);
  }
};

let openAddEymployeeDialog = async () => {
  console.log(add_employee_dialog);
  add_employee_dialog.value.openModal();
};

let updateUsers = async () => {
  let data = await getEmployees(page.value, perPage.value);
  users.value = [];
  users.value = data.data.users;
  items.value = data.data.count;
  pages.value = Math.ceil(items.value / perPage.value);
};
(async () => {
  await updateUsers();
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
