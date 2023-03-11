<template>
  <v-navigation-drawer
      width="320"
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
      style="position: fixed"
      id="side-bar"
  >

    <div class="side-bar-header">
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
            v-if="!data.isMe"
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
            prepend-icon="mdi mdi-text-box-multiple"
            @click="showAllBookmarks">
          전체보기
        </v-btn>

        <v-btn
            class="btn"
            color="#009688"
            prepend-icon="mdi mdi-bookmark"
            @click="bookmarkDialog.dialog=true">
          북마크 추가
        </v-btn>
        <BookmarkDialog
            :bookmarkDialog="bookmarkDialog"
            @submit="addBookmark"/>
      </div>

      <v-divider v-if="rail" class="account-divider"></v-divider>
    </div>

    <div class="side-bar-content">
      <v-list density="compact" nav>
        <div class="category-header-container" v-if="!rail">
          <v-list-subheader class="category-header">카테고리</v-list-subheader>
          <v-btn
              v-if="data.isMe"
              class="mr-2"
              size="25"
              icon="mdi-plus"
              color="grey-lighten-3"
              elevation="4"
              @click="categoryDialog.dialog=true"/>
          <CategoryDialog
              :categoryDialog="categoryDialog"
              @submit="addCategoryByUser"/>
        </div>

        <v-divider v-if="!rail"/>
        <v-list-item
            v-for="(category, i) in data.categories" key="i"
            :value="category"
            active-color="light-blue"
            class="category-list-item"
            @click="showBookmark(category)">

          <template v-slot:prepend>
            <v-icon icon="mdi mdi-folder"></v-icon>
          </template>
          <v-list-item-title>{{ category.name }}</v-list-item-title>
          <template v-slot:append>
            <v-badge
                v-if="category.count !== 0"
                color="blue"
                :content="category.count"
                inline/>
          </template>
        </v-list-item>
      </v-list>
    </div>

  </v-navigation-drawer>
</template>

<script>
import {user} from "../api";
import {store} from "../store";
import {categoryStore} from "../store/category/category";
import router from "../router";
import CategoryDialog from "./dialog/CategoryDialog.vue";
import BookmarkDialog from "./dialog/BookmarkDialog.vue";
import {getUserInfo} from "../api/user/userApi";
import {reactive, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {addCategory, getCategories} from "../api/category/categoryApi";
import {getUserIdFromCookie, getUsernameFromCookie} from "../utils/cookies";
import {addBookmark} from "../api/bookmark/bookmarkApi";

export default {
  name: 'SideBar',
  computed: {
    store() {
      return store
    },
  },
  components: {BookmarkDialog, CategoryDialog},

  data: () => ({
    route : useRoute(), //showBookmark 메서드에서 사용중
    follow: false,
    drawer: true,
    rail: false,
    userName: getUsernameFromCookie(),

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
    const route = useRoute();
    const data = reactive({
      isMe: route.params.username === getUsernameFromCookie(),
      user: {},
      categories: []
    });

    const categoryDialog = ref({
      dialog: false,
      title: "카테고리 추가",
      btnName: "추가",
      categoryName: "",
      description: "",
      public: false,
    })

    const bookmarkDialog = ref({
      dialog: false,
      text: "북마크 추가",
      btnName: "추가",
      url: "",
      title: "",
      description: "",
      isPublic: false,
      categoryName: "",
      categoryList: [],
      tags: [],
    })
    const userId = getUserIdFromCookie();
    const username = route.params.username;

    try {
      getUserInfo(username).then((response) => {
        data.user = response.data.data;
      });

      getCategories(username).then((response) => {
        data.categories = response.data.list;
        bookmarkDialog.value.categoryList = data.categories.map(m => m.name);
      });
    } catch (error) {
      alert(error.response.data.message);
    }

    watch(() => (route.params), (newValue) => {
      getCategories(username).then((response) => {
        data.categories = response.data.list;
        bookmarkDialog.value.categoryName = route.params.category;
      });
    });

    const addCategoryByUser = async (category) => {
      try {
        await addCategory(getUsernameFromCookie(), category);
        getCategories(getUsernameFromCookie()).then((response) => {
          data.categories = response.data.list;
        })
      } catch (error) {
        alert(error.response.data.message);
      }
    }

    return {
      data,
      addCategoryByUser,
      categoryDialog,
      bookmarkDialog
    };
  },

  methods: {
    user() {
      return user
    },

    showBookmark(category) {
      const username = this.route.params.username;
      categoryStore.commit('setCategory', category);
      router.push(`/${username}/${category.name}`);
    },

    showAllBookmarks() {
      const username = this.route.params.username;
      router.push(`/${username}`);
    },

    async addBookmark(bookmark) {
      await addBookmark(getUsernameFromCookie(), bookmark);
      await router.push(`/${getUsernameFromCookie()}/${bookmark.categoryName}`);
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

  }
}
</script>

<style scoped>
.side-bar-header {
  /*background: white;*/
  /*position: fixed;*/
  /*left: 7px;*/
  /*z-index: 1;*/
}

.side-bar-content {
}

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

<style>
#side-bar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}
</style>
