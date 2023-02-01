<template>
  <v-col>
    <span id="category-name">
      <IconDocumentation/> {{$route.params.category}}
    </span>
  </v-col>
  <v-col>
    <CreateBookmarkForm v-bind:categoryNames="data.categoryNames"/>
  </v-col>
  <v-col>
  </v-col>
  <v-col>
    <v-btn color="blue">
      수정
    </v-btn>
    <v-btn color="red" id="remove-btn">
      삭제
    </v-btn>
  </v-col>
</template>

<script>
  import CreateBookmarkForm from "./CreateBookmarkForm.vue";
  import {useRoute} from "vue-router";
  import {reactive} from "vue";
  import axios from "axios";
  import IconDocumentation from "./icons/IconDocumentation.vue";

  export default {
    name: 'CategorySubBar',
    components: {IconDocumentation, CreateBookmarkForm},

    setup() {
      const route = useRoute();
      const data = reactive({
        categoryNames: [],
      });

      axios.get("/api/" + route.params.username + "/categories").then((res) => {
        let resData = res.data.list;
        // data.categories = res.data.list;
        data.categoryNames = resData.map(row => row.name);
      });

      return { data };
    },
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