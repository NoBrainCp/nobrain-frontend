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
        @click="categoryDialog.dialog=true">
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
import {getUsernameFromCookie} from "../utils/cookies";
import {deleteCategory, updateCategory} from "../api/category/categoryApi";
import {categoryStore} from "../store/category/category";
import router from "../router";
import ConfirmDialog from "./dialog/ConfirmDialog.vue";
import CategoryDialog from "./form/CategoryDialog.vue";

export default {
  name: 'CategoryBar',
  components: {ConfirmDialog, CategoryDialog},

  props: {
    isCreated: true,
  },

  data: () => ({
    route: useRoute(),
    test: "",

    confirmObj: {
      title: "카테고리 삭제",
      text: "정말 카테고리를 삭제하시겠습니까?<br/>삭제하시면 관련된 북마크들까지 모두 삭제됩니다.",
      dialog: false,
    },
  }),

  setup() {
    const route = useRoute();
    const data = ref({
      category: {},
      isMe: route.params.username === getUsernameFromCookie(),
      isAll: false,
    });
    const categoryDialog = ref({
      dialog: false,
      title: "카테고리 수정",
      btnName: "수정",
      originName: String,
      name: String,
      description: String,
      public: Boolean,
    });

    watch(() => (route.params), (newValue) => {
      if (newValue.category === undefined) {
        data.value.isAll = true;
        data.value.category = {name: '전체 북마크'};
      } else {
        data.value.isAll = false;
        data.value.category = categoryStore.state.category;
        categoryDialog.value.originName = categoryStore.state.category.name;
        categoryDialog.value.name = categoryStore.state.category.name;
        categoryDialog.value.description = categoryStore.state.category.description;
        categoryDialog.value.public = categoryStore.state.category.public;
      }
    });

    watch(() => categoryStore.state.category, (newCategory, oldCategory) => {
      data.value.category = newCategory;
    });

    onMounted(() => {
      data.value.isAll = true;
      data.value.category = {name: '전체 북마크'};
    })

    return {
      data,
      categoryDialog
    };
  },

  methods: {
    async updateCategory(category) {
      try {
        await updateCategory(getUsernameFromCookie(), category.originName, category);
        categoryStore.commit('setCategory', category);
        await router.push(`/${getUsernameFromCookie()}/${category.name}`);
      } catch (error) {
        alert(error.response.data.message);
      }

    },

    async deleteCategory() {
      try {
        await deleteCategory(getUsernameFromCookie(), categoryStore.state.category.name);
        categoryStore.commit('setCategory', '');
        await router.push(`/${getUsernameFromCookie()}`);
      } catch(error) {
        alert(error.response.data.message);
      }
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