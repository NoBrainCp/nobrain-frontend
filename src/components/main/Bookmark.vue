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
                  <v-img src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg">
<!--                  <v-img draggable="false" src = favicon>-->
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
                  </v-img>
                  <v-card-text>
                    <h2 class="text-h6 text-primary">
                      {{bookmark.title}}
                    </h2>
                    {{bookmark.description}}
                    <v-icon id = 'sstar' size = "35" :color = "temp" class = "mdi mdi-star" @click = "isStar()"></v-icon>
                    <v-icon id = "lock" size = "35" class = "mdi mdi-lock-open-variant" @click="unLock()"></v-icon>
                  </v-card-text>
                  <v-card-title>
                    <div class="text-primary text-subtitle-2">{{bookmark.createdAt}}</div>
                  </v-card-title>
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
  import book from "../Book.vue";

  export default {
    name: 'Bookmark',
    computed: {
      book() {
        return book
      }
    },
    components: {CreateBookmarkForm, CategorySubBar},

    data: () => ({
      isSubBarShow: true,
      temp: "black",
    }),

    setup() {
      const route = useRoute();
      const data = reactive({
        bookmarks:[],
      });
      // let favicon = "https://www.google.com/s2/favicons?domain=";
      const category = route.params.category;

      if (category === undefined) {
        axios.get("/api/" + route.params.username + "/bookmarks").then((res) => {
          data.bookmarks = res.data.list;
          data.isSubBarShow = false;
          console.log(fa)
        })
      }
      else {
        axios.get("/api/" + route.params.username + "/" + route.params.category + "/bookmarks").then((res) => {
          data.bookmarks = res.data.list;
          data.isSubBarShow = true;
        });
      }
      return {data}
    },
    methods: {

      isStar(){
        // document.getElementById('sstar').style.colo="black"
        if(this.temp ==="yellow"){
          this.temp = "black"
        }else{
          this.temp = "yellow"
        }
        
      },

      unLock() {
        if(document.getElementById('lock').className==="mdi mdi-lock"){
          document.getElementById('lock').className="mdi mdi-lock-open-variant";  
        }else{
          document.getElementById('lock').className="mdi mdi-lock";
        }
      }
    }
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