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
          :title=user.username
          :subtitle=user.email
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
        <a href="#" class="follow-items">팔로워: {{ followObj.followerCount }}</a>
        <a href="#" class="follow-items" id="following">팔로잉: {{ followObj.followingCount }}</a>
      </div>

      <div v-if="!rail" class="follow-btn-container">
        <v-btn
            v-if="!isMe"
            id="follow-btn"
            class="btn"
            :color="followObj.followButton.color"
            @click="clickFollow">
          <v-icon id="follow-icon">{{ followObj.followButton.icon }}</v-icon>
          {{ followObj.followButton.text }}
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
            @click="clickAddBookmarkBtn">
          북마크 추가
        </v-btn>
        <BookmarkDialog
            :bookmarkDialogObj="bookmarkDialogObj"
            @submit="addBookmark"/>
      </div>

      <v-divider v-if="rail" class="account-divider"></v-divider>
    </div>

    <div class="side-bar-content">
      <v-list density="compact" nav>
        <div class="category-header-container" v-if="!rail">
          <v-list-subheader class="category-header">카테고리</v-list-subheader>
          <v-btn
              v-if="isMe"
              class="mr-2"
              size="25"
              icon="mdi-plus"
              color="grey-lighten-3"
              elevation="4"
              @click="categoryObj.dialog=true"/>
          <CategoryDialog
              v-bind:categoryDialog="categoryObj"
              @submit="addCategoryByUser"/>
        </div>

        <v-divider v-if="!rail"/>
        <v-list-item
            v-for="(category, i) in categories" key="i"
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
import {categoryStore} from "../../store/category/category";
import router from "../../router";
import CategoryDialog from "../dialog/CategoryDialog.vue";
import BookmarkDialog from "../dialog/BookmarkDialog.vue";
import {getUserInfo} from "../../api/user/userApi";
import {onMounted, reactive, toRefs, watch} from "vue";
import {useRoute} from "vue-router";
import {addCategory, getCategories} from "../../api/category/categoryApi";
import {getUsernameFromCookie} from "../../utils/cookies";
import {addBookmark} from "../../api/bookmark/bookmarkApi";
import {bookmarkStore} from "../../store/bookmark/bookmark";
import {getTags} from "../../api/tag/tagApi";
import {followAndUnfollow, getFollowCount, isFollow} from "../../api/follow/followApi";
import {userStore} from "../../store/user/user";

export default {
  name: 'SideBar',
  components: {BookmarkDialog, CategoryDialog},

  data: () => ({
    route: useRoute(),
    follow: false,
    drawer: true,
    rail: false,

    categoryObj: {
      title: "카테고리 추가",
      btnName: "추가",
      dialog: false,
    },

    bookmarkDialogObj: {
      dialogTitle: "북마크 추가",
      btnName: "추가",
      dialog: false,
      categoryNames: [],

      bookmark: {},
    },
  }),

  setup() {
    const route = useRoute();
    const username = route.params.username;
    const data = reactive({
      isMe: username === getUsernameFromCookie(),
      user: {},
      categories: [],

      followObj: {
        followerCount: 0,
        followingCount: 0,
        follow: Boolean,

        followButton: {
          text: String,
          color: String,
          icon: String,
        }
      },
    });

    const updateCategories = async () => {
      try {
        const response = await getCategories(username);
        data.categories = response.data.list;
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    const showFollowCount = async () => {
      try {
        const followCount = await getFollowCount(username);
        data.followObj.followerCount = followCount.data.data.followerCnt;
        data.followObj.followingCount = followCount.data.data.followingCnt;
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    const addCategoryByUser = async (category) => {
      try {
        await addCategory(getUsernameFromCookie(), category);
        categoryStore.state.status = !categoryStore.state.status;
      } catch (error) {
        alert(error.response.data.message);
      }
    }
    watch(() => (userStore.state.username), (newValue) => {
      data.user.username = newValue;
    })
    watch(() => (categoryStore.state.status), updateCategories);
    watch(() => (bookmarkStore.state.status), updateCategories);
    watch(() => data.followObj.follow, (newValue) => {
      const followButton = data.followObj.followButton;
      followButton.text = newValue ? "팔로우 취소" : "팔로우";
      followButton.color = newValue ? "#E53935" : "#03A9F4";
      followButton.icon = newValue ? "mdi mdi-account-multiple-minus" : "mdi mdi-account-multiple-plus";
      showFollowCount();
    });

    onMounted(async () => {
      try {
        const userInfo = await getUserInfo(username);
        data.user = userInfo.data.data;

        const follow = await isFollow(data.user.userId);
        data.followObj.follow = follow.data.data;

        const categories = await getCategories(username);
        data.categories = categories.data.list;

        const followCount = await getFollowCount(username);
        data.followObj.followerCount = followCount.data.data.followerCnt;
        data.followObj.followingCount = followCount.data.data.followingCnt;
      } catch (error) {
        alert(error.response.data.message);
      }
    });

    return {
      addCategoryByUser,
      ...toRefs(data)
    };
  },

  methods: {
    async clickAddBookmarkBtn() {
      this.bookmarkDialogObj.dialog = true;
      const categoryName = this.route.params.category;
      if (categoryName !== undefined) {
        this.bookmarkDialogObj.bookmark.categoryName = categoryName;
      }
      try {
        const [categoriesResponse, tagsResponse] = await Promise.all([
          getCategories(getUsernameFromCookie()),
          getTags(getUsernameFromCookie())
        ]);

        this.bookmarkDialogObj.categoryNames = categoriesResponse.data.list.map(c => c.name);
        this.bookmarkDialogObj.bookmark.tagList = tagsResponse.data.list.map(t => t.tag.name);
      } catch (error) {
        alert(error.response.data.message);
      }
    },

    async addBookmark(bookmark) {
      bookmark.isPublic = !bookmark.isPublic;
      const username = getUsernameFromCookie();
      const categoryName = this.route.params.category;
      try {
        await addBookmark(username, bookmark);
      } catch (error) {
        alert(error.response.data.message);
      }
      categoryStore.state.status = !categoryStore.state.status;
      bookmarkStore.state.status = !bookmarkStore.state.status;
      this.bookmarkDialogInit();
      if (categoryName === undefined) {
        await router.push(`/${username}/${bookmark.categoryName}`)
      }
    }
    ,

    showBookmark(category) {
      const username = this.route.params.username;
      categoryStore.commit('setCategory', category);
      router.push(`/${username}/${category.name}`);
    }
    ,

    showAllBookmarks() {
      const username = this.route.params.username;
      categoryStore.commit('setCategory', {name: '전체보기'});
      router.push(`/${username}`);
    }
    ,

    async clickFollow() {
      await followAndUnfollow(this.user.userId);
      this.followObj.follow = !this.followObj.follow;
    }
    ,

    bookmarkDialogInit() {
      this.bookmarkDialogObj.bookmark = {
        url: "",
        title: "",
        description: "",
        tags: []
      };
    }
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
