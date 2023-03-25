<template>
  <v-app>
      <div class="main">
      </div>
  </v-app>
</template>

<script>
import Header from "../components/main/Header.vue";
import ErrorPage from "../components/error/ErrorPage.vue";

export default {
  name: "NotFound",
  components: {ErrorPage, Header}
}
</script>

<style scoped>

.container {
  /*width: 100%;*/
}

.main {
  background-size: cover;
  margin: 100px;
  width: 100%;
  height: 100%;
  background-position: center;
  background-image: url("../assets/images/error-page.png");

}

</style>