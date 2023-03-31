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
            @click="cancel">
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

<script setup>

defineProps({
  confirmObj: {
    dialog: Boolean,
    title: String,
    text: String,
    buttonText: String,
  }
});
const emit = defineEmits(['delete', 'close']);

const cancel = () => {
  emit('close');
};

const submit = () => {
  emit('delete');
};

</script>
