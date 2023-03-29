<template>
  <v-dialog
    v-model="dialogObj.isShow"
    activator="parent"
    transition="dialog-top-transition"
  >
    <v-card
      v-if="dialogObj.isExist"
      class="mx-auto"
      max-width="500"
      style="width: 500px; height: 200px"
    >
      <v-card-title class="text-center" style="margin-top: 10%; color: red">
        {{ dialogObj.title }}
      </v-card-title>
      <v-card-actions style="margin-top: 10%">
        <v-btn color="black" block @click="dialogObj.isShow = false">Close </v-btn>
      </v-card-actions>
    </v-card>

    <v-card
      v-else
      class="mx-auto"
      max-width="500"
      style="width: 500px; height: 200px"
    >
      <v-card-title class="text-center" style="margin-top: 10%; color: #3333ff">
        {{ dialogObj.title }}
      </v-card-title>
      <v-card-actions style="margin-top: 10%">
        <v-btn color="black" block @click="dialogObj.isShow = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>

const props = defineProps({
  dialogObj: {
    title: String,
    isShow: Boolean,
    isExist: Boolean,
  }
});
</script>
<style></style>
