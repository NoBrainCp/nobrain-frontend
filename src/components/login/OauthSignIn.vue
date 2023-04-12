<template>

</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import router from "../../router";
import { store } from "../../store";
import { saveUserInfoToCookie } from "../../utils/cookies";

const route = useRoute();

const oauthData = ref({});

onMounted(async () => {
  oauthData.value.provider = route.params.provider;
  oauthData.value.code = route.query.code;

  await store.dispatch('oauthSignIn', oauthData)
    .then((response) => {
      console.log(response);
      // router.replace(`/${response.username}`);
    });
})
</script>

<style>

</style>
