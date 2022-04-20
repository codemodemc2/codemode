<template>
  <div class="comment">
    <div class="comment__flex">
      <p>{{ data.comment }}</p>
      <div class="comment__flex-btn">
        <button class="update" @click="updateComment">Uredi</button>
        <button class="del" @click="deleteComment">Izbriši</button>
      </div>
    </div>
    <div v-if="this.open" class="open">
      <form @submit.prevent="updateCommentMethod">
        <div class="form-group">
          <textarea
            cols="50"
            rows="10"
            id
            required
            :placeholder="data.comment"
            v-model="displayedComment"
          />
          <button class="update">Uredi</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from '@/utils';
export default {
  props: ['data'],
  data() {
    return {
      open: false,
      displayedComment: '',
    };
  },
  methods: {
    updateComment() {
      this.open = !this.open;
    },
    updateCommentMethod() {
      let promise = db.updateDocument(this.data.$collection, this.data.$id, {
        comment: this.displayedComment,
      });
      this.open = false;
      promise.then(
        () => {
          this.$emit('refreshData');
        },
        (err) => {
          console.log(err);
        }
      );
    },
    deleteComment() {
      let promise = db.deleteDocument(this.data.$collection, this.data.$id);
      promise.then(
        () => {
          this.$emit('refreshData');
        },
        (err) => {
          console.log('error occured', err);
        }
      );
    },
  },
};
</script>

<style>
.message {
  margin-bottom: 2em;
}
.comment {
  margin: 1em 0 2em;
  border-bottom: 1px solid #ccc;
}
.comment__flex-btn {
  margin: 1em 0;
}
button + button {
  margin-left: 1em;
}
button {
  padding: 0.75em 1em;
  border: unset;
}
.del {
  background: #f93943;
  color: #000807;
}
.update {
  background: #7eb2dd;
  color: #000807;
}
textarea {
  width: 100%;
}
.open {
  margin: 1em 0;
}
</style>