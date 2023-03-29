<template>
  <v-container>
    <v-row align-content="center" justify="center" id="all">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-9" id="back">
          <v-row>
            <v-col cols="12" md="2" class="blue rounded-br-xl"></v-col>

            <v-col cols="12" md="8">
              <v-card-text class="mt-12">
                <h1 class="text-center" id="main-text">No brain</h1>

                <v-row align-center justify="center">
                  <v-col cols="12" sm="12">
                    <h2 class="text-center" id="subtext">
                      비밀번호를 찾고자 하는 아이디를 입력해주세요.
                    </h2>
                    <v-icon></v-icon>
                    <v-col col="12" sm="12">
                      <v-text-field
                          variant="outlined"
                          prepend-inner-icon="mdi-account"
                          v-model="loginId"
                          label="Id"
                          id="account"
                          bg-color="white"
                          color="blue"
                          @keydown.enter="checkDuplicationId(loginId)"
                      />
                    </v-col>
                    <v-col col="12" sm="12">
                      <v-btn
                          id="next-btn"
                          block
                          height="50px"
                          color="blue"
                          @click="checkDuplicationId(loginId)"
                          class="btn"
                      >
                        다음
                      </v-btn>
                    </v-col>
                    <div style="padding: 20px 0"></div>
                    <div class="link_wrap">
                      <span
                      >아이디가 기억나지 않는다면?
                        <a href="/find-by-id" class="link"
                        ><div class="txt">아이디 찾기</div></a
                        >
                      </span>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import router from "../../router";
import {ref} from "vue";
import {existsLoginId} from "../../api/user/userApi";

const loginId = ref("");
const isExistsId = ref(false);

const checkDuplicationId = async(loginId) => {
  await existsLoginId(loginId).then((response) => {
    isExistsId.value = response.data.data;
    if (isExistsId.value) {
      router.push(`/find-by-password/${loginId}`);
    } else {
      alert("아이디를 확인해주세요.");
    }
  })
};
</script>

<style scoped>

#back {
  width: 100%;
  height: 800px;
  text-align: center;
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
  margin-bottom: 10%;
}

#subtext {
  margin-bottom: 5%;
}

.btn {
  font-size: 18px;
}

#all {
  margin-top: 3%;
}

span {
  font-size: 13pt;
}

</style>
