<template>
  <v-dialog
      v-model="bookmarkObj.dialog"
      persistent
      width="60%"
  >
    <v-card>
      <v-card-title id="card-title">
        <IconDocumentation width="35"/>
        <span class="text-h5" id="card-title-text">{{ bookmarkObj.title }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <div class="input-row">
            <v-text-field
                v-model="bookmark.url"
                label="URL"
                clearable
                :rules="[rules.url]"/>
          </div>

          <div class="input-row">
            <v-text-field
                v-model="bookmark.title"
                label="이름"
                required
                :rules="[rules.title]"
                clearable/>
          </div>

          <div class="input-row">
            <v-textarea
                v-model="bookmark.description"
                label="설명"
                type="text"/>
          </div>

          <div class="input-row">
            <v-select
                label="카테고리 선택"
                v-model="bookmark.category"
                hint="카테고리를 선택해주세요"
                :items="bookmarkObj.categoryNames"/>
          </div>

          <vue3-tags-input
              :tags="bookmark.tags"
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
import IconDocumentation from "../icons/IconDocumentation.vue";
import {useRoute} from "vue-router";
import axios from "axios";
import {ru} from "vuetify/locale";

export default {
  name: 'BookmarkDialog',
  components: {IconDocumentation},
  props: {
    bookmarkObj: {
      title: "",
      btnName: "",
      dialog: Boolean,
      categoryNames :[],
    }
  },

  data: () => ({
    route: useRoute(),
    dialog: true,
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
      title:v => !!v || '이름은 필수 입력 항목입니다.'
    }
  }),

  methods: {
    submitBookmark() {
      this.bookmarkObj.dialog = false;
      this.$emit('submit', this.bookmark);
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