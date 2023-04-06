<template>
  <v-card-text class="justify-center align-center">
    <h2 class="body-card-title text-h3 font-weight-bold text-center">
      Nobrain
    </h2>
      <h2 class="body-card-sub-title font-weight-regular text-center">
        비밀번호를 찾고자 하는 아이디를 입력해주세요.
      </h2>
      <v-text-field
          class="card-text-id"
          variant="outlined"
          prepend-inner-icon="mdi-account"
          v-model="userId"
          label="Id"
          color="blue"
          @keydown.enter="checkDuplicationId(userId)"
      />
      <v-btn
          class="card-button text-h6"
          color="blue"
          variant="outlined"
          @click="checkDuplicationId(userId)"
      >
        다음
      </v-btn>

      <span class="link-span font-weight-thin">
        아이디가 기억나지 않는다면?
        <h5 class="find-by-id text-blue-accent-3 font-weight-regular" @click="setWindow">
         아이디 찾기
      </h5>
      </span>


  </v-card-text>

</template>

<script setup>
import {ref} from "vue";
import {existsLoginId} from "../../api/user/userApi";
import {store} from "../../store";

const userId = ref("");

const checkDuplicationId = async (userId) => {
  await existsLoginId(userId).then((response) => {
    if (response.data.data) {
      store.commit('setLoginId', userId);
      store.commit('setWindow', "findByInfo");
    } else {
      alert("아이디를 확인해주세요.");
    }
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
