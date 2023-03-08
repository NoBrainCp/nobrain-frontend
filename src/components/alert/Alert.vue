<template>
  <v-alert
      location="top center"
      :type="alertObj.type"
      :title="alertObj.title"
      :text="alertObj.text"
      closable
  />
</template>

<script>
export default {
  name: "Alert",
  props: {
    alertObj: {
      type: String,
      title: String,
      text: String,
    }
  },
}
</script>