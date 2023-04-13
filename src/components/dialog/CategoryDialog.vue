<template>
  <v-dialog
      v-model="categoryDialogObj.dialog"
      persistent
      width="40%">
    <v-card>
      <v-card-title id="card-title">
        <span class="text-h5 mt-4 mr-4" id="card-title-text">
          <v-icon class="mb-2 mr-3">mdi-bookshelf</v-icon>
          {{ categoryDialogObj.title }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-container class="category-input-container">
          <v-row>
            <v-col cols="12">
              <v-text-field
                  v-model="categoryDialogObj.category.name"
                  label="카테고리 이름"
                  maxlength="20"
                  prepend-icon="mdi-rename"
                  :rules="[rules.name]"
                  @keyup.space="handleCategoryName"
                  required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  v-model="categoryDialogObj.category.description"
                  label="설명"
                  type="text"
                  maxlength="40"
                  prepend-icon="mdi-tooltip-text"
                  required/>
              <v-checkbox
                  v-model="categoryDialogObj.category.isPublic"
                  :label="categoryDialogObj.category.isPublic ? '공개' : '비공개'"
                  color="info"
                  :prepend-icon="categoryDialogObj.category.isPublic ? 'mdi mdi-lock-open-variant' : 'mdi mdi-lock'"
                  hide-details/>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="closeDialog">
          닫기
        </v-btn>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="submit">
          {{ categoryDialogObj.btnName }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  categoryDialogObj: {
    title: String,
    btnName: String,
    dialog: false,
    originName: String,
    category: {
      name: String,
      description: String,
      isPublic: Boolean,
    },
  }
});

const rules = ref({
  name: v => !!v || '이름은 필수 입력 항목입니다.'
})

const emit = defineEmits(['submit', 'close']);

const submit = () => {
  emit('submit', props.categoryDialogObj.category);
};

const closeDialog = () => {
  emit('close')
};

const handleCategoryName = () => {
  props.categoryDialogObj.name = props.categoryDialogObj.category.name.replace(" ", "_");
}
</script>

<style scoped>
#card-title {
  display: flex;
  justify-content: center;
  align-content: center;
  border-bottom: 1px solid #d3d1d1;
  margin-top: 10px
}

#card-title-text {
  color: #4f4d4d;
  font-weight: bold;
}

.category-input-container {
  width: 95%;
}

</style>
