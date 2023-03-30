<template>
  <v-dialog
      v-model="authObj.dialog"
      persistent
      transition="dialog-top-transition"
  >
    <v-card
        class="mx-auto"
        max-width="500"
        style="width: 500px; height: 200px"
    >
      <v-row style="margin-top: 8%" class="field">
        <v-col col="12" sm="8">
          <v-text-field
              v-model="authObj.authCode"
              label="인증번호"
              bg-color="white"
              color="blue"
          >
          </v-text-field>
        </v-col>
        <v-col col="12" sm="3">
          <v-btn
              color="blue"
              block
              @click="submitAuth"
          >확인
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="field">
        <v-col col="12" sm="12"> 남은시간 : {{ timeCount.timeStr }}</v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref, watch} from "vue";

const props = defineProps({
  authObj: {
    dialog: Boolean,
    authCode: String,
  }
});

const timeCount = ref({
  restSec: 180,
  timeStr: "",
  restTimeData: "",
});

watch(() => props.authObj.dialog, (newVal) => {
  if (newVal) {
   startTimer();
  }
});

const startTimer = () => {
  timeCount.value.restSec = 180;
  const timerObj = setInterval(() => {
    timeCount.value.timeStr = prettyTimer(timeCount.value.restSec);
    timeCount.value.restSec--;

    if (timeCount.value.restSec == 0) {
      timerStop(timerObj);
    }
  }, 1000);
};
const prettyTimer = (restSec) => {
  let minutes = parseInt(restSec / 60);
  let seconds = (restSec % 60);
  return (
      minutes.toString().padStart(2, "0") + " : " + seconds.toString().padStart(2, "0")
  )
};
const timerStop = (timerObj) => {
  clearInterval(timerObj);
  timeCount.value.timeStr = "";
  props.authObj.dialog = false;
};

const emit = defineEmits(['submit']);
const submitAuth = () => {
  props.authObj.dialog = false;
  emit('submit', props.authCode);
}

</script>