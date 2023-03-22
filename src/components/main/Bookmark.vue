<template>
  <v-row>
    <v-col v-for="bookmark in data.bookmarks"
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
              cover>
            <v-overlay
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
            <v-col v-if="data.isMe" class="icon-container">
              <v-icon
                  size="27"
                  :color="bookmark.public ? 'indigo' : 'green-darken-3'"
                  :class="bookmark.public ? 'mdi mdi-lock-open-variant' : 'mdi mdi-lock'"
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
            <div class="text-h6 text-light-blue font-weight-bold">
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
                <v-icon v-b-hover class="icon-link" size="17">mdi mdi-link-variant</v-icon>
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
      @submit="updateBookmark"/>
</template>

<script>
import router from "../../router";
import {useRoute} from "vue-router";
import {onMounted, reactive, watch} from "vue";
import {bookmarkStore} from "../../store/bookmark/bookmark";
import ConfirmDialog from "../dialog/ConfirmDialog.vue";
import BookmarkDialog from "../dialog/BookmarkDialog.vue";
import {deleteBookmarkById, getAllBookmarks, getBookmarks, updateBookmark, updatePublic, updateStarred} from "../../api/bookmark/bookmarkApi";
import {getCategories, getCategoryByBookmarkId} from "../../api/category/categoryApi";
import {getTags, getTagsByBookmarkId} from "../../api/tag/tagApi";
import {getUsernameFromCookie} from "../../utils/cookies";
import {categoryStore} from "../../store/category/category";

export default {
  name: 'Bookmark',
  components: {BookmarkDialog, ConfirmDialog},

  data: () => ({
    imagePath: [
      {noImage: "../assets/images/nobrain-no-image.png"}
    ],

    confirmObj: {
      title: "북마크 삭제",
      text: "정말 북마크를 삭제하시겠습니까?",
      dialog: false,

      bookmarkId: '',
    },

    bookmarkDialogObj: {
      dialogTitle: "북마크 수정",
      btnName: "수정",
      dialog: false,
      categoryNames: [],

      bookmark: {},
    }
  }),

  setup() {
    const route = useRoute();
    const username = route.params.username;
    const data = reactive({
      bookmarks: [],
      isMe: username === getUsernameFromCookie(),
    });

    watch([() => route.params, () => bookmarkStore.state.status], loadData);
    watch(() => bookmarkStore.state.bookmarks, () => {
      if (Object.keys(bookmarkStore.state.bookmarks).length === 0) {
        loadData();
      } else {
        data.bookmarks = bookmarkStore.state.bookmarks;
      }
    });

    async function loadData() {
      const username = route.params.username;
      const categoryName = route.params.category;

      if (categoryName === undefined) {
        data.bookmarks = await getAllBookmarks(username).then((res) => res.data.list);
      } else {
        data.bookmarks = await getBookmarks(username, categoryName).then((res) => res.data.list);

      }
    }

    onMounted(loadData);

    return {data};
  },

  methods: {
    async clickEditBookmarkBtn(bookmark, bookmarkId) {
      bookmarkStore.state.status = !bookmarkStore.state.status;

      const [categoryListResp, categoryResp, tagsResp, allTagsResp] = await Promise.all([
        getCategories(getUsernameFromCookie()),
        getCategoryByBookmarkId(bookmarkId),
        getTagsByBookmarkId(getUsernameFromCookie(), bookmark.id),
        getTags(getUsernameFromCookie())
      ]);

      this.bookmarkDialogObj.dialog = true;
      this.bookmarkDialogObj.bookmark = bookmark;
      this.bookmarkDialogObj.bookmark.isPublic = bookmark.public;
      this.bookmarkDialogObj.categoryNames = categoryListResp.data.list.map(({name}) => name);
      this.bookmarkDialogObj.bookmark.categoryName = categoryResp.data.data;
      this.bookmarkDialogObj.originCategoryName = categoryResp.data.data;
      this.bookmarkDialogObj.bookmark.tags = tagsResp.data.list.map(({tagName}) => tagName);
      this.bookmarkDialogObj.bookmark.tagList = allTagsResp.data.list.map(({tag}) => tag.name);

    },

    async updateBookmark(bookmark) {
      const category = this.bookmarkDialogObj.originCategoryName;
      const username = getUsernameFromCookie();

      updateBookmark(bookmark.id, bookmark).then(()=>{
        bookmarkStore.state.status = !bookmarkStore.state.status;
        categoryStore.commit('setCategory', {name: bookmark.categoryName});
      });

      if (bookmark.categoryName !== category) {
        await router.push(`/${username}/${bookmark.categoryName}`);
      }
    },

    clickDeleteBookmarkBtn(bookmarkId) {
      this.confirmObj.bookmarkId = bookmarkId;
      this.confirmObj.dialog = true;
    },

    async deleteBookmark(bookmarkId) {
      await deleteBookmarkById(bookmarkId);
      const index = this.data.bookmarks.findIndex(bookmark => bookmark.id === bookmarkId);

      if (index !== -1) {
        this.data.bookmarks.splice(index, 1);
      }

      bookmarkStore.state.status = !bookmarkStore.state.status;
    },

    async clickStar(bookmark) {
      bookmark.starred = !bookmark.starred;

      await updateStarred(bookmark.id, bookmark.starred);
    },

    async clickLock(bookmark) {
      bookmark.public = !bookmark.public;

      await updatePublic(bookmark.id, bookmark.public);
    },
  }
}
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
  position: relative;
  right: 50px;
  border: 1px solid #f3f3f3;
}

.card-text {
  margin-top: -20px;
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
