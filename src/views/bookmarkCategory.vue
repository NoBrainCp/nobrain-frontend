<template>
  <CategoryBar/>
  <Book/>
</template>

<script>
import CategoryBar from "../components/CategoryBar.vue";
import Book from "../components/Book.vue";

export default {
  name: 'BookmarkCategory',
  components: {CategoryBar, Book}
}

</script>
