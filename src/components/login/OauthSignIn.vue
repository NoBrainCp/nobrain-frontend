<template>

</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { store } from "../../store";

const route = useRoute();
const oauthData = ref({});

onMounted(async () => {
  oauthData.value.provider = route.params.provider;
  oauthData.value.code = route.query.code;
  await store.dispatch('oauthSignIn', oauthData);
})
</script>

<style>

</style>
