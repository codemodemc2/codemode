<template>
  <div class="flex flex-col gap-10">
    <div class="flex flex-col gap-5">
      <div class="px-3">
        <p class="text-2xl font-semibold text-sky-900">Change password</p>
        <p class="text-sm text-gray-400">
          You can change you password anytime. If you belive your account was
          compromised it's best to change your password.
        </p>
      </div>
      <div
        class="h-auto w-full rounded-xl border-[1px] border-gray-200 p-2 md:w-3/4 md:p-3 lg:w-3/5 lg:p-5"
      >
        <div>
          <form
            class="flex flex-col gap-5 p-2 lg:p-0"
            @submit.prevent="chngPass"
          >
            <div class="relative col-span-2 w-full">
              <input
                v-model="old_password"
                type="password"
                placeholder="Old password"
                class="form-input-style peer placeholder-transparent"
                required
                id="old_password"
              />
              <label for="old_password" class="input-label">
                Old password
              </label>
            </div>

            <div class="relative col-span-2 w-full">
              <input
                v-model="new_password"
                type="password"
                placeholder="New password"
                class="form-input-style peer placeholder-transparent"
                required
                id="new_password"
              />
              <label for="new_password" class="input-label">
                New password
              </label>
            </div>
            <div class="relative col-span-2 w-full">
              <input
                v-model="new_password2"
                type="password"
                placeholder="Repeat new password"
                class="form-input-style peer placeholder-transparent"
                required
                id="new_password2"
              />
              <label for="new_password2" class="input-label">
                Repeat new password
              </label>
            </div>

            <button class="primary-button">Change password</button>
          </form>
          <div
            class="flex w-full flex-col content-center justify-center gap-5"
          ></div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-5">
      <div class="px-3">
        <p class="text-2xl font-semibold text-sky-900">
          Two-Factor Authentication (2FA)
        </p>
        <p class="text-sm text-gray-400">
          Two-Factor Authentication provides an additional step of security for
          your account. It is recommended to enable 2FA.
        </p>
      </div>
      <div
        class="h-auto w-full rounded-xl border-[1px] border-gray-200 p-2 md:w-3/4 md:p-3 lg:w-3/5 lg:p-5"
      >
        <div>
          <router-link to="/account/security/2fa">
            <button class="primary-button">
              Manage Two-Factor Authentication
            </button>
          </router-link>

          <div
            class="flex w-full flex-col content-center justify-center gap-5"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { changePassword } from "@/helpers/api/account";
import { ref } from "vue";
import { errorToast, successToast } from "@/helpers/toast.js";

let old_password = ref();
let new_password = ref();
let new_password2 = ref();

let chngPass = async () => {
  try {
    let res = await changePassword({
      oldPass: old_password.value,
      newPass1: new_password.value,
      newPass2: new_password2.value,
    });
    successToast(res);
  } catch (error) {
		console.log(error);
    errorToast(error);
  }
};
</script>
