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
        :title=data.user.username
        :subtitle=data.user.email
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
      <a href="#" class="follow-items">팔로워: {{ followObj.follower }}</a>
      <a href="#" class="follow-items" id="following">팔로잉: {{ followObj.following }}</a>
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
          @submit="addedCategory"/>
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
            @submit="addedCategory"/>
      </div>

      <v-divider v-if="!rail"/>
      <v-list-item
          v-for="(category, i) in data.categories" key="i"
          :value="category"
          active-color="light-blue"
          class="category-list-item"
          @click="showBookmark(category.name)"
      >

        <template v-slot:prepend>
          <v-icon icon="mdi mdi-folder"></v-icon>
        </template>
        <v-list-item-title>{{ category.name }}</v-list-item-title>
        <template v-slot:append>
          <v-badge
              color="blue"
              :content="category.count"
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
import {getUserInfo} from "../api/user/userApi";
import {reactive, ref} from "vue";
import {createRouter as $router, useRoute, useRouter} from "vue-router";
import {addCategory, getCategories} from "../api/category/categoryApi";
import router from "../router";
import {user} from "../api";

export default {
  name: 'Side',
  computed: {
    store() {
      return store
    },
  },
  components: {BookmarkDialog, Bookmark, CategoryDialog},

  data: () => ({
    router: useRouter(),
    route: useRoute(),
    follow: false,
    drawer: true,
    rail: false,
    userName: getUsernameFromCookie(),

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

    followObj: {
      follower: "12",
      following: "235"
    },
    categories: [],

    followButton: {
      text: "팔로우",
      color: "#03A9F4",
      icon: "mdi mdi-account-multiple-plus",
    },
  }),

  setup() {
    const data = reactive({
      user: {},
      categories: []
    });

    const userId = getUserIdFromCookie();

    try {
      getUserInfo(userId).then((response) => {
        data.user = response.data.data;
      });

      getCategories(userId).then((response) => {
        data.categories = response.data.list;
      });
    } catch (error) {
      console.log("error: " + error);
    }

    const addedCategory = async (category) => {
      try {
        await addCategory(getUsernameFromCookie(), category);
        getCategories(userId).then((response) => {
          data.categories = response.data.list;
        })
      } catch (error) {
        alert(error.response.data.message);
      }
    }

    return {
      data,
      addedCategory};
  },

  methods: {
    user() {
      return user
    },

    showBookmark(categoryName) {
      const username = this.route.params.username;
      router.push(`/${username}/${categoryName}`);
    },

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