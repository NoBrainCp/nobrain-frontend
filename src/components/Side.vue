<template>
  <v-navigation-drawer
      width="320"
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
      style="position: fixed"
  >
    <v-list-item
        prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
        nav
        :title=store.state.username
        :subtitle=store.state.email
        class="account-item"
    >
      <template v-slot:append>
        <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <div v-if="!rail" id="follow-container">
      <a href="#" class="follow-items">팔로워: {{ user.follower }}</a>
      <a href="#" class="follow-items" id="following">팔로잉: {{ user.following }}</a>
    </div>

    <div v-if="!rail" class="follow-btn-container">
      <v-btn
          id="follow-btn"
          class="btn"
          :color="followButton.color"
          @click="clickFollow">
        <v-icon id="follow-icon">{{ followButton.icon }}</v-icon>
        {{ followButton.text }}
      </v-btn>
    </div>

    <div v-if="!rail" id="btn-container">
      <v-btn
          class="btn btn-show-all"
          color="#00BCD4"
          prepend-icon="mdi mdi-text-box-multiple">
        전체보기
      </v-btn>
      <v-btn
          class="btn"
          color="#009688"
          prepend-icon="mdi mdi-bookmark"
          @click="bookmarkDialogObj.dialog=true">
        북마크 추가
      </v-btn>
      <BookmarkDialog
          v-bind:bookmarkObj="bookmarkDialogObj"
          @submit="addBookmark"/>
    </div>

    <v-divider v-if="rail" class="account-divider"></v-divider>
    <v-list density="compact" nav>
      <div class="category-header-container" v-if="!rail">
        <v-list-subheader class="category-header">카테고리</v-list-subheader>
        <v-btn
            class="mr-2"
            size="25"
            icon="mdi-plus"
            color="grey-lighten-3"
            elevation="4"
            @click="categoryObj.dialog=true"/>
        <CategoryDialog
            v-bind:categoryObj="categoryObj"
            @submit="addCategory"/>
      </div>

      <v-divider v-if="!rail"></v-divider>
      <v-list-item v-for="(category, i) in categories" :key="i"
                   :value="category"
                   active-color="light-blue">
        <template v-slot:prepend>
          <v-icon :icon="categories.icon"></v-icon>
        </template>
        <v-list-item-title v-text="categories.name"></v-list-item-title>
        <template v-slot:append>
          <v-badge
              color="blue"
              :content="categories.count"
              inline/>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import CategoryDialog from "./form/CategoryDialog.vue";
import Bookmark from "./main/Bookmark.vue";
import BookmarkDialog from "./form/BookmarkDialog.vue";
import {store} from "../store";
import {getEmailFromCookie, getLoginIdFromCookie, getUserIdFromCookie, getUsernameFromCookie} from "../utils/cookies";
import {getCategories} from "../api/user/userApi";
import {reactive} from "vue";

export default {
  name: 'Side',
  computed: {
    store() {
      return store
    },
  },
  components: {BookmarkDialog, Bookmark, CategoryDialog},

  data: () => ({
    follow: false,
    drawer: true,
    rail: false,

    categoryObj: {
      title: "카테고리 추가",
      btnName: "추가",
      dialog: false,
    },

    bookmarkDialogObj: {
      title: "북마크 추가",
      btnName: "추가",
      dialog: false,
      categoryNames: [
        "java", "spring", "ddd", "aaa"
      ],
    },

    user: {
      name: "Yoon",
      email: "yoon@gmail.com",
      follower: "12",
      following: "235"
    },

    categories: {
      id: Number,
      name: String,
      description: String,
      isPublic: Boolean,
      count: Number,
      icon: "mdi mdi-folder"
    },

    followButton: {
      text: "팔로우",
      color: "#03A9F4",
      icon: "mdi mdi-account-multiple-plus",
    },
  }),

   async setup() {
    const data = reactive({
      category: []
    })
     data.category = await getCategories(getUserIdFromCookie());
     data.category = data.category.data.list;
    // this.categories = await
   },

  methods: {
    clickFollow() {
      this.follow = !this.follow;
      if (this.follow) {
        this.followButton.text = "팔로우 취소";
        this.followButton.color = "#E53935";
        this.followButton.icon = "mdi mdi-account-multiple-minus"
      } else {
        this.followButton.text = "팔로우";
        this.followButton.color = "#03A9F4";
        this.followButton.icon = "mdi mdi-account-multiple-plus"
      }
    },

    addBookmark(bookmark) {
      console.log(bookmark);
    },

    addCategory(category) {
      console.log(category);
    }
  }
}
</script>

<style scoped>
.account-item {
  margin-top: 10px;
}

.account-divider {
  margin-top: 10px;
}

.follow-items {
  font-size: 14px;
  color: black;
  text-decoration: none;
}

.follow-items:hover {
  color: #03A9F4;
  text-decoration: underline;
  text-underline: #03A9F4;
}

#follow-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  font-weight: 500;
}

#following {
  margin-left: 20px;
}

.follow-btn-container {
  display: flex;
  justify-content: center;
}

#follow-icon {
  margin-right: 8px;
}

#follow-btn {
  width: 305px;
  height: 50px;
  background: #03A9F4;
  font-size: 15px;
}

.btn-show-all {
  margin-right: 5px;
}

#btn-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 15px;
}

.btn {
  width: 150px;
  height: 65px;
  color: white;
  font-size: 13px;
  font-weight: bold;
  border-radius: 10px;
}

.category-header-container {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
}

.category-header {
  font-size: 15px;
  font-weight: bold;
}
</style>