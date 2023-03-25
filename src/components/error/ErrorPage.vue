<template>
<!--    <div id="back">-->
<!--      <v-img class="text" src="../src/assets/images/error-text.png"/>-->
<!--      <v-img class="logo" src="../src/assets/images/error-logo.png"/>-->
<!--    </div>-->


</template>

<script>
export default {
  name: "ErrorPage"
}
</script>

<style scoped>



#back {
  margin-top: 2%;
  width: 100%;
  height: 100%;
  content: "";
  background-image: url("../../assets/images/error-background.png");
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}


.text {
  position: absolute;
  top: 200px;
  left: 40px;
  width: 800px;
  height: 1000px;
}

.logo {
  position: absolute;
  top: 200px;
  left: 150px;
  width: 1200px;
  height: 1000px;

}

</style>