<template>
  <v-app id="inspire">
    <Headed/>

    <Side/>

    <CategoryBar/>

    <v-main class="main">
      <Profile v-if="route.fullPath.includes('profile')"/>
      <Book v-else/>
    </v-main>

    <TagBar class="tag-bar"/>

  </v-app>
</template>

<script>
import Side from "../components/Side.vue";
import Headed from "../components/Head.vue";
import Book from "../components/Book.vue";
import CategoryBar from "../components/CategoryBar.vue";
import TagBar from "../components/TagBar.vue";
import Profile from "../components/Profile.vue";
import {useRoute} from "vue-router";

export default {
  components: {Profile, TagBar, CategoryBar, Book, Headed, Side},
  name: 'main',

  data: () => ({
    isMain: true,
    route: useRoute(),
  }),
}
</script>

<style scoped>
.main {
  margin-top: 35px;
  margin-bottom: 35px;
  margin-left: 35px;
}
</style>