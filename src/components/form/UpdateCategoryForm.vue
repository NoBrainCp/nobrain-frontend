<template>
  <v-btn color="blue" @click="clickUpdate()">
    수정
  </v-btn>
  <v-dialog
      v-model="dialog"
      persistent
      width="30%"
  >
    <v-card>
      <v-card-title id="card-title">
        <IconDocumentation width="35"/>
        <span class="text-h5" id="card-title-text">카테고리 수정</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                  v-model="category.name"
                  label="카테고리 이름"
                  :rules="[rules]"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  v-model="category.description"
                  label="설명"
                  type="text"
              ></v-text-field>
              <v-checkbox
                  v-model="category.isPublic"
                  label="비공개"
                  color="info"
                  value="true"
                  hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
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
            @click="updateCategory()"
        >
          수정
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import IconDocumentation from "../icons/IconDocumentation.vue";
import {useRoute} from "vue-router";
import axios from 'axios';
import router from "../../router";

export default {
  name: 'UpdateCategoryForm',
  components: {IconDocumentation},

  data: () => ({
    route: useRoute(),
    dialog: false,
    on: false,
    category: {
      name: "",
      description: "",
      isPublic: false
    },
    rules: v => !!v || '이름은 필수 입력 항목입니다.',
  }),

  methods: {
    clickUpdate() {
      this.dialog = true;
      this.category.name = this.route.params.category;
    },

    async updateCategory() {
      this.dialog = false;
      await axios.put("/api/" + this.route.params.username + "/category/" + this.route.params.category,
          {
            name: this.category.name,
            description: this.category.description,
            isPublic: this.category.isPublic
          })
      console.log(this.category.name);
      await router.push("/" + this.route.params.username + "/" + this.category.name);
      alert("수정이 완료되었습니다.")
      location.reload();


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

</style>