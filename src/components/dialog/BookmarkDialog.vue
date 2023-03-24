<template>
  <v-dialog
      v-model="bookmarkDialogObj.dialog"
      persistent
      width="45%"
  >
    <v-card>
      <v-card-title id="card-title">
        <span
            class="text-h5 mt-7 "
            id="card-title-text">
          <v-icon class="mb-2 mr-3">mdi-book-open-page-variant</v-icon>
          {{ bookmarkDialogObj.dialogTitle }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-container class="bookmark-input-container">
          <div class="input-row">
            <v-text-field
                v-model="bookmarkDialogObj.bookmark.url"
                label="URL"
                clearable
                prepend-icon="mdi mdi-link-variant"
                :rules="[rules.url]"/>
          </div>

          <div class="input-row">
            <v-text-field
                v-model="bookmarkDialogObj.bookmark.title"
                label="이름"
                required
                prepend-icon="mdi-rename"
                :rules="[rules.title]"
                clearable/>
          </div>

          <div class="input-row input-text-area">
            <v-icon class="mdi mdi-tooltip-text input-text-area-icon"></v-icon>
            <v-textarea
                v-model="bookmarkDialogObj.bookmark.description"
                label="설명"
                type="text"
                prepend-icon="mdi "/>
          </div>

          <div class="input-row">
            <v-select
                label="카테고리 선택"
                v-model="bookmarkDialogObj.bookmark.categoryName"
                prepend-icon="mdi-bookshelf"
                hint="카테고리를 선택해주세요"
                :items="bookmarkDialogObj.categoryNames"/>
          </div>

          <v-combobox
              v-model="bookmarkDialogObj.bookmark.tags"
              :items="bookmarkDialogObj.bookmark.tagList"
              chips
              clearable
              label="Tags"
              multiple
              prepend-icon="mdi-tag-multiple"
              variant="solo"
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                  v-bind="attrs"
                  :model-value="bookmarkDialogObj.bookmark.tags"
                  closable
                  @click="select"
                  @click:close="remove(item)"
              >
                <strong>{{ item }}</strong>&nbsp;
                <span>(interest)</span>
              </v-chip>
            </template>
          </v-combobox>

          <div class="input-row">
            <v-checkbox
                v-model="bookmarkDialogObj.bookmark.isPublic"
                :label="bookmarkDialogObj.bookmark.isPublic ? '공개' : '비공개'"
                color="info"
                :disabled=bookmarkDialogObj.categoryIsPublic
                :prepend-icon="bookmarkDialogObj.bookmark.isPublic ? 'mdi mdi-lock-open-variant' : 'mdi mdi-lock'"
                hide-details/>
          </div>
          <v-card-text class="ml-n4">
            <v-icon v-if="bookmarkDialogObj.categoryIsPublic" class="mdi mdi-alert mr-3" color="yellow"/>
            {{bookmarkDialogObj.categoryIsPublic ? bookmarkDialogObj.publicText : ''}}
          </v-card-text>

        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="closeDialog">
          닫기
        </v-btn>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="submitBookmark">
          {{ bookmarkDialogObj.btnName }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>

import {defineComponent, watch} from "vue";
import {useRoute} from "vue-router";
import {getUserIdFromCookie} from "../../utils/cookies";
import {getCategoryIsPublic} from "../../api/category/categoryApi";
import categoryDialog from "./CategoryDialog.vue";

export default defineComponent ({
  name: 'BookmarkDialog',
  computed: {
    categoryDialog() {
      return categoryDialog
    }
  },

  props: {
    bookmarkDialogObj: {
      dialogTitle: String,
      btnName: String,
      dialog: false,
      categoryNames: [],
      originCategoryName: String,
      categoryIsPublic: Boolean,
      publicText: "카테고리가 비공개로 설정되어 있습니다.",

      bookmark: {
        url: String,
        title: String,
        description: String,
        categoryName: String,
        tags: [], //수정시 기존 보여지는 태그들
        tagList: [],  //자신의 북마크 전체 태그 리스트
        isPublic: Boolean,
        isStarred: false,
      },
    },
  },

  data: () => ({
    route: useRoute(),
    dialog: true,
    chips: [],

    rules: {
      url: v => !!v || 'URL은 필수 입력 항목입니다.',
      title: v => !!v || '이름은 필수 입력 항목입니다.'
    }
  }),

  setup(props) {
    const userId = getUserIdFromCookie();

    watch(() => (props.bookmarkDialogObj.bookmark.categoryName), async (categoryName) => {
      if (!categoryName || categoryName === 'starred') {
        props.bookmarkDialogObj.bookmark.categoryName = '';
        props.bookmarkDialogObj.categoryIsPublic = false;
        return;
      }
      await getCategoryIsPublic(userId, categoryName).then((response) => {
        props.bookmarkDialogObj.categoryIsPublic = !response.data.data;
        if (!response.data.data) {
          props.bookmarkDialogObj.bookmark.isPublic = false;
          props.bookmarkDialogObj.publicText = "카테고리가 비공개로 설정되어 있습니다.";
        }
      }).catch((error) => {
        console.log(error.response.data);
      });
    })
  },

  methods: {
    submitBookmark() {
      this.bookmarkDialogObj.dialog = false;
      this.$emit('submit', this.bookmarkDialogObj.bookmark);
    },

    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1);
    },

    closeDialog() {
      this.bookmarkDialogObj.dialog = false;
      this.bookmarkDialogObj.bookmark = {};
    },
  }
})
</script>

<style scoped>
#card-title {
  display: flex;
  justify-content: center;
  align-content: center;
  border-bottom: 1px solid #d3d1d1;
  margin-top: 10px
}

.bookmark-input-container {
  width: 90%;
}

.input-row {
  margin-top: 5px;
}

.input-text-area {
  margin-top: 20px;
  margin-bottom: 50px;
}

.input-text-area-icon {
  color: #888888;
  margin-bottom: 10px;
}

.v3ti-content > .v3ti-tag > span {
  font-size: 30px;
}

</style>
