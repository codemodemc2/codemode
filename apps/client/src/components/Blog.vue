<template>
  <section class="section">
    <div class="section__details">
      <div class="section__details-info">
        <h1>{{ title }}</h1>
        <div class="section__details-img">
          <img
            src="https://res.cloudinary.com/terieyenike/image/upload/v1644896156/vvasmj6onychxlkkynua.png"
            alt="anime character"
          />
          <p>Written by {{ name }}</p>
        </div>
      </div>
      <div class="section__details-content">
        <p>
          {{ body }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: 'Create an image loading placeholder in nuxtJS',
      name: 'Teri',
      body: `In today's world, where optimization and loading time is crucial for
          websites, loading placeholders are developed to improve the waiting
          experience of users on a webpage. This article will discuss how to
          create a loading placeholder image that shows a lightweight version of
          an image, whether pixelated, blurry etc., before the target or
          original image is displayed. We will be using NuxtJS, an open-source
          front-end framework built on top of Vue that features file-system
          routing, and it delivers both static-site generation (SSG) and
          on-demand server rendering.`,
      date: 'March 26, 2022',
    };
  },
};
</script>

<style scoped>
.section {
  padding: 2.5em 0;
}
.section__details-info h1 {
  margin-bottom: 0.5em;
  text-transform: capitalize;
  font-family: Padauk, sans-serif;
  font-weight: 700;
}
.section__details-img {
  display: flex;
  align-items: center;
  margin-bottom: 2em;
}
.section__details-img img {
  width: 2.5rem;
  border-radius: 100%;
  border: 1px solid black;
}
.section__details-img p {
  margin-left: 0.75em;
}
@media screen and (min-width: 768px) {
  .section__details-content {
    width: 85%;
  }
}
</style>