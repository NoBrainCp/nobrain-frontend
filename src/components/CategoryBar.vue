<template>
  <v-app-bar class="app-bar" style="position: fixed" flat border>
    <div class="category-title">
      <span class="mdi mdi-folder icon-folder"></span>
      {{ category.name }}
    </div>

    <div class="category-description">
      {{ category.description }}
    </div>

    <v-spacer/>
    <v-btn
        class="btn"
        color="blue"
        prepend-icon="mdi mdi-pencil-outline"
        border
        @click="this.categoryObj.dialog=true"
    >
      수정
    </v-btn>
    <CategoryDialog
        v-bind:categoryObj="categoryObj"
        @submit="updateCategory"/>
    <v-btn
        class="btn"
        color="red-accent-4"
        prepend-icon="mdi mdi-delete"
        border
        @click="this.confirmObj.dialog=true"
    >
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

export default {
  name: 'CategoryBar',
  components: {ConfirmDialog, CategoryDialog},
  props: {
    isCreated: true,
  },

  data: () => ({
    category: {
      name: "Category Name",
      description: "Category Description",
    },

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
    updateCategory(category) {
      console.log(category);
    },

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