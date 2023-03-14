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
                      @click="clickEditBookmarkBtn(bookmark)">
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
import router from "../router";
import {useRoute} from "vue-router";

//라이플 사이클 / 반응형 / 감지
import {onMounted, reactive, watch} from "vue";

//store
import {bookmarkStore} from "../store/bookmark/bookmark";

//dialog
import ConfirmDialog from "./dialog/ConfirmDialog.vue";
import BookmarkDialog from "./dialog/BookmarkDialog.vue";

//api
import {deleteBookmarkById, getAllBookmarks, getBookmarks, updateBookmark} from "../api/bookmark/bookmarkApi";
import {getCategories} from "../api/category/categoryApi";
import {getTags, getTagsByBookmarkId} from "../api/tag/tagApi";

//Cookie
import {getUserIdFromCookie, getUsernameFromCookie} from "../utils/cookies";

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
    const category = route.params.category;
    const username = route.params.username;

    const data = reactive({
      bookmarks: [],
    });

    watch([() => route.params, () => bookmarkStore.state.status], ([params]) => {
      const {username, category} = params;
      if (category === undefined) {
        getAllBookmarksByUser(username);
      } else {
        getBookmarksByUserAndCategory(username, category);
      }
    });
    // 2개 묶어서 위에 메소드로 정의
   /* watch(() => (route.params), (newValue) => {
      if (newValue.category === undefined) {
        getAllBookmarksByUser(newValue.username);
      } else {
        getBookmarksByUserAndCategory(newValue.username, newValue.category);
      }
    });
    watch(() => (bookmarkStore.state.status), () => {
      console.log(category);
      if (category === undefined) {
        getAllBookmarksByUser(username);
      } else {
        getBookmarksByUserAndCategory(username, category);
      }
    })*/

    // watch([() => data.bookmarks, () => route.params], ([newBookmarks, newParams], [oldBookmarks, oldParams]) => {
    //   if (newParams.category === undefined) {
    //     getAllBookmarksByUser(newParams.username);
    //   } else {
    //     getBookmarksByUserAndCategory(newParams.username, newParams.category);
    //   }
    // })

    const getAllBookmarksByUser = async (username) => {
      await getAllBookmarks(username).then((res) => {
        data.bookmarks = res.data.list;
      })
    };

    const getBookmarksByUserAndCategory = async (username, category) => {
      await getBookmarks(username, category).then((res) => {
        data.bookmarks = res.data.list;
      })
    }
    //고려사항 -> setup()만으로는 구현 못하는지
    onMounted(() => {
      getAllBookmarksByUser(username);
    });

    return {data};
  },

  methods: {
    clickEditBookmarkBtn(bookmark) {
      this.bookmarkDialogObj.bookmark = bookmark;
      this.bookmarkDialogObj.dialog = true;

      getCategories(getUsernameFromCookie()).then((response) => {
        this.bookmarkDialogObj.categoryNames = response.data.list.map(c => c.name);
      });

      getTagsByBookmarkId(getUsernameFromCookie(), bookmark.id).then((response) => {
        this.bookmarkDialogObj.bookmark.tags = response.data.list.map(t => t.tagName);
      })

      getTags(getUserIdFromCookie()).then((response) => {
        this.bookmarkDialogObj.bookmark.tagList = response.data.list.map(t => t.tag.name);
      })
    },

    async updateBookmark(bookmark) {
      const category = "";
      const username = getUsernameFromCookie();
      await updateBookmark(bookmark.id, bookmark);
      console.log("1" + bookmark.categoryName);
      console.log("2" + category);
      //북마크 업데이트 경우의 수 2가지
      //1. 카테고리를 변경하고 데이터를 변경했을 경우
      //2. 카테고리를 변경하지 않고 데이터를 변경했을 경우

      // 비교 객체는 bookmark.categoryName(변경 카테고리) / 기존 북마크에 해당하는 카테고리(bookmarkId로 categoryName 구하는 쿼리)
      //순서
      //1. spring 쿼리 구현
      //2. get api 요청으로 해당 북마크에 해당 하는 카테고리 이름 가져오기
      //3. const category 변수에 매핑 해주기

      //1번 = 카테고리를 변경하고 데이터를 변경했을 경우 -> 변경한 카테고리로 이동 (이동 하면서 컴포넌트 리랜더링)
      if (bookmark.categoryName !== category) {
        await router.push(`/${username}/${bookmark.categoryName}`);
        return;
      }
      //2번 = 카테고리를 변경하지 않고 데이터만 변경했을 경우 -> 북마크 스토어에게 데이터가 변경된 것을 알림 watch 에 의해 api재호출
      bookmarkStore.state.status = !bookmarkStore.state.status;
    }
  },

  clickDeleteBookmarkBtn(bookmarkId) {
    this.confirmObj.bookmarkId = bookmarkId;
    this.confirmObj.dialog = true;
  },
  //비동기 처리를 해주지 않으면 상태 변화 감지가 먼저 이루어짐
  async deleteBookmark(bookmarkId) {
    await deleteBookmarkById(bookmarkId);
    const index = this.data.bookmarks.findIndex(bookmark => bookmark.id === bookmarkId);
    if (index !== -1) {
      this.data.bookmarks.splice(index, 1);
    }
    bookmarkStore.state.status = !bookmarkStore.state.status;
  },

  clickStar(bookmark) {
    bookmark.starred = !bookmark.starred;
  },

  clickLock(bookmark) {
    bookmark.public = !bookmark.public;
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
