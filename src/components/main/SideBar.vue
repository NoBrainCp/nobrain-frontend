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
          :prepend-avatar=user.profileImage
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
        <span class="follow-items" @click="clickFollower">팔로워: {{ followObj.followerCount }}</span>
        <span class="follow-items" id="following" @click="clickFollowing">팔로잉: {{ followObj.followingCount }}</span>
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
            :style="{width: buttonWidth, height: buttonHeight}"
            class="btn"
            color="#00BCD4"
            prepend-icon="mdi mdi-text-box-multiple"
            @click="showAllBookmarks">
          전체보기
        </v-btn>

        <v-btn
            :style="{width: buttonWidth, height: buttonHeight}"
            v-if="isMe"
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
        <v-list-item @click="showStarredBookmarks">
          <template v-slot:prepend>
            <v-icon color="light-blue" icon="mdi mdi-star"></v-icon>
          </template>
          <v-list-item-title>Favorites</v-list-item-title>
          <template v-slot:append>
            <v-badge
                color="blue"
                :content="starredCount"
                inline/>
          </template>
        </v-list-item>
        <v-list-item @click="showPrivateBookmarks" v-if="user.username === this.myName">
          <template v-slot:prepend>
            <v-icon color="light-blue" icon="mdi mdi-eye-lock-outline"></v-icon>
          </template>
          <v-list-item-title>Private</v-list-item-title>
          <template v-slot:append>
            <v-badge
                color="blue"
                :content="privateCount"
                inline/>
          </template>
        </v-list-item>
        <v-list-item
            v-for="(category, i) in categories"
            :key="i"
            :value="category"
            @click="showBookmark(category); toggleActive(i, category)">

          <template v-slot:prepend>
            <v-icon :icon="category.public ? 'mdi mdi-folder' : 'mdi mdi-folder-lock'"></v-icon>
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
import {deleteCategoryIdFromCookie, getUsernameFromCookie, saveCategoryId} from "../../utils/cookies";
import {addBookmark, getPrivateBookmarksCount, getStarredBookmarksCount} from "../../api/bookmark/bookmarkApi";
import {store} from "../../store/index"
import {bookmarkStore} from "../../store/bookmark/bookmark";
import {followStore} from "../../store/follow/follow"
import {getTags} from "../../api/tag/tagApi";
import {followAndUnfollow, getFollowCount, isFollow} from "../../api/follow/followApi";
import {userStore} from "../../store/user/user";
import {favoritesStore} from "../../store/favorites/favorites";
import {privatesStore} from "../../store/privates/privates";

export default {
  name: 'SideBar',
  components: {BookmarkDialog, CategoryDialog},

  data: () => ({
    route: useRoute(),
    follow: false,
    drawer: true,
    rail: false,
    myName: getUsernameFromCookie(),
    // activeIndex: null,

    categoryObj: {
      title: "카테고리 추가",
      btnName: "추가",
      dialog: false,
      isPublic: true
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
      starredCount: '',
      privateCount: '',
      buttonWidth: '150px',
      buttonHeight: '75px',

      user: {},
      profileNoImage: "src/assets/images/nobrain-no-image.png",
      categories: [],

      followObj: {
        followerCount: 0,
        followingCount: 0,
        follow: Boolean,

        followButton: {
          text: '',
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

    const addCategoryByUser = (category) => {
      addCategory(getUsernameFromCookie(), category).then(() => {
        categoryStore.state.status = !categoryStore.state.status;
      }).catch(() => {
        alert("빈 문자열 혹은 동일한 카테고리 이름을 생성 할 수 없습니다.")
      });
    };

    const clickFollowButton = (isFollow) => {
      const followButton = data.followObj.followButton;
      followButton.text = isFollow ? "팔로우 취소" : "팔로우";
      followButton.color = isFollow ? "#E53935" : "#03A9F4";
      followButton.icon = isFollow ? "mdi mdi-account-multiple-minus" : "mdi mdi-account-multiple-plus";
      showFollowCount();
    };

    async function getStarredCount() {
      const starredCnt = await getStarredBookmarksCount(username);
      data.starredCount = starredCnt.data.data;
    }

    async function getPrivateCount() {
      const privateCnt = await getPrivateBookmarksCount(username);
      data.privateCount = privateCnt.data.data;
    }

    watch(() => (categoryStore.state.status), updateCategories);
    watch(() => (bookmarkStore.state.status), updateCategories);

    watch(() => (userStore.state.username), (newValue) => {
      data.user.username = newValue;
    });

    watch(() => favoritesStore.state.status, getStarredCount);
    watch(() => privatesStore.state.status, getPrivateCount);

    watch(() => (userStore.state.profileImage), (newValue) => {
      data.user.profileImage = newValue;
    });

    watch(() => data.followObj.follow, (newValue) => {
      clickFollowButton(newValue);
    });

    watch(() => followStore.state.status, (newValue) => {
      showFollowCount();
    })

    onMounted(() => {
      if (!data.isMe) {
        data.buttonWidth = '305px';
        data.buttonHeight = '55px';
      }

    });

    onMounted(async () => {
      try {
        const noProfileImage = "src/assets/images/user-no-image.png";
        const userInfo = await getUserInfo(username);
        data.user = userInfo.data.data;

        if (data.user.profileImage === null) {
          data.user.profileImage = noProfileImage;
        }

        const follow = await isFollow(data.user.userId);
        data.followObj.follow = follow.data.data;

        const categories = await getCategories(username);
        data.categories = categories.data.list;

        if (!data.isMe) {
          data.buttonWidth = '305px';
          data.buttonHeight = '55px';
        }
        // const category = route.params.category;
        // data.activeIndex = data.categories.findIndex(c => c.name === category);
        // console.log(data.activeIndex);

        const followCount = await getFollowCount(username);
        data.followObj.followerCount = followCount.data.data.followerCnt;
        data.followObj.followingCount = followCount.data.data.followingCnt;

        const starredCnt = await getStarredBookmarksCount(username);
        data.starredCount = starredCnt.data.data;

        const privateCnt = await getPrivateCount(username);
        data.privateCount = privateCnt.data.data;

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
      try {
        if (this.categories.length === 0) {
          alert("카테고리를 먼저 추가해주세요.");
          return;
        }
        const categoryName = this.route.params.category;
        this.bookmarkDialogObj.dialog = true;
        this.bookmarkDialogObj.bookmark.categoryName = categoryName;
        this.bookmarkDialogObj.bookmark.isPublic = true;

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
      const username = getUsernameFromCookie();
      try {
        await addBookmark(username, bookmark);
        this.bookmarkDialogInit();
        await router.push(`/${username}/${bookmark.categoryName}`);
        categoryStore.state.status = !categoryStore.state.status;
        bookmarkStore.state.status = !bookmarkStore.state.status;
        privatesStore.state.status = !privatesStore.state.status;
      } catch (error) {
        alert(error.response.data.message);
      }
    },

    clickFollower() {
      followStore.commit('setFollowWindow', 'follower');
      store.commit('setWindow', 'follow');
    },

    clickFollowing() {
      followStore.commit('setFollowWindow', 'following');
      store.commit('setWindow', 'follow');
    },

    async showBookmark(category) {
      const username = this.route.params.username;
      saveCategoryId(category.id);
      await router.push(`/${username}/${category.name}`);
    },

    async showAllBookmarks() {
      const username = this.route.params.username;
      deleteCategoryIdFromCookie();
      await router.push(`/${username}`);
      bookmarkStore.state.status = !bookmarkStore.state.status;
    },

    async showStarredBookmarks() {
      const username = this.route.params.username;
      await router.push(`/${username}/starred`);
    },

    async showPrivateBookmarks() {
      const username = this.route.params.username;
      await router.push((`/${username}/private`));
    },

    async clickFollow() {
      await followAndUnfollow(this.user.userId);
      this.followObj.follow = !this.followObj.follow;
    },

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
.category-active {
  background: #03A9F4;
}

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
  cursor: pointer;
  color: #03A9F4;
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

#btn-container {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
  margin-top: 15px;
}

.btn {
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
