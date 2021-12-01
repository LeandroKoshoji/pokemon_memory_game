<template>
  <div id="app">
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Footer,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Acme&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

.container {
  width: Min(90%, 80rem);
  margin: 0 auto;
}

body {
  min-height: 100vh;
  background-color: #f5f5f5;
  color: #000;
}

img {
  display: block;
  width: 100%;
}
</style>
