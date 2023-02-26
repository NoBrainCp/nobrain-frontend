<template>
  <v-container>
    <v-row align-center justify="center">
      <v-col cols="12" sm="12">
        <v-card class="elevation-6 mt-8" id="back">
          <v-row>
            <v-col cols="12" md="2" class="blue rounded-br-xl">
              <v-btn color="blue" class="move-password" to="/find-by-id"
              >아이디 찾기
              </v-btn>
            </v-col>
            <v-col cols="12" md="8">
              <h1 class="text-center" id="main-text">No brain</h1>
              <h3 class="text-left" id="subtext">비밀번호 찾기</h3>
              <hr/>
              <FindByCertifiedCard
                  v-bind:findbypassword="certifiedObj"
              ></FindByCertifiedCard>
              <div style="padding: 20px 0"></div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FindByCertifiedCard from "../../components/certifiedcard/FindByCertifiedCard.vue";

export default {
  name: "FindByPassword",
  components: {FindByCertifiedCard},
  data: () => ({
    certifiedObj: {},
  }),
};
</script>

<style scoped>
#back {
  width: 100%;
  height: 100%;
  text-align: center;
}

.move-password {
  margin-top: 15%;
  margin-left: 5%;
}

#back::after {
  width: 100%;
  height: 100%;
  content: "";
  background-image: url("../../assets/images/background.jpg");
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.5;
}

#main-text {
  font-size: 50px;
  margin-top: 5%;
  margin-bottom: 10%;
}

hr {
  background-color: rgba(56, 51, 51, 0.257);
  height: 2pt;
  margin-bottom: 0.5%;
}
</style>
