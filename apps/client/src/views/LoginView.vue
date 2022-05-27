<template>
  <div class="relative grid h-screen grid-cols-1 xl:grid-cols-2">
    <div
      class="absolute top-5 left-5 cursor-pointer"
      @click="$router.push({ name: 'home' })"
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
          <p class="font-bold text-gray-800 text-3xl">Login</p>
        </div>

        <div>
          <form class="mb-5 flex flex-col gap-5" @submit.prevent="login">
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
            <div class="flex flex-row justify-between">
              <div class="flex flex-row gap-1">
                <input
                  id="remember"
                  type="checkbox"
                  name=""
                  style="box-shadow: none"
                  class="
                    form-checkbox
                    self-center
                    rounded
                    text-sky-500
                    outline-none
                    ring-0 ring-offset-0
                  "
                />
                <p class="self-center text-sm font-medium text-gray-700">
                  Remember me
                </p>
              </div>
              <router-link
                to="/forgot"
                class="
                  text-sm
                  font-semibold
                  text-sky-500
                  underline
                  decoration-sky-500
                "
              >
                Forgot password?
              </router-link>
            </div>
            <button class="submit-button">Log in</button>
          </form>
          <div class="flex w-full flex-col content-center justify-center gap-5">
            <div class="flex flex-row">
              <span class="h-0.5 w-full self-center bg-gray-200"></span>
            </div>
            <div class="flex flex-row gap-2">
              <p class="text-sm font-medium text-gray-700">
                Dont have an account
              </p>
              <router-link to="/register">
                <p
                  class="
                    text-sm
                    font-semibold
                    text-sky-500
                    underline
                    decoration-sky-500
                  "
                >
                  Sign up for free
                </p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <svg
      class="absolute h-screen right-0 -z-10 xl:block hidden"
      viewBox="0 0 1920 1080"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
    >
      
      <path
        d="M909 1080L924 1054.3C939 1028.7 969 977.3 1002.3 925.8C1035.7 874.3 1072.3 822.7 1062.8 771.2C1053.3 719.7 997.7 668.3 996.8 617C996 565.7 1050 514.3 1074.5 463C1099 411.7 1094 360.3 1058.2 308.8C1022.3 257.3 955.7 205.7 926.2 154.2C896.7 102.7 904.3 51.3 908.2 25.7L912 0L1920 0L1920 25.7C1920 51.3 1920 102.7 1920 154.2C1920 205.7 1920 257.3 1920 308.8C1920 360.3 1920 411.7 1920 463C1920 514.3 1920 565.7 1920 617C1920 668.3 1920 719.7 1920 771.2C1920 822.7 1920 874.3 1920 925.8C1920 977.3 1920 1028.7 1920 1054.3L1920 1080Z"
        fill="#22d3ee"
      ></path>
      <path
        d="M1025 1080L1035.7 1054.3C1046.3 1028.7 1067.7 977.3 1097.7 925.8C1127.7 874.3 1166.3 822.7 1165.8 771.2C1165.3 719.7 1125.7 668.3 1101.2 617C1076.7 565.7 1067.3 514.3 1079.2 463C1091 411.7 1124 360.3 1146.7 308.8C1169.3 257.3 1181.7 205.7 1169 154.2C1156.3 102.7 1118.7 51.3 1099.8 25.7L1081 0L1920 0L1920 25.7C1920 51.3 1920 102.7 1920 154.2C1920 205.7 1920 257.3 1920 308.8C1920 360.3 1920 411.7 1920 463C1920 514.3 1920 565.7 1920 617C1920 668.3 1920 719.7 1920 771.2C1920 822.7 1920 874.3 1920 925.8C1920 977.3 1920 1028.7 1920 1054.3L1920 1080Z"
        fill="#0ebedf"
      ></path>
      <path
        d="M1358 1080L1336.7 1054.3C1315.3 1028.7 1272.7 977.3 1265.3 925.8C1258 874.3 1286 822.7 1277.8 771.2C1269.7 719.7 1225.3 668.3 1216.7 617C1208 565.7 1235 514.3 1254.8 463C1274.7 411.7 1287.3 360.3 1280.8 308.8C1274.3 257.3 1248.7 205.7 1246.8 154.2C1245 102.7 1267 51.3 1278 25.7L1289 0L1920 0L1920 25.7C1920 51.3 1920 102.7 1920 154.2C1920 205.7 1920 257.3 1920 308.8C1920 360.3 1920 411.7 1920 463C1920 514.3 1920 565.7 1920 617C1920 668.3 1920 719.7 1920 771.2C1920 822.7 1920 874.3 1920 925.8C1920 977.3 1920 1028.7 1920 1054.3L1920 1080Z"
        fill="#00a9cf"
      ></path>
      <path
        d="M1330 1080L1344.8 1054.3C1359.7 1028.7 1389.3 977.3 1411.2 925.8C1433 874.3 1447 822.7 1452.3 771.2C1457.7 719.7 1454.3 668.3 1445.5 617C1436.7 565.7 1422.3 514.3 1421.2 463C1420 411.7 1432 360.3 1420.8 308.8C1409.7 257.3 1375.3 205.7 1362.7 154.2C1350 102.7 1359 51.3 1363.5 25.7L1368 0L1920 0L1920 25.7C1920 51.3 1920 102.7 1920 154.2C1920 205.7 1920 257.3 1920 308.8C1920 360.3 1920 411.7 1920 463C1920 514.3 1920 565.7 1920 617C1920 668.3 1920 719.7 1920 771.2C1920 822.7 1920 874.3 1920 925.8C1920 977.3 1920 1028.7 1920 1054.3L1920 1080Z"
        fill="#0094be"
      ></path>
      <path
        d="M1572 1080L1567.7 1054.3C1563.3 1028.7 1554.7 977.3 1541 925.8C1527.3 874.3 1508.7 822.7 1496 771.2C1483.3 719.7 1476.7 668.3 1480.8 617C1485 565.7 1500 514.3 1521.8 463C1543.7 411.7 1572.3 360.3 1587.2 308.8C1602 257.3 1603 205.7 1594.2 154.2C1585.3 102.7 1566.7 51.3 1557.3 25.7L1548 0L1920 0L1920 25.7C1920 51.3 1920 102.7 1920 154.2C1920 205.7 1920 257.3 1920 308.8C1920 360.3 1920 411.7 1920 463C1920 514.3 1920 565.7 1920 617C1920 668.3 1920 719.7 1920 771.2C1920 822.7 1920 874.3 1920 925.8C1920 977.3 1920 1028.7 1920 1054.3L1920 1080Z"
        fill="#0080ac"
      ></path>
      <path
        d="M1644 1080L1638.7 1054.3C1633.3 1028.7 1622.7 977.3 1626.3 925.8C1630 874.3 1648 822.7 1662.3 771.2C1676.7 719.7 1687.3 668.3 1692.3 617C1697.3 565.7 1696.7 514.3 1682.7 463C1668.7 411.7 1641.3 360.3 1626.2 308.8C1611 257.3 1608 205.7 1612.7 154.2C1617.3 102.7 1629.7 51.3 1635.8 25.7L1642 0L1920 0L1920 25.7C1920 51.3 1920 102.7 1920 154.2C1920 205.7 1920 257.3 1920 308.8C1920 360.3 1920 411.7 1920 463C1920 514.3 1920 565.7 1920 617C1920 668.3 1920 719.7 1920 771.2C1920 822.7 1920 874.3 1920 925.8C1920 977.3 1920 1028.7 1920 1054.3L1920 1080Z"
        fill="#036c99"
      ></path>
      <path
        d="M1838 1080L1838.7 1054.3C1839.3 1028.7 1840.7 977.3 1829 925.8C1817.3 874.3 1792.7 822.7 1786.7 771.2C1780.7 719.7 1793.3 668.3 1799.7 617C1806 565.7 1806 514.3 1811.3 463C1816.7 411.7 1827.3 360.3 1819.3 308.8C1811.3 257.3 1784.7 205.7 1783 154.2C1781.3 102.7 1804.7 51.3 1816.3 25.7L1828 0L1920 0L1920 25.7C1920 51.3 1920 102.7 1920 154.2C1920 205.7 1920 257.3 1920 308.8C1920 360.3 1920 411.7 1920 463C1920 514.3 1920 565.7 1920 617C1920 668.3 1920 719.7 1920 771.2C1920 822.7 1920 874.3 1920 925.8C1920 977.3 1920 1028.7 1920 1054.3L1920 1080Z"
        fill="#075985"
      ></path>
    </svg>
  </div>
</template>

<script setup>
import { EyeIcon, EyeOffIcon } from "@heroicons/vue/outline";
import { useUserStore } from "@/stores/user.js";
import { errorToast } from "@/helpers/toast.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

let router = useRouter();

let userStore = useUserStore();

let email = ref("");
let password = ref("");
let showPassword = ref(false);

let login = async () => {
  try {
    await userStore.login(email.value, password.value);
    router.push({ path: "/" });
  } catch (error) {
    errorToast(error);
  }
};
</script>
