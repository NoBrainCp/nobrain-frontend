<template>
  <v-dialog
      v-model="dialog"
      persistent
      width="60%"
  >
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        북마크 추가
      </v-btn>
    </template>

    <v-card>
      <v-card-title id="card-title">
        <IconDocumentation width="35"/>
        <span class="text-h5" id="card-title-text">북마크 추가</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <div class="input-row">
            <v-text-field
                v-model="bookmark.url"
                label="URL"
                required
            ></v-text-field>
          </div>

          <div class="input-row">
            <v-text-field
                v-model="bookmark.title"
                label="이름"
                required
            ></v-text-field>
          </div>

          <div class="input-row">
            <v-textarea
                v-model="bookmark.description"
                label="설명"
                type="text"
            ></v-textarea>
          </div>

          <div class="input-row">
            <v-select
                label="카테고리 선택"
                v-model="bookmark.category"
                :items="categoryNames"
            ></v-select>
          </div>

          <vue3-tags-input :tags="bookmark.tags"
                           id="input-tags"
                           placeholder="태그"
                           @on-tags-changed="handleChangeTag">

          </vue3-tags-input>

          <div class="input-row">
            <v-checkbox
                v-model="bookmark.isPublic"
                label="비공개"
                color="info"
                value="true"
                hide-details
            ></v-checkbox>
          </div>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
        >
          닫기
        </v-btn>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="submitBookmark"
        >
          저장
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import IconDocumentation from "../icons/IconDocumentation.vue";
import axios from "axios";
import {useRoute} from "vue-router";

export default {
  name: 'CreateBookmarkForm',
  props: ["categoryNames"],
  components: {IconDocumentation},

  data: () => ({
    route: useRoute(),
    dialog: false,
    bookmark: {
      url: "",
      title: "",
      description: "",
      category: [],
      isPublic: "",
      tags: [],
    }
  }),

  methods: {
    async submitBookmark() {
      this.dialog = false;
      console.log("/api/" + this.route.params.username + "/bookmark");
      axios.post("/api/" + this.route.params.username + "/bookmark",
          { url: this.bookmark.url,
            title: this.bookmark.title,
            description: this.bookmark.description,
            categoryName: this.bookmark.category,
            isPublic: this.bookmark.isPublic,
            tags: this.bookmark.tags
          })
          .then((res) => {
            this.bookmark.name = "";
            this.bookmark.description = "";
            this.bookmark.category = "";
            this.bookmark.isPublic = false;
            this.bookmark.tags = [];
            location.reload();
          })
          .catch((err) => {
            console.log(err);
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

.input-row {
  margin-top: 5px;
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