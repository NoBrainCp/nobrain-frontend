<template>
  <v-col>
    <v-row id="category-sub-bar" v-if="data.isSubBarShow === true">
      <CategorySubBar/>
    </v-row>
    <v-row>
      <v-col>
        <v-row>
          <v-col v-for="(bookmark, idx) in data.bookmarks"
                 :key="bookmark"
                 cols="auto">

            <div>
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                    class="mx-auto"
                    min-width="250"
                    max-width="344"
                    v-bind="props"
                >
                  <v-img src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"></v-img>

                  <v-card-text>
                    <h2 class="text-h6 text-primary">
                      {{bookmark.title}}
                    </h2>
                    {{bookmark.description}}
                  </v-card-text>

                  <v-card-title>
                    <div class="text-primary text-subtitle-2">{{bookmark.createdAt}}</div>
                  </v-card-title>

                  <v-overlay
                      :model-value="isHovering"
                      contained
                      scrim="#424242"
                      class="align-center justify-center"
                  >
                    <v-btn
                        :href="bookmark.url"
                        target="_blank"
                        color="#29B6F6"
                        variant="flat">Move</v-btn>
                  </v-overlay>
                </v-card>
              </v-hover>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
  import {useRoute} from "vue-router";
  import {reactive} from "vue";
  import axios from "axios";
  import CategorySubBar from "./CategorySubBar.vue";
  import CreateBookmarkForm from "../form/CreateBookmarkForm.vue";

  export default {
    name: 'Bookmark',
    components: {CreateBookmarkForm, CategorySubBar},

    data: () => ({
      isSubBarShow: true,
    }),

    setup() {
      const route = useRoute();
      const data = reactive({
        bookmarks:[],
      });

      const category = route.params.category;
      console.log(category);
      if (category === undefined) {
        axios.get("/api/" + route.params.username + "/bookmarks").then((res) => {
          data.bookmarks = res.data.list;
          data.isSubBarShow = false;
          console.log(data.isSubBarShow);
        })
      }
      else {
        axios.get("/api/" + route.params.username + "/" + route.params.category + "/bookmarks").then((res) => {
          data.bookmarks = res.data.list;
          data.isSubBarShow = true;
          console.log(data.isSubBarShow);
        });
      }
      return {data}
    },
  }
</script>

<style scoped>
.v-btn {
  color: white
}

.v-card {
  margin-top: 25px
}
</style>