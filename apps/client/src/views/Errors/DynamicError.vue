<template>
  <div class="flex h-screen flex-col">
    <div class="sticky flex h-11 items-center justify-center">
      <div class="flex flex-row items-center justify-center text-xl">
        <p
          class="bg-gradient-to-r from-sky-500 to-sky-900 bg-clip-text font-extrabold text-transparent"
        >
          Idea
        </p>
        <p class="font-bold text-gray-800">Storm</p>
      </div>
    </div>
    <hr />
    <div class="flex h-full flex-col items-center justify-center gap-10">
      <div class="flex flex-col items-center justify-center gap-5">
        <div>
          <p
            class="bg-gradient-to-r from-sky-400 to-sky-700 bg-clip-text text-8xl font-bold text-transparent"
          >
            {{ error_code }}
          </p>
        </div>
        <div>
          <p class="text-xl font-semibold text-gray-500">
            {{ error_message }}
          </p>
        </div>
        <div>
          <p class="text-base font-semibold text-gray-900">
            {{ error_details }}
          </p>
        </div>
      </div>
      <div
        class="select-none rounded-lg border-[1px] border-sky-600 px-4 py-2 shadow-md shadow-sky-600 active:translate-y-1 active:border-b-[3px] active:shadow-sm"
        @click="$router.push({ path: '/' })"
      >
        <button class="font-semibold text-sky-600">Go to homepage</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error_code: {
      type: Number,
      default: 404,
    },
    error_message: {
      type: String,
      default: "Not Found",
    },
    error_details: {
      type: String,
      default: "The requested page was not found.",
    },
    from: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style></style>
