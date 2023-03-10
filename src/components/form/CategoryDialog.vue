<template>
  <v-dialog
      v-model="categoryDialog.dialog"
      persistent
      width="40%">
    <v-card>
      <v-card-title id="card-title">
        <span class="text-h5 mt-4 mr-4" id="card-title-text">
          <v-icon class="mb-2 mr-3">mdi-bookshelf</v-icon>
          {{ categoryDialog.title }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-container class="category-input-container">
          <v-row>
            <v-col cols="12">
              <v-text-field
                  v-model="categoryDialog.name"
                  label="카테고리 이름"
                  prepend-icon="mdi-rename"
                  required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  v-model="categoryDialog.description"
                  label="설명"
                  type="text"
                  prepend-icon="mdi-tooltip-text"
                  required/>
              <v-checkbox
                  v-model="categoryDialog.public"
                  label="비공개"
                  color="info"
                  :prepend-icon="categoryDialog.public ? 'mdi mdi-lock':'mdi mdi-lock-open-variant'"
                  hide-details/>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="categoryDialog.dialog=false">
          닫기
        </v-btn>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="submit">
          {{ categoryDialog.btnName }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import IconPlusBox from "../icons/IconPlusBox.vue";
import IconDocumentation from "../icons/IconDocumentation.vue";
import {useRoute} from "vue-router";
import axios from 'axios';
import {category} from "../../api";
import {addCategory} from "../../api/category/categoryApi";
import {getUsernameFromCookie} from "../../utils/cookies";

export default {
  name: 'CategoryDialog',
  components: {IconDocumentation, IconPlusBox},
  props: {
    categoryDialog: {
      title: String,
      btnName: String,
      dialog: false,
      originName: String,
      name: String,
      description: String,
      public: Boolean,
    }
  },
  data: () => ({
    route: useRoute(),
    dialog: true,
    category: {
      name: "",
      description: "",
      isPublic: "",
    }
  }),

  methods: {
    submit() {
      this.$emit('submit', this.categoryDialog);

      this.categoryDialog.dialog = false;
      // this.categoryDialog.name = "";
      // this.categoryDialog.description = "";
      // this.categoryDialog.isPublic = false;
    },
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

#card-title-text {
  color: #4f4d4d;
  font-weight: bold;
}

.category-input-container {
  width: 95%;
}

</style>