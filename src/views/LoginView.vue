<template>
  <div>
    <Header class="header" />
    <Body/>
    <Function />
    <Footer />
  </div>
</template>
<script setup>
import Header from "../components/login/Header.vue";
import Body from "../components/login/Body.vue";
import Function from "../components/login/Function.vue";
import Footer from "../components/login/Footer.vue";
</script>

<style scoped>
.header {
  height: 130px;
  align-content: center;
}

</style>
