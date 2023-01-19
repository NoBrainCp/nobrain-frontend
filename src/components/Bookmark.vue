<template>
  <v-col>
    <v-row>
      <v-col v-for="(bookmark, idx) in data.bookmarks"
             :key="bookmark"
             cols="auto">

        <div>
          <v-hover v-slot="{ isHovering, props }">
            <v-card
                class="mx-auto"
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
                <v-rating
                    :model-value="4"
                    dense
                    color="orange"
                    background-color="orange"
                    hover
                    class="me-2"
                ></v-rating>
                <span class="text-primary text-subtitle-2">Date</span>
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
</template>

<script>
  import {useRoute} from "vue-router";
  import {reactive} from "vue";
  import axios from "axios";

  export default {
    name: 'Bookmark',
    setup() {
      const route = useRoute();
      const data = reactive({
        bookmarks:[]
      });
      axios.get("/api/" + route.params.username + "/" + route.params.category + "/bookmarks").then((res) => {
        data.bookmarks = res.data.list;
        console.log(res.data.list);
      })
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