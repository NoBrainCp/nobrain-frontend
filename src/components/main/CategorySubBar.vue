<template>
  <v-col>
  <span id="category-name">
    <IconDocumentation/> {{ $route.params.category }}
  </span>
  </v-col>
  <v-col>
    <CreateBookmarkForm v-bind:categoryNames="data.categoryNames"/>
  </v-col>
  <v-col>
  </v-col>
  <v-col>
    <UpdateCategoryForm id="update"/>
    <v-btn color="red" id="remove-btn" @click="deleteCategory()">
      삭제
    </v-btn>
  </v-col>
</template>

<script>
import CreateBookmarkForm from "../form/CreateBookmarkForm.vue";
import {useRoute} from "vue-router";
import {reactive} from "vue";
import axios from "axios";
import IconDocumentation from "../icons/IconDocumentation.vue";
import router from "../../router";
import CreateCategoryForm from "../form/CreateCategoryForm.vue";
import UpdateCategoryForm from "../form/UpdateCategoryForm.vue";

export default {
  name: 'CategorySubBar',
  components: {UpdateCategoryForm, CreateCategoryForm, IconDocumentation, CreateBookmarkForm},

  data: () => ({
    route: useRoute(),
  }),
  setup() {
    const route = useRoute();
    const data = reactive({
      categoryNames: [],
    });
    axios.get("/api/" + route.params.username + "/categories").then((res) => {
      let resData = res.data.list;
      data.categoryNames = resData.map(row => row.name);
    });

    return {data};
  },

  methods: {

    async updateCategory() {
      await axios.put("/api/" + this.route.params.username + "/category/" + this.route.params.category);

    },
    async deleteCategory() {
      const result = confirm("정말 삭제하시겠습니까?")
      if (result === true) {
        await axios.delete("/api/" + this.route.params.username + "/category/" + this.route.params.category);
        await router.push("/" + this.route.params.username);
        location.reload();
      }
    },
  }
}

</script>

<style scoped>
.v-col {
  display: flex;
  align-content: center;
}

#category-name {
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  background: #dedada;
  border-radius: 3px;
}

#category-name > svg {
  margin-right: 4px;
}

#remove-btn {
  margin-left: 5px;
}
</style>