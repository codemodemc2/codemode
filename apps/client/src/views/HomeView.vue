<template>
  <navigation-bar/>
  <div class="mx-60 my-5">
    <user-header :profile="profile"/>
    <div class="flex flex-row px-2 py-2">
      <button class="border-2 px-12 py-3 border-gray-800 my-4" style="border-radius: 0.75rem 0 0 0.75rem;border-right-width:1px;">Ideas</button>
      <button class="border-2 px-8 py-3 border-gray-800 my-4" style="border-radius: 0 0.75rem 0.75rem 0;border-left-width:1px;">Comments</button>
      <form class="searchform flex flex-row gap-1 p-1 w-[100%]" action="">
        <select name="sort" id="sort" class="border-2 py-2 border-gray-800 rounded-xl" style="margin:1rem 0 1rem 85%">
          <option value="recent">Sort by recent</option>
          <option value="liked">Sort by most liked</option>
          <option value="alphabet">Sort alphabeticaly</option>
        </select>
      </form>
    </div>
    <div class="flex flex-col gap-1 border-2 rounded-xl px-4 py-8 border-gray-800 m-2">
    <user-post :post="post" />
    <user-post :post="post" />
    <user-post :post="post" />
    <user-post :post="post" />
    </div>
  </div>
</template>
<script setup>
import {ref} from "vue"
let post=ref({
  title:"Lore ipsum",
  body:"ipsum dolor sit amet",
  username:"fdasfsdf",
  time:"13h",
  likes:320,
})
let profile=ref({
  name:"John Doe",
  username:"Johnny.Donny",
  points:200,
  posts:13,
  comments:320,
  rank:"3rd",
  position:"unknown",
})
import NavigationBar from "@/components/NavigationBar.vue"
import UserHeader from "@/components/User/UserHeader.vue"
import UserPost from "@/components/User/UserPost.vue"

</script>