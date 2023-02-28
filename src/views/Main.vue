<template>
  <v-app id="inspire">
    <Headed/>

    <Side/>

    <v-main class="main">
      <Book/>
    </v-main>
  </v-app>
</template>

<script>
import Side from "../components/Side.vue";
import Headed from "../components/Head.vue";
import Book from "../components/Book.vue";

export default {
  components: {Book, Headed, Side},
  name: 'mainn',
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
  margin-top: 10px;
  margin-left: 70px;
}
</style>