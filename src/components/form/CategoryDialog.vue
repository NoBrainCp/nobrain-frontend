<template>
  <v-dialog
      v-model="categoryObj.dialog"
      persistent
      width="25%">
    <v-card>
      <v-card-title id="card-title">
        <span class="text-h5 mt-4 mr-4" id="card-title-text">
          <v-icon class="mb-2 mr-3">mdi-bookshelf</v-icon>
          {{ categoryObj.title }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-container class="category-input-container">
          <v-row>
            <v-col cols="12">
              <v-text-field
                  v-model="category.name"
                  label="카테고리 이름"
                  prepend-icon="mdi-rename"
                  required/>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  v-model="category.description"
                  label="설명"
                  type="text"
                  prepend-icon="mdi-tooltip-text"
                  required/>
              <v-checkbox
                  v-model="category.isPublic"
                  label="비공개"
                  color="info"
                  value="true"
                  :prepend-icon="category.isPublic ? 'mdi mdi-lock':'mdi mdi-lock-open-variant'"
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
            @click="categoryObj.dialog=false">
          닫기
        </v-btn>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="submit">
          {{ categoryObj.btnName }}
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

export default {
  name: 'CategoryDialog',
  components: {IconDocumentation, IconPlusBox},
  props: {
    categoryObj: {
      title: "",
      btnName: "",
      dialog: Boolean,
    }
  },
  data: () => ({
    route: useRoute(),
    dialog: true,
    category: {
      name: "",
      description: "",
      isPublic: false
    }
  }),

  methods: {
    submit() {
      this.categoryObj.dialog = false;
      this.$emit('submit', this.category);
    },
    async submitCategory() {
      this.dialog = false;
      axios.post("/api/" + this.route.params.username + "/category",
          {
            name: this.category.name,
            description: this.category.description,
            isPublic: this.category.isPublic
          })
          .then((res) => {
            this.category.name = "";
            this.category.description = "";
            this.category.isPublic = false;
            location.reload();
          })
          .catch((err) => {
            console.log(err.data);
          });
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

#card-title-text {
  color: #4f4d4d;
  font-weight: bold;
}

.category-input-container {
  width: 90%;
}

</style>