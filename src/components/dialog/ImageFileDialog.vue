<template>
  <v-dialog
      v-model="imgFileObj.dialog"
      persistent
      width="28%">
    <v-card>
      <v-card-title class="text-h5 pt-4 pl-15 font-weight mt-3">
        {{ imgFileObj.title }}
      </v-card-title>
      <v-spacer/>
        <v-col cols="11">
          <v-file-input
              v-model="imgFileObj.file"
              class="ml-3"
              color="blue"
              counter
              prepend-icon="mdi-camera"
              variant="outlined"
              show-size
          >
            <template v-slot:selection="{ fileNames }">
              <template v-for="(fileName) in fileNames" :key="fileName">
                <v-chip
                    color="deep-purple-accent-4"
                    label
                    size="small"
                >
                  {{ fileName }}
                </v-chip>
              </template>
            </template>
          </v-file-input>
        </v-col>

      <v-col class="text-end mt-n2">
        <v-btn
            class="btn mr-7"
            variant="tonal"
            color="blue"
            @click="submit">
          선택
        </v-btn>
        <v-btn
            class="btn"
            variant="tonal"
            color="red"
            @click="imgFileObj.dialog=false">
          취소
        </v-btn>
      </v-col>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ImageFileDialog',

  props: {
    imgFileObj: {
      dialog: Boolean,
      title: String,
      file: null,

    }
  },

  methods: {
    submit() {
      this.imgFileObj.dialog = false;
      this.$emit('submit', this.imgFileObj.file);
    }
  }
}
</script>
