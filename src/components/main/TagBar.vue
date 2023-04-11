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

    <v-divider/>

    <v-chip-group
        v-model="data.selectedTags"
        column
        multiple
        v-if="!rail"
        selected-class="bg-light-blue"
        class="chip-group"
    >

      <v-chip
          v-for="(tag) in data.tags"
          :key="tag.tagId"
          :value="tag.tagId"
          filter
          elevation="2"
      >
        {{ tag.tagName }}
      </v-chip>
    </v-chip-group>
  </v-navigation-drawer>
</template>

<script setup>
import {onMounted, reactive, ref,  watch} from "vue";
import {useRoute} from "vue-router";
import {getTags} from "../../api/tag/tagApi";
import {bookmarkStore} from "../../store/bookmark/bookmark";
import {getBookmarksByTags} from "../../api/bookmark_tag/bookmarkTagApi";

const route = useRoute();
const drawer = ref(true);
const rail = ref(true);
const username = ref(route.params.username);
const data = reactive({
  tags: [],
  selectedTags: []
});

const findAllTagsByUser = async () => {
  await getTags(username.value).then(response => {
    data.tags = response.data.list;
  });
};

watch(() => bookmarkStore.state.status, findAllTagsByUser);
watch(() => data.selectedTags, () => {
  getBookmarksByTags(route.params.username, data.selectedTags).then(response => {
    bookmarkStore.commit("setBookmarks", response.data.list);
  }).catch(error => {
    alert(error.data.message);
  });
});

onMounted(findAllTagsByUser);

</script>

<style scoped>
.tag-btn {
  margin: 4px 0;
}

.chip-group {
  margin-left: 10px;
}
</style>
