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
          :prepend-avatar=data.user.profileImage
          nav
          :title=data.user.username
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
            :style="{width: buttonSize.buttonWidth, height: buttonSize.buttonHeight}"
            class="btn"
            color="#00BCD4"
            prepend-icon="mdi mdi-text-box-multiple"
            @click="showAllBookmarks">
          전체보기
        </v-btn>

        <v-btn
            :style="{width: buttonSize.buttonWidth, height: buttonSize.buttonHeight}"
            v-if="isMe"
            class="btn"
            color="#009688"
            prepend-icon="mdi mdi-bookmark"
            @click="clickAddBookmarkBtn">
          북마크 추가
        </v-btn>
        <BookmarkDialog
            :bookmarkDialogObj="bookmarkDialogObj"
            @submit="addBookmarkData"
            @close="closeBookmarkDialog"
        />
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
              @click="categoryDialogObj.dialog=true"/>
          <CategoryDialog
              :categoryDialogObj="categoryDialogObj"
              @submit="addCategoryByUser"
              @close="closeCategoryDialog"
          />
        </div>

        <v-divider v-if="!rail"/>
        <v-list-item @click="showStarredBookmarks">
          <template v-slot:prepend>
            <v-icon color="light-blue" icon="mdi mdi-star-box"></v-icon>
          </template>
          <v-list-item-title>Favorites</v-list-item-title>
          <template v-slot:append>
            <v-badge
                v-if="countData.starredCount !== 0"
                color="blue"
                :content="countData.starredCount"
                inline/>
          </template>
        </v-list-item>
        <v-list-item @click="showPrivateBookmarks" v-if="data.user.username === myName">
          <template v-slot:prepend>
            <v-icon color="light-blue" icon="mdi mdi-eye-lock-outline"></v-icon>
          </template>
          <v-list-item-title>Private</v-list-item-title>
          <template v-slot:append>
            <v-badge
                v-if="countData.privateCount !== 0"
                color="blue"
                :content="countData.privateCount"
                inline/>
          </template>
        </v-list-item>
        <v-list-item
            v-model="categoryList"
            v-for="(category, i) in data.categories"
            :key="i"
            :value="category"
            @click="showBookmark(category)">

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

<script setup>
import {categoryStore} from "../../store/category/category";
import router from "../../router";
import CategoryDialog from "../dialog/CategoryDialog.vue";
import BookmarkDialog from "../dialog/BookmarkDialog.vue";
import {getUserInfo} from "../../api/user/userApi";
import {onMounted, reactive, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {addCategory, getCategories} from "../../api/category/categoryApi";
import {getUsernameFromCookie} from "../../utils/cookies";
import {addBookmark, getPrivateBookmarksCount, getStarredBookmarksCount} from "../../api/bookmark/bookmarkApi";
import {store} from "../../store/index"
import {bookmarkStore} from "../../store/bookmark/bookmark";
import {followStore} from "../../store/follow/follow"
import {getTags} from "../../api/tag/tagApi";
import {followAndUnfollow, getFollowCount, isFollow} from "../../api/follow/followApi";
import {userStore} from "../../store/user/user";
import {favoritesStore} from "../../store/favorites/favorites";
import {privatesStore} from "../../store/privates/privates";

const route = useRoute();
const myName = ref(getUsernameFromCookie());
const username = ref(route.params.username);
const drawer = ref(true);
const rail = ref(false);

// activeIndex: null,
const categoryDialogObj = ref({
  dialog: false,
  title: "카테고리 추가",
  btnName: "추가",
  isPublic: true
});
const categoryList = ref("");

const bookmarkDialogObj = ref({
  dialog: false,
  dialogTitle: "북마크 추가",
  btnName: "추가",
  categoryNames: [],

  bookmark: {
    url: "",
    title: "",
    description: "",
    categoryName: "",
    tags: [],
    tagList: [],
    isPublic: false,
    isStarred: false,
  },
});

const isMe = ref(username.value === getUsernameFromCookie());
const countData = ref({
  starredCount: '',
  privateCount: '',
});

const buttonSize = ref({
  buttonWidth: '150px',
  buttonHeight: '75px',
});

const data = reactive({
  user: {},
  categories: [],
});

const followObj = ref({
  followerCount: 0,
  followingCount: 0,
  follow: Boolean,

  followButton: {
    text: '',
    color: String,
    icon: String,
  }
});

const updateCategories = async () => {
  await getCategories(username.value).then((response) => {
    data.categories = response.data.list;
  }).catch((error) => {
    console.log(error);
    alert("카테고리에 대한 정보를 가져올 수 없습니다.");
  })
};

const showFollowCount = async () => {
  await getFollowCount(username.value).then((followCount) => {
    followObj.value.followerCount = followCount.data.data.followerCnt;
    followObj.value.followingCount = followCount.data.data.followingCnt;
  }).catch((error) => {
    console.log(error);
    alert("팔로우/팔로잉 인원 수에 대한 정보를 가져올 수 없습니다.");
  })
};

const addCategoryByUser = async (category) => {
  await addCategory(getUsernameFromCookie(), category).then(() => {
    categoryStore.state.status = !categoryStore.state.status;
    categoryDialogObj.value.dialog = false;
  }).catch(() => {
    alert("빈 문자열 혹은 동일한 카테고리 이름을 생성 할 수 없습니다.")
  });
};

const closeCategoryDialog = () => {
  categoryDialogObj.value.dialog = false;
  categoryDialogObj.value.name = "";
  categoryDialogObj.value.description = "";
  categoryDialogObj.value.isPublic = true;
};

const clickFollowButton = async (isFollow) => {
  const followButton = followObj.value.followButton;
  followButton.text = isFollow ? "팔로우 취소" : "팔로우";
  followButton.color = isFollow ? "#E53935" : "#03A9F4";
  followButton.icon = isFollow ? "mdi mdi-account-multiple-minus" : "mdi mdi-account-multiple-plus";
  await showFollowCount();
};

const getStarredCount = async () => {
  await getStarredBookmarksCount(username.value).then((starredCnt) => {
    countData.value.starredCount = starredCnt.data.data;
  }).catch((error) => {
    console.log(error);
    alert("즐겨찾기 북마크 개수에 대한 정보를 가져올 수 없습니다.");
  })
};

const getPrivateCount = async () => {
  await getPrivateBookmarksCount(username.value).then((privateCnt) => {
    countData.value.privateCount = privateCnt.data.data;
  }).catch((error) => {
    console.log(error);
    alert("비공개 북마크 개수에 대한 정보를 가져올 수 없습니다.");
  })
};

watch(() => categoryStore.state.status, updateCategories);
watch(() => bookmarkStore.state.status, updateCategories);
watch(() => favoritesStore.state.status, getStarredCount);
watch(() => privatesStore.state.status, getPrivateCount);
watch(() => followStore.state.status, showFollowCount);
watch(() => (userStore.state.username), (newValue) => {
  data.user.username = newValue;
});

watch(() => (userStore.state.profileImage), (newValue) => {
  data.user.profileImage = newValue;
});

//t
watch(() => followObj.value.follow, (newValue) => {
  console.log(newValue);
  clickFollowButton(newValue);
});

onMounted(async () => {
  if (!isMe.value) {
    buttonSize.value.buttonWidth = '305px';
    buttonSize.value.buttonHeight = '55px';
  }
  const noProfileImage = "src/assets/images/user-no-image.png";
  await getUserInfo(username.value).then((userInfo) => {
    data.user = userInfo.data.data;

    if (data.user.profileImage === null) {
      data.user.profileImage = noProfileImage;
    }
  }).catch((error) => {
    console.log(error);
    alert("유저 정보를 가져올 수 없습니다.");
  });
  await isFollow(data.user.userId).then((follow) => {
    followObj.value.follow = follow.data.data;
  }).catch((error) => {
    console.log(error);
    alert("팔로우 정보를 가져올 수 없습니다.");
  });
  await updateCategories();
  await showFollowCount();
  await getStarredCount();
  await getPrivateCount();

  // const category = route.params.category;
  // data.activeIndex = data.categories.findIndex(c => c.name === category);
  // console.log(data.activeIndex);
});

const clickAddBookmarkBtn = async () => {
  if (data.categories.length === 0) {
    alert("카테고리를 먼저 추가해주세요.");
    return;
  }
  const categoryName = route.params.category;
  bookmarkDialogObj.value.dialog = true;
  bookmarkDialogObj.value.bookmark.categoryName = categoryName;
  bookmarkDialogObj.value.bookmark.isPublic = true;

  const [categoriesResponse, tagsResponse] = await Promise.all([
    getCategories(username.value),
    getTags(username.value),
  ]);
  bookmarkDialogObj.value.categoryNames = categoriesResponse.data.list.map(c => c.name);
  bookmarkDialogObj.value.bookmark.tagList = tagsResponse.data.list.map(t => t.tag.name);
};

const addBookmarkData = async (bookmark) => {
  await addBookmark(username.value, bookmark).then(() => {
    bookmarkDialogInit();
    bookmarkDialogObj.value.dialog = false;
    router.push(`/${username.value}/${bookmark.categoryName}`);
    categoryStore.state.status = !categoryStore.state.status;
    bookmarkStore.state.status = !bookmarkStore.state.status;
    privatesStore.state.status = !privatesStore.state.status;
  }).catch((error) => {
    console.log(error);
    alert("북마크를 추가할 수 없습니다.");
  })
};

const closeBookmarkDialog = () => {
  bookmarkDialogObj.value.dialog = false;
  bookmarkDialogObj.value.bookmark = {};
};


const clickFollower = () => {
  followStore.commit('setFollowWindow', 'follower');
  store.commit('setWindow', 'follow');
};

const clickFollowing = () => {
  followStore.commit('setFollowWindow', 'following');
  store.commit('setWindow', 'follow');
};

const showBookmark = (category) => {
  router.push(`/${username.value}/${category.name}`);
};

const showAllBookmarks = () => {
  router.push(`/${username.value}`);
  bookmarkStore.state.status = !bookmarkStore.state.status;
};

const showStarredBookmarks = () => {
  router.push(`/${username.value}/starred`);
};

const showPrivateBookmarks = () => {
  router.push((`/${username.value}/private`));
};

const clickFollow = async () => {
  await followAndUnfollow(data.user.userId).then(() => {
    followObj.value.follow = !followObj.value.follow;
  }).catch((error) => {
    console.log(error);
    alert("팔로우 버튼에 문제가 발생하였습니다.");
  })
};

const bookmarkDialogInit = () => {
  bookmarkDialogObj.value.bookmark = {
    url: "",
    title: "",
    description: "",
    tags: []
  }
};
</script>

<style scoped>
/*.category-active {*/
/*  background: #03A9F4;*/
/*}*/

/*.side-bar-header {*/
/*  background: white;*/
/*  position: relative;*/
/*  z-index: 1;*/
/*}*/

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
