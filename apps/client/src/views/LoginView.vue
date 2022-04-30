<template>
  <div class="relative grid h-screen grid-cols-1 lg:grid-cols-2">
    <div
      class="absolute top-5 left-5 cursor-pointer"
      @click="$router.push({ name: 'Home' })"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
    <div class="flex h-full w-full flex-col content-center justify-center">
      <div class="flex w-80 flex-col gap-5 self-center">
        <div class="flex flex-row justify-start text-3xl">
          <p class="font-bold text-gray-800">Login</p>
        </div>

        <div>
          <form class="mb-5 flex flex-col gap-5" @submit.prevent="onSubmit">
            <div class="relative col-span-2 w-full">
              <input
                v-model="email"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                class="form-input-style peer placeholder-transparent"
                required
              />
              <label class="input-label" for="email">Email</label>
            </div>

            <div class="relative col-span-2 w-full">
              <input
                id="password"
                name="password"
                placeholder="Password"
                class="form-input-style peer placeholder-transparent"
                required
              />
              <label for="password" class="input-label">Password</label>
              <div class="absolute top-3 right-5 w-5 text-gray-500">
                <EyeIcon></EyeIcon>
              </div>
            </div>
            <div class="flex flex-row justify-between">
              <div class="flex flex-row gap-1">
                <input
                  id="remember"
                  type="checkbox"
                  name=""
                  style="box-shadow: none"
                  class="form-checkbox self-center rounded text-sky-500 outline-none ring-0 ring-offset-0"
                />
                <p class="self-center text-sm font-medium text-gray-700">
                  Remeber me
                </p>
              </div>
              <router-link
                to="/forgot"
                class="text-sm font-semibold text-sky-500 underline decoration-sky-500"
              >
                Forgot password?
              </router-link>
            </div>
            <button class="submit-button">Log in</button>
          </form>
          <div class="flex w-full flex-col content-center justify-center gap-5">
            <!-- <div class="self-center w-full">
              <div class="flex flex-row gap-5">
                <span class="h-0.5 bg-gray-200 w-full self-center"></span>
                <p class="text-gray-500 font-semibold text-sm">OR</p>
                <span class="h-0.5 bg-gray-200 w-full self-center"></span>
              </div>
            </div>
            <div class="self-center">
              <div
                id="g_id_onload"
                data-client_id="602478282729-lbjpmv0i730e6oefl8hcc3ch3rpmiegn.apps.googleusercontent.com"
                data-context="signin"
                data-ux_mode="popup"
                :data-callback="onSignIn"
              ></div>

              <div
                class="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="continue_with"
                data-size="large"
                data-logo_alignment="center"
                data-width="320"
              ></div> 
            </div> -->
            <div class="flex flex-row">
              <span class="h-0.5 w-full self-center bg-gray-200"></span>
            </div>
            <div class="flex flex-row gap-2">
              <p class="text-sm font-medium text-gray-700">
                Dont have an account
              </p>
              <router-link to="/register">
                <p
                  class="text-sm font-semibold text-sky-500 underline decoration-sky-500"
                >
                  Sign up for free
                </p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
