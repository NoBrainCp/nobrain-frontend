<template>
  <v-dialog
      v-model="bookmarkObj.dialog"
      persistent
      width="42%"
  >
    <v-card>
      <v-card-title id="card-title">
        <span
            class="text-h5 mt-7 "
            id="card-title-text">
          <v-icon class="mb-2 mr-3">mdi-book-open-page-variant</v-icon>
          {{ bookmarkObj.title }}
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
                v-model="bookmark.category"
                prepend-icon="mdi-bookshelf"
                hint="카테고리를 선택해주세요"
                :items="bookmarkObj.categoryNames"/>
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
                  :model-value="bookmarkObj.tags"
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
                v-model="bookmark.isPublic"
                label="비공개"
                color="info"
                value="true"
                :prepend-icon="bookmark.isPublic ? 'mdi mdi-lock':'mdi mdi-lock-open-variant'"
                hide-details/>
          </div>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="bookmarkObj.dialog= false">
          닫기
        </v-btn>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="submitBookmark">
          {{ bookmarkObj.btnName }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>

import {useRoute} from "vue-router";
import axios from "axios";
export default {
  name: 'BookmarkDialog',

  props: {
    bookmarkObj: {
      title: "",
      btnName: "",
      dialog: Boolean,
      categoryNames: [],
      tags: [],
    }
  },

  data: () => ({
    route: useRoute(),
    dialog: true,
    chips: [],
    items: ['Streaming', 'Eating'],

    bookmark: {
      url: "",
      title: "",
      description: "",
      category: [],
      isPublic: false,
      tags: [],
    },

    rules: {
      url: v => !!v || 'URL은 필수 입력 항목입니다.',
      title: v => !!v || '이름은 필수 입력 항목입니다.'
    }
  }),

  methods: {
    submitBookmark() {
      this.bookmarkObj.dialog = false;
      this.$emit('submit', this.bookmark);
    },

    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1);
    },

    async submitBookmark2() {
      this.dialog = false;
      await axios.post("/api/" + this.route.params.username + "/bookmark",
          {
            url: this.bookmark.url,
            title: this.bookmark.title,
            description: this.bookmark.description,
            categoryName: this.bookmark.category,
            isPublic: this.bookmark.isPublic,
            tags: this.bookmark.tags
          })
          .then((res) => {
            this.bookmark.url = "";
            this.bookmark.name = "";
            this.bookmark.description = "";
            this.bookmark.category = "";
            this.bookmark.isPublic = false;
            this.bookmark.tags = [];
            location.reload();
          })
          .catch((err) => {
            console.log(err);
            alert(err.response.data.message);
          });
    },

    handleChangeTag(tags) {
      this.bookmark.tags = tags;
    }
  }
}
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

#input-tags {
  background: #f6f6f6;
  height: 56px;
  align-content: center;
}

#input-tags:focus {
  background: #aeaeae;
}

.v3ti-content > .v3ti-tag > span {
  font-size: 30px;
}

</style>