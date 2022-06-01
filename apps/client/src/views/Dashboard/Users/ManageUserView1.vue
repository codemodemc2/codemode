<template>
  <p
    @click="$router.go(-1)"
    class="link decoration-inherit hover:text-sky-700 hover:underline"
  >
    &lt;- Back
  </p>
  {{ user }}
</template>

<script setup>
import { getUser } from "@/helpers/api/admin";
import { ref } from "vue";
import { useRoute } from "vue-router";

let route = useRoute();
let user = ref({});
let id = route.params.userId;

(async () => {
  let res = await getUser(id);
  user.value = res.data.user;
})();
</script>
