<template>
  <v-card>
    <v-card-title class="text-h5 pt-4 pl-6 font-weight-bold">
      {{confirmObj.title}}
    </v-card-title>

    <v-card-text v-html="confirmObj.text"/>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="blue"
          variant="text"
          @click="$emit('cancel')"
      >
        취소
      </v-btn>
      <v-btn
          color="red"
          variant="text"
          @click="$emit('delete')"
      >
        삭제
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: {
    confirmObj: {
      title: "",
      text: "",
    }
  },

  data() {
    return {
    }
  },
}
</script>

<style scoped>

</style>
