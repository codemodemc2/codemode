<template>
  <div class="flex flex-col gap-10">
    <div class="flex flex-col gap-5">
      <div class="px-3">
        <p class="text-2xl font-semibold text-sky-900">Change email</p>
        <p class="text-sm text-gray-400">
          You can change your email address anytime. You will receive an email
          to verify your new email address.
        </p>
      </div>

      <div
        class="h-auto w-full rounded-xl border-[1px] border-gray-200 p-2 md:w-3/4 md:p-3 lg:w-3/5 lg:p-5"
      >
        <div>
          <form
            class="flex flex-col gap-5 p-2 lg:p-0"
            @submit.prevent="chngEmail"
          >
            <div class="col-span-2 w-full">
              <input
                type="email"
                :placeholder="store.user_data.email"
                class="form-input-style-disabled"
                disabled
              />
            </div>

            <div class="relative col-span-2 w-full">
              <input
                id="new_email"
                v-model="new_email"
                type="email"
                placeholder="New email"
                class="form-input-style peer placeholder-transparent"
                required
              />
              <label for="new_email" class="input-label"> New email </label>
            </div>

            <button class="primary-button">Change email</button>
          </form>
          <div
            class="flex w-full flex-col content-center justify-center gap-5"
          ></div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-5">
      <div class="px-3">
        <p class="text-2xl font-semibold text-sky-900">Change your username</p>
        <p class="text-sm text-gray-400">
          Username is displayed in dashboard. It is also used to send
          personalized emails.
        </p>
      </div>

      <div
        class="h-auto w-full rounded-xl border-[1px] border-gray-200 p-2 md:w-3/4 md:p-3 lg:w-3/5 lg:p-5"
      >
        <div>
          <form
            class="flex flex-col gap-5 p-2 lg:p-0"
            @submit.prevent="chngUsername"
          >
            <div class="col-span-2 w-full relative">
              <input
                id="username"
                v-model="username"
                type="text"
                placeholder="Username"
                class="form-input-style peer placeholder-transparent"
                required
              />
              <label for="username" class="input-label"> Username </label>
            </div>
            <button class="primary-button">Change your username</button>
          </form>
          <div
            class="flex w-full flex-col content-center justify-center gap-5"
          ></div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-5">
      <div class="px-3">
        <p class="text-2xl font-semibold text-sky-900">Profile image</p>
        <p class="text-sm text-gray-400">
          You can change your profile image anytime.
        </p>
      </div>

      <div
        class="h-auto w-full rounded-xl border-[1px] border-gray-200 p-2 md:w-3/4 md:p-3 lg:w-3/5 lg:p-5"
      >
        <div>
          <form
            class="flex flex-col gap-5 p-2 lg:p-0"
            @submit.prevent="chngImage"
          >
            <div class="col-span-2 w-full relative">
              <input
                id="profile_image"
                v-model="profile_image"
                type="text"
                placeholder="Profile image URL"
                class="form-input-style peer placeholder-transparent"
                required
              />
              <label for="profile_image" class="input-label">
                Profile image URL
              </label>
            </div>
            <button class="primary-button">Change your profile image</button>
          </form>
          <div
            class="flex w-full flex-col content-center justify-center gap-5"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { successToast, errorToast } from "@/helpers/toast.js";
import { useUserStore } from "@/stores/user.js";

let store = useUserStore();

let new_email = ref("");
let username = ref(store.user_data.username);
let profile_image = ref(store.user_data.profile_image);

let chngEmail = async () => {
  try {
    let res = await store.changeEmail(new_email.value);
    successToast(res);
  } catch (error) {
    console.log(error);
    errorToast(error);
  }
};
let chngUsername = async () => {
  try {
    let res = await store.changeUsername(username.value);
    successToast(res);
    username.value = store.user_data.username;
  } catch (error) {
    console.log(error);
    errorToast(error);
  }
};
let chngImage = async () => {
  // check if profile_image is url
  if (!profile_image.value.match(/^(http|https):\/\//)) {
    return errorToast("Profile image URL is not valid");
  }
  try {
    let res = await store.changeProfileImage(profile_image.value);
    successToast(res.message);
    profile_image.value = store.user_data.profile_image;
  } catch (error) {
    console.log(error);
    errorToast(error);
  }
};
</script>
