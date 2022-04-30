<template>
  <Transition name="slide-fade">
    <div
      v-if="show"
      class="flex flex-col h-full w-full content-center justify-center"
    >
      <div
        class="flex flex-col h-full w-1/3 content-center justify-center self-center gap-10 min-w-max"
      >
        <p class="text-3xl text-brand-medium self-center font-bold">
          Enter Username and Email
        </p>
        <div>
          <div>
            <form class="mb-5 flex flex-col gap-5" @submit.prevent="onSubmit">
              <div class="relative col-span-2 w-full">
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  class="form-input-style peer placeholder-transparent"
                  required
                />
                <label class="input-label" for="email">Email</label>
              </div>

              <div class="relative col-span-2 w-full">
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  name="password"
                  placeholder="Password"
                  class="form-input-style peer placeholder-transparent"
                  required
                />
                <label for="password" class="input-label">Password</label>
                <div
                  class="absolute top-3 right-5 w-5 text-gray-500"
                  @click="showPassword = !showPassword"
                >
                  <EyeIcon v-if="!showPassword"></EyeIcon>
                  <EyeOffIcon v-else></EyeOffIcon>
                </div>
              </div>
              <button class="submit-button mt-5">Continue -></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { EyeIcon, EyeOffIcon } from "@heroicons/vue/solid";

let show = ref(false);
onMounted(() => (show.value = true));
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
