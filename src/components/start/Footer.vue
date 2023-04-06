<template>
  <div class="btn">
    <v-icon
        size="50"
        @click="goTop"
    >mdi-arrow-up-circle-outline
    </v-icon>
  </div>
  <v-footer class="bg-blue-lighten-4">
    <v-col class="text-center mt-4" cols="12">
      {{ new Date().getFullYear() }} — <strong>Nobrain</strong>
    </v-col>
  </v-footer>
</template>

<script setup>

const goTop = () => {
  window.scrollTo({top:0, behavior: 'smooth'});
};

</script>
<style scoped>
.btn {
  cursor: pointer;
  position: fixed;
  bottom: 100px;
  right: 100px;
  z-index: 12;
}
</style>