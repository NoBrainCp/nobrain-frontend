<template>
  <v-app id="inspire">
    <Headed/>

    <Side/>

    <CategoryBar/>

    <v-main class="main">
      <Book/>
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

export default {
  components: {TagBar, CategoryBar, Book, Headed, Side},
  name: 'main',

  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    links: [
      ['mdi-inbox-arrow-down', 'Inbox'],
      ['mdi-send', 'Send'],
      ['mdi-delete', 'Trash'],
      ['mdi-alert-octagon', 'Spam'],
    ],
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