<template>
  <v-col cols="2">
    <v-sheet rounded="lg">
      <v-list color="transparent">
        <div class="category-title-container">
          <div id="category-title">카테고리</div>
          <CreateCategoryForm id="plusbox-icon"/>
        </div>

        <v-list-item
            v-for="(category, idx) in data.categories"
            :key="category"
            link
            @click="moveToCategory(category.name)"
        >
          <v-list-item-content>
            <v-list-item-title>
              <IconDocumentation width="20"/>
              <div class="category-name">
                {{ category.name }}
              </div>
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
              <IconStar width="15"/>
              <div class="category-name" id="star">
                Star
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-col>
</template>

<script>
import axios from "axios";
import {reactive} from "vue";
import {useRoute} from "vue-router";
import bookmark from "./Bookmark.vue";
import router from "../../router";
import IconDocumentation from "../icons/IconDocumentation.vue";
import IconStar from "../icons/IconStar.vue";
import IconPlusBox from "../icons/IconPlusBox.vue";
import CreateCategoryForm from "../form/CategoryDialog.vue";

export default {
  name: "SideBar",
  components: {
    CreateCategoryForm,
    IconPlusBox,
    IconStar,
    IconDocumentation,
  },

  computed: {
    bookmark() {
      return bookmark;
    },
  },

  setup() {
    const route = useRoute();
    const data = reactive({
      categories: [],
    });

    axios.get("/api/" + route.params.username + "/categories").then((res) => {
      data.categories = res.data.list;
    });
    return { data };
  },

  methods: {
    moveToCategory(category) {
      router.push("/" + this.$route.params.username + "/" + category);
    },
  }
}
</script>

<style scoped>
.v-list-item-title {
  display: flex;
}

.category-title-container {
  display: flex;
  justify-content: space-between;
  /*border-bottom: 1px solid gray;*/
  text-decoration: none;
  margin-bottom: 10px;
}

#category-title {
  margin-left: 10px;
  font-weight: bold;
  font-size: 20px;
}

.category-name {
  margin-left: 10px;
}
</style>