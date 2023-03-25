<template>
  <v-dialog
      v-model="confirmObj.dialog"
      persistent
      width="25%">
    <v-card>
      <v-card-title class="text-h5 pt-4 pl-6 font-weight-bold mt-3">
        {{ confirmObj.title }}
      </v-card-title>
      <v-divider/>

      <v-card-text class="mt-2" v-html="confirmObj.text"/>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue"
            variant="text"
            @click="confirmObj.dialog=false">
          취소
        </v-btn>
        <v-btn
            color="red"
            variant="text"
            @click="submit">
          {{confirmObj.buttonText}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',

  props: {
    confirmObj: {
      title: "",
      text: "",
      dialog: Boolean,
      buttonText: String,
    }
  },

  methods: {
    submit() {
      this.confirmObj.dialog = false;
      this.$emit('delete');
    }
  }
}
</script>

<style scoped>

</style>
