<template>
  <v-dialog
      v-model="confirmObj.dialog"
      persistent
      width="25%">
    <v-card>
      <v-card-title class="text-h5 pt-4 pl-6 font-weight-bold">
        {{ confirmObj.title }}
      </v-card-title>
      <v-card-text v-html="confirmObj.text"/>

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
          삭제
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
    }
  },

  methods: {
    submit() {
      this.confirmObj.dialog = false
      this.$emit('delete')
    }
  }
}
</script>

<style scoped>

</style>
