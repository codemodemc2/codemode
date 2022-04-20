<script setup>
import { RouterView } from "vue-router";
import Blog from '@/components/Blog.vue';
import AddComment from '@/components/AddComment.vue';
import Comment from '@/components/Comment';
import { COLLECTION_ID, db } from '@/utils';
export default {
  name: 'App',
  components: {
    Blog,
    AddComment,
    Comment,
  },
  created() {
    this.fetchComments();
  },
  data() {
    return {
      comments: [],
    };
  },
  methods: {
    fetchComments() {
      let promise = db.listDocuments(COLLECTION_ID);
      promise.then(
        (res) => {
          console.log(res);
          this.comments = res.documents;
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>

<template>
  <div class="bg-white h-screen">
    <RouterView />
  </div>

   <div class="container">
    <Blog />
    <div class="comment-space">
      <p>
        {{
          comments.length > 1
            ? `Comments (${comments.length})`
            : comments.length == 1
            ? `Comment (${comments.length})`
            : ''
        }}
      </p>
    </div>
    <div v-for="data in comments" :key="data.comment">
      <comment class="message" :data="data" v-on:refreshData="fetchComments" />
    </div>
    <add-comment :fetchComments="fetchComments" />
  </div>
</template>

<style>
.comment-space {
  margin-bottom: 1em;
}
.comment-space p {
  font-weight: 700;
  font-size: 1.5rem;
}
.container {
  margin-inline: auto;
  max-width: 75rem;
  width: 85%;
}
#app {
  font-family: Inter, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
/* Reset margins */
body,
h1,
h2,
h3,
h4,
h5,
p,
figure,
picture {
  margin: 0;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
  font-weight: 400;
}
img,
picutre {
  max-width: 100%;
  display: block;
}
/* make form elements easier to work with */
input,
button,
textarea,
select {
  font: inherit;
}
button {
  cursor: pointer;
}
</style>
