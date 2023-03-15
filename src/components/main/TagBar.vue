<template>
  <v-navigation-drawer
      width="300"
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
      location="right"
      class="nav-tag"
      style="position: fixed"
  >
    <v-list-item
        prepend-icon="mdi mdi-tag-multiple"
        title="태그"
        class="btn-tag"
        @click.stop="rail = !rail"
    >
      <template v-slot:append>
        <v-btn
            class="tag-btn"
            variant="text"
            icon="mdi-chevron-right"
            @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-chip-group
        v-model="selectedTags"
        column
        multiple
        v-if="!rail"
        selected-class="bg-light-blue"
        class="chip-group"
    >

      <v-chip
          v-for="(tag) in tags"
          :key="tag.id"
          :value="tag.id"
          filter
          elevation="2"
      >
        {{tag.name}}
      </v-chip>
    </v-chip-group>
  </v-navigation-drawer>
</template>

<script>
import {onMounted, reactive, toRefs, watch} from "vue";
import {useRoute} from "vue-router";
import {getBookmarksByTags, getTags} from "../../api/tag/tagApi";
import {bookmarkStore} from "../../store/bookmark/bookmark";

export default {
  name: 'TagBar',
  data() {
    return {
      route: useRoute(),
      drawer: true,
      rail: true,
    }
  },

  setup() {
    const route = useRoute();
    const data = reactive({
      bookmarks: [],
      tags: [],
      selectedTags: []
    });

    watch(() => data.selectedTags, () => {
      getBookmarksByTags(route.params.username, data.selectedTags)
          .then(response => {
            bookmarkStore.commit("setBookmarks", response.data.list);
          })
          .catch(error => {
            alert(error.data.message);
          });
    });

    watch(() => bookmarkStore.state.status, findAllTagsByUser);
    onMounted(findAllTagsByUser);

    function findAllTagsByUser() {
      const username = route.params.username;
      getTags(username).then(response => {
        const list = response.data.list;
        data.tags = list.map(t => t.tag);
        data.bookmarks = list.map(b => b.bookmark);
      });
    }

    return {...toRefs(data)};
  },

}
</script>

<style scoped>
.tag-btn {
  margin: 4px 0;
}

.chip-group {
  margin-left: 10px;
}
</style>