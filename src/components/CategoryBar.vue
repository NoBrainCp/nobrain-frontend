<template>
  <v-app-bar class="app-bar" style="position: fixed" flat border>
    <div class="category-title">
      <v-icon class="mr-2">mdi mdi-bookshelf</v-icon>
      {{ category.name }}
    </div>

    <div class="category-description">
      {{ category.description }}
    </div>

    <v-spacer/>
    <v-btn
        class="btn"
        color="blue"
        elevation="3"
        prepend-icon="mdi mdi-pencil-outline"
        border
        @click="this.categoryObj.dialog=true">
      수정
    </v-btn>
    <CategoryDialog
        v-bind:categoryObj="categoryObj"
        @submit="updateCategory"/>
    <v-btn
        class="btn"
        color="red-accent-4"
        elevation="3"
        prepend-icon="mdi mdi-delete"
        border
        @click="this.confirmObj.dialog=true">
      삭제
    </v-btn>
    <ConfirmDialog
        v-bind:confirmObj="confirmObj"
        @delete="deleteCategory"/>
  </v-app-bar>
</template>

<script>
import CategoryDialog from "./form/CategoryDialog.vue";
import ConfirmDialog from "./dialog/ConfirmDialog.vue";
import {updateCategory} from "../api/category/categoryApi";
import {getUsernameFromCookie} from "../utils/cookies";
import {useRoute} from "vue-router";

export default {
  name: 'CategoryBar',
  components: {ConfirmDialog, CategoryDialog},

  props: {
    isCreated: true,
  },

  // setup() {
  //   const route= useRoute();
  //   return route;
  // },

  data: () => ({
    category: {
      name: "Category Name",
      description: "Category Description",
    },
    test: "",
    categoryObj: {
      title: "카테고리 수정",
      btnName: "수정",
      dialog: false,
    },

    confirmObj: {
      title: "카테고리 삭제",
      text: "정말 카테고리를 삭제하시겠습니까?<br/>삭제하시면 관련된 북마크들까지 모두 삭제됩니다.",
      dialog: false,
    },
  }),

  methods: {
    // async updateCategory(category) {
    //   const response = await updateCategory(getUsernameFromCookie(),  , category);
    //   console.log(response);
    // },

    deleteCategory() {
      // delete API
    },
  }
}

</script>

<style scoped>
.app-bar {
  opacity: 0.9;
}

.icon-folder {
  margin-right: 10px;
}

.category-title {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  padding: 8px 12px;
  margin-left: 50px;
  border-radius: 20px;
  background: #03A9F4;
  color: white;
  font-size: 17px;
  font-weight: 500;
}

.category-description {
  margin-left: 30px;
  color: #03A9F4;
  font-size: 15px;
  font-weight: 400;
}

.btn {
  width: 120px;
  height: 42px;
  margin-right: 10px;
}

.v-toolbar__content > .v-btn:last-child {
  margin-right: 50px;
}
</style>