<template>
  <div>login</div>
</template>

<script setup>
import { useUserStore } from "../stores/user.js";

const store = useUserStore();
store.login();

console.log(store.isLoggedIn);
</script>
