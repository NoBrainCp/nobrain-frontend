<template>
  <v-app id="inspire">
    <Headed @setting="showSettingVue"/>
    <Side/>
    <v-window
      v-model="window">
      <v-main class="main">
        <v-window-item value="book">
<!--          <CategoryBar/>-->
          <BookmarkCategory v-if="route.params.category !== undefined"/>
          <Book v-else/>
        </v-window-item>
        <v-window-item value="setting">
          <Profile/>
        </v-window-item>
      </v-main>
    </v-window>

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
import BookmarkCategory from "./bookmarkCategory.vue";

export default {

  components: {BookmarkCategory, Profile, TagBar,  Headed, Side},
  name: 'main',

  data: () => ({
    isMain: true,
    route: useRoute(),
    window: "book",

  }),

  methods: {
    showSettingVue(setting) {
      this.window = setting;
    }
  }
}
</script>

<style scoped>
.main {
  margin-top: 35px;
  margin-bottom: 35px;
  margin-left: 35px;
}
</style>