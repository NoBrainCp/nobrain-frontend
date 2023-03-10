<template>
  <v-dialog
      v-model="bookmarkDialog.dialog"
      persistent
      width="45%"
  >
    <v-card>
      <v-card-title id="card-title">
        <span
            class="text-h5 mt-7 "
            id="card-title-text">
          <v-icon class="mb-2 mr-3">mdi-book-open-page-variant</v-icon>
          {{ bookmarkDialog.title }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-container class="bookmark-input-container">
          <div class="input-row">
            <v-text-field
                v-model="bookmark.url"
                label="URL"
                clearable
                prepend-icon="mdi mdi-link-variant"
                :rules="[rules.url]"/>
          </div>

          <div class="input-row">
            <v-text-field
                v-model="bookmark.title"
                label="이름"
                required
                prepend-icon="mdi-rename"
                :rules="[rules.title]"
                clearable/>
          </div>

          <div class="input-row input-text-area">
            <v-icon class="mdi mdi-tooltip-text input-text-area-icon"></v-icon>
            <v-textarea
                v-model="bookmark.description"
                label="설명"
                type="text"
                prepend-icon="mdi "/>
          </div>

          <div class="input-row">
            <v-select
                label="카테고리 선택"
                v-model="bookmarkDialog.categoryName"
                prepend-icon="mdi-bookshelf"
                hint="카테고리를 선택해주세요"
                :items="bookmarkDialog.categoryNames"/>
          </div>

          <v-combobox
              v-model="bookmark.tags"
              :items="items"
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
                  :model-value="bookmarkDialog.tags"
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
                v-model="bookmark.public"
                label="비공개"
                color="info"
                value="true"
                :prepend-icon="bookmark.public ? 'mdi mdi-lock':'mdi mdi-lock-open-variant'"
                hide-details/>
          </div>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="bookmarkDialog.dialog= false">
          닫기
        </v-btn>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="submitBookmark">
          {{ bookmarkDialog.btnName }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>

import {useRoute} from "vue-router";
import {defineComponent} from "vue";
import {categoryStore} from "../../store/category/category";

export default defineComponent ({
  name: 'BookmarkDialog',

  props: {
    bookmarkDialog: {
      title: String,
      btnName: String,
      dialog: Boolean,
      categoryName: String,
      categoryNames: [],
      // url: String,
      // name: String,
      // description: String,
      // isPublic: Boolean,
      // isStarred: Boolean,

    },
    bookmark: {
      url: "",
      title: "",
      description: "",
      categoryName: "",
      tags: [],
      isPublic: false,
      isStarred: false,
    },
  },

  data: () => ({
    route: useRoute(),
    chips: [],
    items: ['Streaming', 'Eating'],

    rules: {
      url: v => !!v || 'URL은 필수 입력 항목입니다.',
      title: v => !!v || '이름은 필수 입력 항목입니다.'
    }
  }),
  // setup(props) {
  //   console.log(props.bookmarkDialog);
  //   console.log(props.bookmark);
  // },
  methods: {
    submitBookmark() {
      this.bookmarkDialog.dialog = false;
      this.$emit('submit', this.bookmark);
    },

    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1);
    },

    handleChangeTag(tags) {
      this.bookmark.tags = tags;
    }
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