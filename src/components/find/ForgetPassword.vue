<template>
  <v-card-text class="justify-center align-center">
    <h2 class="body-card-title text-h3 font-weight-bold text-center">
      Nobrain
    </h2>
      <h2 class="body-card-sub-title font-weight-regular text-center">
        비밀번호를 찾고자 하는 닉네임을 입력해주세요.
      </h2>
      <v-text-field
          class="card-text-id"
          variant="outlined"
          prepend-inner-icon="mdi-account"
          v-model="username"
          label="name"
          color="blue"
          @keydown.enter="checkDuplicationUsername(username)"
      />
      <v-btn
          class="card-button text-h6"
          color="blue"
          variant="outlined"
          @click="checkDuplicationUsername(username)"
      >
        다음
      </v-btn>

      <span class="link-span font-weight-thin">
        아이디가 기억나지 않는다면?
        <div class="find-by-id text-blue-accent-3 font-weight-regular" @click="setWindow">
         아이디 찾기
      </div>
      </span>

  </v-card-text>

</template>

<script setup>
import {ref} from "vue";
import {noAuthExistsUsername} from "../../api/user/userApi";
import {store} from "../../store";

const username = ref("");

const checkDuplicationUsername = async (username) => {
  await noAuthExistsUsername(username).then((response) => {
    if (response.data.data) {
      store.commit('setUsername', username);
      store.commit('setWindow', "findByInfo");
      return;
    }
    store.state.window = "forgetPassword";
    alert("닉네임을 확인해주세요.");

  }).catch((error) => {
    console.log(error);
  })
};

const setWindow = () => {
  store.commit('setWindow', "findByInfo");
};

</script>

<style scoped>
.body-card-title {
  color: #0363f4;
  top: 10%;
  width: 70%;
  left: 15%;
  position: absolute;
}

.body-card-sub-title {
  top: 20%;
  width: 70%;
  left: 15%;
  position: absolute;
}

.card-text-id {
  top: 40%;
  left: 15%;
  width: 70%;
  height: 15%;
  position: absolute;
}

.card-button {
  left: 15%;
  width: 70%;
  top: 55%;
  height: 8%;
  position: absolute;
}

.link-span {
  left: 15%;
  top: 75%;
  position: absolute;
}

span {
  font-size: 13pt;
}

.find-by-id {
  cursor: pointer;
}

</style>
