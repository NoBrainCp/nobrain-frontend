<template>
  <v-alert
      location="top center"
      :type="alertObj.type"
      :title="alertObj.title"
      :text="alertObj.text"
      closable
  />
</template>

<script setup>

defineProps({
  alertObj: {
    type: null,
    title: String,
    text: String,
  }
});

</script>
