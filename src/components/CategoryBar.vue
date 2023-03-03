<template>
  <v-app-bar class="app-bar" style="position: fixed" flat border>
    <div class="category-title">
      <span class="mdi mdi-folder icon-folder"></span>
      {{category.name}}
    </div>

    <div class="category-description">
      {{category.description}}
    </div>

    <v-spacer/>

    <v-btn
        class="btn"
        color="blue"
        prepend-icon="mdi mdi-pencil-outline"
        border
        @click="openDialog"
    >
      수정
    </v-btn>
    <v-dialog
        v-model="isShowCategoryDialog"
        persistent
        width="30%"
    >
      <CategoryDialog
          v-bind:isCreated="isCreated"
          @hide="closeDialog"
          @submit="submit"
      />
    </v-dialog>

    <v-btn
        class="btn"
        color="red-accent-4"
        prepend-icon="mdi mdi-delete"
        border
        @click="openConfirm"
    >
      삭제
    </v-btn>
    <v-dialog
        v-model="isShowConfirm"
        width="25%"
    >
      <ConfirmDialog
          v-bind:confirmObj="confirmObj"
          @cancel="closeConfirm"
          @delete="deleteCategory"
      />
    </v-dialog>

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

  data() {
    return {
      isShowCategoryDialog: false,
      isShowConfirm: false,
      isCreated: false,
      category: {
        name: "Category Name",
        description: "Category Description",
      },

      confirmObj: {
        title: "",
        text: "",
      },
    }
  },
  methods: {
    submit(category) {
      console.log(category);
      this.closeDialog();
    },

    openDialog() {
      this.isShowCategoryDialog = true;
    },

    closeDialog() {
      this.isShowCategoryDialog = false;
    },

    openConfirm() {
      this.isShowConfirm = true;
      this.setConfirm("카테고리 삭제", "정말 카테고리를 삭제하시겠습니까?<br/>삭제하시면 관련된 북마크들까지 모두 삭제됩니다.");
    },

    closeConfirm() {
      this.isShowConfirm = false;
    },

    deleteCategory() {
      this.closeConfirm();
      // delete API
    },

    setConfirm(title, text) {
      this.confirmObj.title = title;
      this.confirmObj.text = text;
    }
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