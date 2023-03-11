<template>
  <v-row>
    <v-col v-for="(bookmark, idx) in data.bookmarks"
           :key="bookmark"
           cols="auto">
      <v-hover v-slot="{ isHovering, props }">
        <v-card
            class="mx-auto bookmark-card"
            v-bind="props"
            :elevation="isHovering ? 15 : 3">
          <v-img
              :src="bookmark.image === null ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5nUtk5JoD4sdl1VSGYazqdLh7to9LYI_Q&usqp=CAU' : bookmark.image"
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
            <v-col class="icon-container">
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
                      @click="clickEdit(bookmark)">
                    <v-list-item-title>수정</v-list-item-title>
                  </v-list-item>
                  <v-divider/>
                  <v-list-item
                      class="text-red-accent-4"
                      prepend-icon="mdi mdi-delete"
                      @click="confirmObj.dialog=true">
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
  <BookmarkDialog
      :bookmarkDialog="bookmarkDialog"
      @submit="updateBookmark"/>
  <ConfirmDialog
      v-bind:confirmObj="confirmObj"
      @delete="deleteBookmark"/>
</template>

<script>
import {useRoute} from "vue-router";
import {onMounted, ref, watch} from "vue";
import {getAllBookmarks, getBookmarks} from "../api/bookmark/bookmarkApi";
import {bookmarkStore} from "../store/bookmark/bookmark";
import ConfirmDialog from "./dialog/ConfirmDialog.vue";
import BookmarkDialog from "./dialog/BookmarkDialog.vue";
import {categoryStore} from "../store/category/category";
import {getCategories} from "../api/category/categoryApi";
import {getUsernameFromCookie} from "../utils/cookies";

export default {
  name: 'Bookmark',
  components: {BookmarkDialog, ConfirmDialog},
  data: () => ({
    temp: "black",
    bookmarks: bookmarkStore.state.bookmarks,
    imagePath: [
      {noImage: "../assets/images/nobrain-no-image.png"}
    ],

    confirmObj: {
      title: "북마크 삭제",
      text: "정말 북마크를 삭제하시겠습니까?",
      dialog: false,
    },

    bookmarkDialogObj: {
      title: "북마크 수정",
      btnName: "수정",
      dialog: false,
      categoryNames: [],
    }
  }),

  setup() {
    const route = useRoute();
    const category = route.params.category;
    const username = route.params.username;

    const data = ref({
      bookmarks: [],
    });

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

    watch(() => (route.params), (newValue) => {
        if (newValue.category === undefined) {
          getAllBookmarksByUser(newValue.username);
        } else {
          getBookmarksByUserAndCategory(newValue.username, newValue.category);
        }
    });

    watch(() => (bookmarkStore.state.bookmark), (newBookmark) => {
      bookmarkDialog.value = bookmarkStore.state.bookmark;
      console.log(bookmarkDialog.value)
    });

    const getAllBookmarksByUser = async (username) => {
      getAllBookmarks(username).then((res) => {
        data.value.bookmarks = res.data.list;
      })
    };

    const getBookmarksByUserAndCategory = async (username, category) => {
      getBookmarks(username, category).then((res) => {
        data.value.bookmarks = res.data.list;
      })
    }

    onMounted(() => {
      getAllBookmarksByUser(username);
    });

    return {data, bookmarkDialog};
  },

  methods: {
    updateBookmark(bookmark) {
      console.log(bookmark);
    },
    //
    // deleteBookmark() {
    //   this.bookmarkDialogObj.dialog = false;
    // },

    clickEdit(bookmark) {
      bookmarkStore.commit('setBookmark', bookmark);
      getCategories(getUsernameFromCookie()).then((response) => {
        this.bookmarkDialogObj.categoryNames = response.data.list.map(c => c.name);
      });

      this.bookmarkDialogObj.dialog = true;
    },

    clickStar(bookmark) {
      bookmark.starred = !bookmark.starred;
    },

    clickLock(bookmark) {
      bookmark.public = !bookmark.public;
    }
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
  position: relative;
  left: 10px;
  bottom: 8px;
}

.icon-star {
  margin: 0 10px;
}

.bookmark-chip {
  height: 17px;
}

.bookmark-sub-btn-list {
  position: relative;
  right: 60px;
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
