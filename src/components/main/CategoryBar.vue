<template>
  <v-app-bar class="app-bar" style="position: fixed" flat border>
    <div class="category-title">
      <v-icon class="mr-2">mdi mdi-bookshelf</v-icon>
      {{ data.category.name }}
    </div>

    <div class="category-description">
      {{ data.category.description }}
    </div>

    <v-spacer/>
    <v-btn
        v-if="data.isMe && !data.isAll"
        class="btn"
        color="blue"
        elevation="3"
        prepend-icon="mdi mdi-pencil-outline"
        border
        @click="updateClick">
      수정
    </v-btn>
    <CategoryDialog
        :categoryDialog="categoryDialog"
        @submit="updateCategory"/>
    <v-btn
        v-if="data.isMe && !data.isAll"
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
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {
  getUserIdFromCookie,
  getUsernameFromCookie
} from "../../utils/cookies";
import {deleteCategory, getCategory, updateCategory} from "../../api/category/categoryApi";
import {categoryStore} from "../../store/category/category";
import router from "../../router";
import ConfirmDialog from "../dialog/ConfirmDialog.vue";
import CategoryDialog from "../dialog/CategoryDialog.vue";
import {favoritesStore} from "../../store/favorites/favorites";
import {updateAllBookmarksToPrivate} from "../../api/bookmark/bookmarkApi";
import {bookmarkStore} from "../../store/bookmark/bookmark";
import {privatesStore} from "../../store/privates/privates";

export default {
  name: 'CategoryBar',
  components: {ConfirmDialog, CategoryDialog},

  data: () => ({
    route: useRoute(),

    confirmObj: {
      title: "카테고리 삭제",
      text: "정말 카테고리를 삭제하시겠습니까?<br/>삭제하시면 관련된 북마크들까지 모두 삭제됩니다.",
      dialog: false,
      buttonText: "삭제"
    },
  }),

  setup() {
    const route = useRoute();
    const data = ref({
      category: {
        name: "",
        description: "",
        public: "",
      },
      isMe: route.params.username === getUsernameFromCookie(),
      isAll: false,
    });

    const categoryDialog = ref({
      dialog: false,
      title: "카테고리 수정",
      btnName: "수정",
      name: String,
      description: String,
      isPublic: Boolean,
    });

    async function getCategoryList() {
      try {
        const username = route.params.username;
        const categoryName = route.params.category;

        if (!categoryName || categoryName === "starred" || categoryName === 'private') {
          if (categoryName === 'starred') {
            data.value.category.name = "즐겨찾기";
          } else if(categoryName === 'private') {
            data.value.category.name = '비공개';
          } else {
            data.value.category.name = '전체 북마크';
          }
          data.value.category.description = "";
          data.value.isAll = true;
          return;
        }
        const response = await getCategory(username, categoryName);
        data.value.category = response.data.data;
        data.value.isAll = false;

      } catch (error) {
        console.log(error);
      }
    }

    watch(() => route.params.category, () => {
      getCategoryList();
    });

    onMounted(() => {
      getCategoryList();
    });

    return {
      data,
      categoryDialog
    };
  },

  methods: {
    updateClick() {
      this.categoryDialog.dialog = true
      this.categoryDialog.name = this.data.category.name;
      this.categoryDialog.description = this.data.category.description;
      this.categoryDialog.isPublic = this.data.category.public;
    },

    async updateCategory(category) {
      try {
        const categoryName = category.name;
        const categoryOriginName = this.data.category.name;
        const userId = getUserIdFromCookie();
        this.data.category.name = category.name;
        this.data.category.description = category.description;
        this.data.category.public = category.isPublic;
        await updateCategory(getUsernameFromCookie(), categoryOriginName, category);
        await updateAllBookmarksToPrivate(userId, this.data.category.name);
        await router.push(`/${getUsernameFromCookie()}/${categoryName}`);
        categoryStore.state.status = !categoryStore.state.status;
        bookmarkStore.state.status = !bookmarkStore.state.status;
        privatesStore.state.status = !privatesStore.state.status;
      } catch (error) {
        alert(error.response);
      }
    },

    async deleteCategory() {
      try {
        await deleteCategory(getUsernameFromCookie(), this.data.category.name);
        await router.push(`/${getUsernameFromCookie()}`);
        categoryStore.state.status = !categoryStore.state.status;
        favoritesStore.state.status = !favoritesStore.state.status;
        privatesStore.state.status = !privatesStore.state.status;
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  }
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

.v-toolbar__content > .v-btn:last-child {
  margin-right: 50px;
}
</style>