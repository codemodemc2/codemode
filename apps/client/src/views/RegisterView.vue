<template>
  <div class="relative grid h-screen grid-cols-1 lg:grid-cols-3">
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
          <p class="font-bold text-gray-800">Register</p>
        </div>

        <div>
          <form class="mb-5 flex flex-col gap-5">
            <div class="relative col-span-2 w-full">
              <input
                id="user"
                type="text"
                name="username"
                placeholder="Username"
                class="form-input-style peer placeholder-transparent"
                maxlength="30"
                required
              />
              <label class="input-label" for="user">Username</label>
            </div>
            <div class="relative col-span-2 w-full">
              <input
                id="email"
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
                name="password"
                placeholder="Password"
                class="form-input-style peer placeholder-transparent"
                required
              />
              <label for="password" class="input-label">Password</label>
              <div class="absolute top-3 right-5 w-5 text-gray-500"></div>
            </div>
            <div class="relative col-span-2 w-full">
              <input
                id="password2"
                name="password2"
                placeholder="Repeat password"
                class="form-input-style peer placeholder-transparent"
                required
              />
              <label for="password2" class="input-label">Repeat password</label>
              <div class="absolute top-3 right-5 w-5 text-gray-500"></div>
            </div>
            <div class="flex flex-row justify-between">
              <div class="flex flex-row gap-1 top-0">
                <input
                  id="remember"
                  type="checkbox"
                  name=""
                  style="box-shadow: none"
                  class="form-checkbox self-center rounded text-sky-500 outline-none ring-0 ring-offset-0"
                />
                <div
                  class="flex flex-row gap-1 self-center text-sm font-medium"
                >
                  <p>I accept the ToS</p>
                </div>
              </div>
            </div>
            <button class="submit-button">Register</button>
          </form>
          <div class="flex w-full flex-col content-center justify-center gap-5">
            <div class="flex flex-row">
              <span class="h-0.5 w-full self-center bg-gray-200"></span>
            </div>
            <div class="flex flex-row gap-2">
              <p class="text-sm font-medium text-gray-700">
                Already have an account?
              </p>
              <router-link to="/login">
                <p
                  class="text-sm font-semibold text-sky-500 underline decoration-sky-500"
                >
                  Log In
                </p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="hidden bg-gradient-to-br from-sky-500 to-sky-900 lg:block col-span-2"
    ></div>
  </div>
</template>
