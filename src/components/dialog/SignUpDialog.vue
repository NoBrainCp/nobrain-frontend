<template>
  <v-dialog
    v-model="dialog.isShow"
    activator="parent"
    transition="dialog-top-transition"
  >
    <v-card
      v-if="dialog.isExist"
      class="mx-auto"
      max-width="500"
      style="width: 500px; height: 200px"
    >
      <v-card-title class="text-center" style="margin-top: 10%; color: red">
        {{ dialog.title }}
      </v-card-title>
      <v-card-actions style="margin-top: 10%">
        <v-btn color="black" block @click="dialog.isShow = false">Close </v-btn>
      </v-card-actions>
    </v-card>

    <v-card
      v-else
      class="mx-auto"
      max-width="500"
      style="width: 500px; height: 200px"
    >
      <v-card-title class="text-center" style="margin-top: 10%; color: #3333ff">
        {{ dialog.title }}
      </v-card-title>
      <v-card-actions style="margin-top: 10%">
        <v-btn color="black" block @click="dialog.isShow = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "SignDialog",
  props: {
    title: "",
    dialog: {
      title: "",
      isShow: false,
      isExist: false,
    },
  },
};
</script>
<style></style>
