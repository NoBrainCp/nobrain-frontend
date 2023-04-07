<template>
  <div>
    <Header class="header" />
    <Body/>
    <Function />
    <Footer />
  </div>
</template>
<script setup>
import Header from "../components/start/Header.vue";
import Body from "../components/start/Body.vue";
import Function from "../components/start/Function.vue";
import Footer from "../components/start/Footer.vue";
</script>

<style scoped>
.header {
  height: 130px;
  align-content: center;
}

</style>
