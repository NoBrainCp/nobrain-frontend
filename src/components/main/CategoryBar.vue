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
        v-if="isMe && !isAll"
        class="btn"
        color="blue"
        elevation="3"
        prepend-icon="mdi mdi-pencil-outline"
        border
        @click="updateClick">
      수정
    </v-btn>
    <CategoryDialog
        :categoryDialogObj="categoryDialogObj"
        @submit="updateCategoryData"
        @close="closeCategoryDialog"
    />
    <v-btn
        v-if="isMe && !isAll"
        class="btn mr-15"
        color="red-accent-4"
        elevation="3"
        prepend-icon="mdi mdi-delete"
        border
        @click="confirmObj.dialog=true">
      삭제
    </v-btn>
    <ConfirmDialog
        :confirmObj="confirmObj"
        @delete="deleteCategoryData"
        @close="closeConfirmDialog"
    />
  </v-app-bar>
</template>

<script setup>
import router from "../../router";
import {categoryStore} from "../../store/category/category";
import {favoritesStore} from "../../store/favorites/favorites";
import {bookmarkStore} from "../../store/bookmark/bookmark";
import {privatesStore} from "../../store/privates/privates";
import ConfirmDialog from "../dialog/ConfirmDialog.vue";
import CategoryDialog from "../dialog/CategoryDialog.vue";
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {deleteCategory, getCategory, updateCategory} from "../../api/category/categoryApi";
import {updateAllBookmarksToPrivate} from "../../api/bookmark/bookmarkApi";
import {getUserIdFromStorage, getUsernameFromStorage} from "../../utils/storage";

const route = useRoute();

const confirmObj = ref({
  dialog: false,
  title: "카테고리 삭제",
  text: "정말 카테고리를 삭제하시겠습니까?<br/>삭제하시면 관련된 북마크들까지 모두 삭제됩니다.",
  buttonText: "삭제"
});

const categoryDialogObj = ref({
  dialog: false,
  title: "카테고리 수정",
  btnName: "수정",
  category: {
    name: "",
    description: "",
    isPublic: "",
  },
});

const category = ref({
  name: "",
  description: "",
  public: "",
});

const isMe = ref(route.params.username === getUsernameFromStorage());
const isAll = ref(false);

const userId = ref(getUserIdFromStorage());
const getCategoryList = async() => {
  const username = route.params.username;
  const categoryName = route.params.category;
  if (!categoryName || categoryName === "starred" || categoryName === 'private') {
    if (categoryName === 'starred') {
      category.value.name = "즐겨찾기";
    } else if (categoryName === 'private') {
      category.value.name = "비공개";
    } else {
      category.value.name = "전체 북마크";
    }
    category.value.description = "";
    isAll.value = true;
    return;
  }

  await getCategory(username, categoryName).then((response) => {
    category.value = response.data.data;
    isAll.value = false;
  }).catch((error) => {
    console.log(error);
  })
};

watch(() => route.params.category, () => {
  getCategoryList();
});

onMounted(() => {
  getCategoryList();
});


const updateClick = () => {
  categoryDialogObj.value.dialog = true;
  categoryDialogObj.value.category = {
    name: category.value.name,
    description: category.value.description,
    isPublic: category.value.public,
    }

};

const updateCategoryData = async(categoryObj) => {
  const username = getUsernameFromStorage();
  const categoryOriginName = category.value.name;
  category.value = categoryObj;
  category.value.public = categoryObj.isPublic;
  const categoryData = categoryObj;
  categoryData.name = categoryObj.name.trimEnd();
  await updateCategory(categoryOriginName, categoryData).then(async () => {
    if (!categoryData.isPublic) {
        await updateAllBookmarksToPrivate(categoryData.name);
    }
    closeCategoryDialog();
    await router.push(`/${username}/${category.value.name}`);
    categoryStore.state.status = !categoryStore.state.status;
    bookmarkStore.state.status = !bookmarkStore.state.status;
    privatesStore.state.status = !privatesStore.state.status;
  }).catch((error) => {
    console.log(error);
  })
};
const closeCategoryDialog = () => {
  categoryDialogObj.value.dialog = false;
};

const deleteCategoryData = async() => {
  await deleteCategory(category.value.name).then(() => {
    router.push(`/${getUsernameFromStorage()}`);
    categoryStore.state.status = !categoryStore.state.status;
    favoritesStore.state.status = !favoritesStore.state.status;
    privatesStore.state.status = !privatesStore.state.status;
    closeConfirmDialog();
  }).catch((error) => {
    console.log(error);
  })
};

const closeConfirmDialog = () => {
  confirmObj.value.dialog = false;
}
</script>

<style scoped>
.app-bar {
  opacity: 0.9;
  border-left: none;
  border-right: none;
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

</style>
