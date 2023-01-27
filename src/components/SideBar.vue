<template>
    <v-col cols="2">
      <v-sheet rounded="lg">
        <v-list color="transparent">

          <v-list-item
              v-for="(category, idx) in data.categories"
              :key="category"
              link
          >
            <v-list-item-content>
              <v-list-item-title>
                - {{ category.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider class="my-2"></v-divider>

          <v-list-item
              link
              color="grey lighten-4"
          >
            <v-list-item-content>
              <v-list-item-title>
                - Star
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-col>
</template>

<script>
import axios from "axios";
import {onMounted, reactive} from "vue";
import {useRoute} from "vue-router";
import bookmark from "./Bookmark.vue";

export default {
  name: 'SideBar',
  computed: {
    bookmark() {
      return bookmark
    }
  },
  setup() {
    const route = useRoute();
    const data = reactive({
      categories:[]
    });

    axios.get("/api/" + route.params.username + "/categories").then((res) => {
      data.categories = res.data.list;
      console.log(res);
    });
    return {data}
  },
}
</script>

<style scoped>
.v-list-item {
  font-size: 30px;
}
</style>