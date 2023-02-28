<template>
  <v-row>
    <v-col v-for="(bookmark, idx) in data.bookmarks"
           :key="bookmark"
           cols="auto">

      <div>
        <v-hover v-slot="{ isHovering, props }">
          <v-card
              class="mx-auto"
              v-bind="props"
              elevation="6"
          >
            <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5nUtk5JoD4sdl1VSGYazqdLh7to9LYI_Q&usqp=CAU" height="200">
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
              <v-icon id = 'sstar' size="35" :color="temp" class="mdi mdi-star" @click="isStar()"></v-icon>
              <v-icon id = "lock" size="35" class="mdi mdi-lock-open-variant" @click="unLock()"></v-icon>
            </v-card-text>
            <v-card-title>
              <div class="text-primary text-subtitle-2">{{bookmark.createdAt}}</div>
            </v-card-title>
          </v-card>
        </v-hover>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import {useRoute} from "vue-router";
import {reactive} from "vue";
import axios from "axios";

export default {
  name: 'Book',

  data: () => ({
    temp: "black",
    imagePath: [
      { noImage: "../assets/images/nobrain-no-image.png"}
    ]
  }),

  setup() {
    const route = useRoute();
    const data = reactive({
      bookmarks:[],
    });
    const category = route.params.category;
    if (category === undefined) {
      axios.get("/api/yoon/bookmarks").then((res) => {
        data.bookmarks = res.data.list;
        data.isSubBarShow = false;
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
  color: white;
}

.v-card {
  margin-top: 7px;
  width: 280px;
}

</style>