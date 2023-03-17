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
        <v-col col="12" sm="12"> 남은시간 : {{ timeStr }}</v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import {ref, watch} from "vue";

export default {
  name: "AuthDialog",

  props: {
    authObj: {
      dialog: Boolean,
      isCheck: Boolean,
      userMedia: String,
      authCode: ""
    }
  },

  data: () => ({
    timeStr: "",
    restSec: 180,
    restTimeData: "",
  }),

  setup(props) {
    let restSec = ref(180);
    let timeStr = ref("0");
    watch(() => props.authObj.dialog, (newVal) => {
      if (newVal) {
        const timerObject = setInterval(() => {
          timeStr.value = prettyTime(restSec.value);
          restSec.value--;
          if (restSec.value === 0) {
            timerStop(timerObject);
          }
        }, 1000);

      }
    });
    const prettyTime = (restSec) => {
      let minutes = parseInt(restSec / 60);
      let seconds = (restSec % 60);
      return (
          minutes.toString().padStart(2, "0") +
          " : " +
          seconds.toString().padStart(2, "0")
      );
    };

    const timerStop = (timerObject) => {
      clearInterval(timerObject);
      props.authObj.dialog = false;
    };

    return { timeStr };
  },

  methods: {
    submitAuth() {
      this.authObj.dialog = false;
      this.$emit('submit', this.authObj.authCode);
    },
  }
}

</script>