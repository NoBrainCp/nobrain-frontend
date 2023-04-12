<template>
  <v-row>
    <v-col v-for="bookmark in bookmarks"
           :key="bookmark.id"
           cols="auto">
      <v-hover v-slot="{ isHovering, props }">
        <v-card
            class="mx-auto bookmark-card"
            v-bind="props"
            :elevation="isHovering ? 15 : 3">
          <v-img
              :src="bookmark.image === null ? '../src/assets/images/nobrain-no-image.png' : bookmark.image"
              class="bookmark-img"
              >
            <v-overlay
                v-model="overlay"
                :model-value="isHovering"
                contained
                scrim="#424242"
                class="align-center justify-center">
              <v-btn
                  :href="bookmark.url"
                  target="_blank"
                  color="light-blue"
                  variant="flat">Move
              </v-btn>
            </v-overlay>
          </v-img>
          <div class="card-header">
            <v-card-subtitle class="mt-3">{{ bookmark.createdAt }}</v-card-subtitle>
            <v-col v-if="isMe" class="icon-container">
              <v-icon
                  size="27"
                  :color="bookmark.public ? 'indigo' : 'green-darken-3'"
                  :icon="bookmark.public ? 'mdi mdi-lock-open-variant' : 'mdi mdi-lock'"
                  @click="clickLock(bookmark)"/>
              <v-icon
                  size="27"
                  :color="bookmark.starred ? 'light-blue' : 'grey-lighten-1'"
                  class="mdi mdi-star icon-star"
                  @click="clickStar(bookmark)"/>
              <v-menu
                  location="bottom"
                  transition="scale-transition"
                  open-on-hover>
                <template v-slot:activator="{ props }">
                  <v-chip
                      class="bookmark-chip mt-1 mdi mdi-dots-horizontal"
                      elevation="1"
                      @click=""
                      append-icon="mdi-chevron-down"
                      v-bind="props"/>
                </template>
                <v-list class="bookmark-sub-btn-list">
                  <v-list-item
                      class="text-blue-accent-4"
                      prepend-icon="mdi mdi-pencil-outline"
                      @click="clickEditBookmarkBtn(bookmark, bookmark.id)">
                    <v-list-item-title>수정</v-list-item-title>
                  </v-list-item>
                  <v-divider/>
                  <v-list-item
                      class="text-red-accent-4"
                      prepend-icon="mdi mdi-delete"
                      @click="clickDeleteBookmarkBtn(bookmark.id)">
                    <v-list-item-title>삭제</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

            </v-col>
          </div>

          <v-card-text class="card-text">
            <div class="text-h6 text-light-blue font-weight-bold mt-3">
              {{ bookmark.title }}
            </div>
            <div class="mt-1">
              {{ bookmark.description }}
            </div>
          </v-card-text>
          <div class="url-container">
            <v-divider/>
            <v-card-subtitle class="text-subtitle-2">
              <a :href="bookmark.url" class="bookmark-link-tag" target="_blank">
                <v-icon class="icon-link" size="17">mdi mdi-link-variant</v-icon>
                {{ bookmark.url }}
              </a>
            </v-card-subtitle>
          </div>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
  <ConfirmDialog
      :confirmObj="confirmObj"
      @delete="deleteBookmark"/>
  <BookmarkDialog
      :bookmarkDialogObj="bookmarkDialogObj"
      @submit="updateBookmarkData"
      @close="closeBookmarkDialog"
  />
</template>

<script setup>
import router from "../../router";
import {bookmarkStore} from "../../store/bookmark/bookmark";
import {favoritesStore} from "../../store/favorites/favorites";
import {privatesStore} from "../../store/privates/privates";
import ConfirmDialog from "../dialog/ConfirmDialog.vue";
import BookmarkDialog from "../dialog/BookmarkDialog.vue";
import {useRoute} from "vue-router";
import {onMounted, ref, watch, watchEffect} from "vue";
import {
  deleteBookmarkById,
  getAllBookmarks,
  getBookmarks, getPrivateBookmarks,
  getStarredBookmarks,
  updateBookmark,
  updatePublic,
  updateStarred
} from "../../api/bookmark/bookmarkApi";
import {getCategories, getCategoryByBookmarkId} from "../../api/category/categoryApi";
import {getTags, getTagsByBookmarkId} from "../../api/tag/tagApi";
import {getUsernameFromCookie} from "../../utils/cookies";


const bookmarkId = ref("");

const confirmObj = ref({
  dialog: false,
  title: "북마크 삭제",
  text: "정말 북마크를 삭제하시겠습니까?",
  buttonText: "삭제",
});

const bookmarkDialogObj = ref({
  dialog: false,
  dialogTitle: "북마크 수정",
  btnName: "수정",
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

const route = useRoute();
const username = ref(route.params.username);
const isMe = ref(username.value === getUsernameFromCookie());
const bookmarks = ref([]);
const overlay = ref(false);
const loadData = async () => {
  const username = route.params.username;
  const categoryName = route.params.category;
  if (!categoryName) {
    await getAllBookmarks(username).then((response) => {
      bookmarks.value = response.data.list;
    }).catch((error) => {
      console.log(error);
    });
  } else if (categoryName === 'starred') {
    await getStarredBookmarks(username).then((response) => {
      bookmarks.value = response.data.list;
    }).catch((error) => {
      console.log(error);
    });
  } else if (categoryName === 'private') {
    await getPrivateBookmarks().then((response) => {
      bookmarks.value = response.data.list;
    }).catch((error) => {
      console.log(error);
    });
  } else {
    await getBookmarks(username, categoryName).then((response) => {
      bookmarks.value = response.data.list;
    }).catch((error) => {
      console.log(error);
    });
  }
};

watch([() => route.params, () => bookmarkStore.state.status], loadData);
watch(() => bookmarkStore.state.bookmarks, () => {
  if (Object.keys(bookmarkStore.state.bookmarks).length === 0) {
    loadData();
  } else {
    bookmarks.value = bookmarkStore.state.bookmarks;
  }
});

onMounted(() => {
  loadData();
});

const clickEditBookmarkBtn = async (bookmark, bookmarkId) => {
  bookmarkStore.state.status = !bookmarkStore.state.status;
  const [categoryListResp, categoryResp, tagsResp, allTagsResp] = await Promise.all([
    getCategories(getUsernameFromCookie()),
    getCategoryByBookmarkId(bookmarkId),
    getTagsByBookmarkId(getUsernameFromCookie(), bookmarkId),
    getTags(getUsernameFromCookie())
  ]);
  bookmarkDialogObj.value.bookmark = bookmark;
  bookmarkDialogObj.value.dialog = true;
  bookmarkDialogObj.value.bookmark.categoryName = categoryResp.data.data.name;
  bookmarkDialogObj.value.bookmark.isPublic = bookmark.public;

  bookmarkDialogObj.value.categoryNames = categoryListResp.data.list.map(({name}) => name);
  bookmarkDialogObj.value.bookmark.tags = tagsResp.data.list.map(({tagName}) => tagName);
  bookmarkDialogObj.value.bookmark.tagList = allTagsResp.data.list.map(({tagName}) => tagName);
};

const updateBookmarkData = async (bookmark) => {
  const bookmarkId = bookmarkDialogObj.value.bookmark.id;
  await updateBookmark(bookmarkId, bookmark).then(() => {
    bookmarkDialogObj.value.dialog = false;
    router.push(`/${username.value}/${bookmark.categoryName}`);
    bookmarkStore.state.status = !bookmarkStore.state.status;
    privatesStore.state.status = !privatesStore.state.status;
  }).catch((error) => {
    console.log(error);
  })
};

const closeBookmarkDialog = () => {
  bookmarkDialogObj.value.dialog = false;
  bookmarkDialogObj.value.bookmark = {};
};

const clickDeleteBookmarkBtn = (bookmarkIdValue) => {
  bookmarkId.value = bookmarkIdValue;
  confirmObj.value.dialog = true;
};

const deleteBookmark = async () => {
  await deleteBookmarkById(bookmarkId.value).then(() => {

    const index = bookmarks.value.findIndex(bookmark => bookmark.id === bookmarkId.value);
    confirmObj.value.dialog = false;
    if (index !== -1) {
      bookmarks.value.splice(index, 1);
    }
    privatesStore.state.status = !privatesStore.state.status;
    favoritesStore.state.status = !favoritesStore.state.status;
    bookmarkStore.state.status = !bookmarkStore.state.status;
  });

};

const clickStar = async (bookmark) => {
  bookmark.starred = !bookmark.starred;
  await updateStarred(bookmark.id, bookmark.starred).then(() => {
    favoritesStore.state.status = !favoritesStore.state.status;
  }).catch((error) => {
    console.log(error);
  })
};

const clickLock = async (bookmark) => {
  await getCategoryByBookmarkId(bookmark.id).then((response) => {
    if (!response.data.data.public) {
      alert("카테고리가 비공개로 설정되어 있습니다.");
    } else {
      bookmark.public = !bookmark.public;
      updatePublic(bookmark.id, bookmark.public).then(() => {
        privatesStore.state.status = !privatesStore.state.status;
      }).catch((error) => {
        console.log(error);
      })
    }
  }).catch((error) => {
    console.log(error);
  })
};

</script>

<style scoped>

.bookmark-card {
  width: 270px;
  height: 350px;
  border: 2px solid #f3f3f3;
  border-radius: 15px;
}

.bookmark-img {
  height: 160px;
}

.card-header {
  display: flex;
}

.icon-container {
  position: absolute;
  left: 115px;
}

.icon-star {
  margin: 0 10px;
}

.bookmark-chip {
  height: 17px;
}

.bookmark-sub-btn-list {
  margin-top: 5px;
  position: relative;
  right: 55px;
  border: 1px solid #f3f3f3;
}

.card-text {
  margin-top: -25px;
}

.icon-link {
  margin-right: 5px;
}

.url-container {
  width: 100%;
  position: absolute;
  bottom: 3px;
}

.bookmark-link-tag {
  text-decoration: none;
  color: black;
}

.bookmark-link-tag:hover {
  color: #0347f4;
}

.v-list-item__prepend > .v-icon {
  margin-inline-end: 15px;
}
</style>
