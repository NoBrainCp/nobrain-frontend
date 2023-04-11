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

  console.log(oauthData.value.provider);
  console.log(oauthData.value.code);
  
  await store
    .dispatch("oauthSignIn", oauthData)
    .then((response) => {
      router.replace(`http://localhost:5173/${getUsernameFromCookie()}`);
    })
    .catch((error) => {
      console.log(error);
      alert("로그인에 실패하였습니다.");
    });
})
</script>

<style>

</style>