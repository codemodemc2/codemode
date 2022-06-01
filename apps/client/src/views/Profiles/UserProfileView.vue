<template>
  <div class="bg-white">
    {{ user }}
  </div>
</template>
<script setup>
import { getUser } from "@/helpers/api/user";
import { ref } from "vue";
import { useRoute } from "vue-router";

let route = useRoute();
let user = ref({});
let id = route.params.id;

(async () => {
  let res = await getUser(id);
  user.value = res.data.user;
})();
</script>
