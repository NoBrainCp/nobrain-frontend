<template>
  <!-- v-model="dialogid" -->
  <v-dialog activator="parent" transition="dialog-top-transition">
    <!-- v-if="isExistsId === true" -->
    <v-card class="mx-auto" max-width="500" style="width: 500px; height: 200px">
      <v-card-title class="text-center" style="margin-top: 10%; color: red">
        {{ text }}
        <!-- {{ test }} -->
      </v-card-title>
      <v-card-actions style="margin-top: 10%">
        <v-btn color="black" block>Close </v-btn>
        <!-- @click="dialogid = false" -->
      </v-card-actions>
    </v-card>

    <!-- v-else -->
    <v-card class="mx-auto" max-width="500" style="width: 500px; height: 200px">
      <v-card-title class="text-center" style="margin-top: 10%; color: #3333ff">
        사용가능한 아이디 입니다.
      </v-card-title>
      <v-card-actions style="margin-top: 10%">
        <v-btn color="black" block>Close</v-btn>
        <!-- @click="dialogid = false" -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { ref } from "vue";
export default {
  props: ["text"],
};
// const props = defineProps({
//   text: String,
// });

const test = ref("안녕!!");
</script>
<style></style>
