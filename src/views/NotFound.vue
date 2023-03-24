<template>
  <v-app>
    <Header></Header>
    <v-container>
      <ErrorPage/>
    </v-container>

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