<template>
  <v-dialog
      v-model="dialog"
      persistent
      width="30%"
  >
    <template v-slot:activator="{ props }">
      <IconPlusBox id="plusbox-icon" width="30" v-bind="props"/>
<!--        <v-btn-->
<!--            v-bind="props"-->
<!--        >-->
<!--          btn-->
<!--        </v-btn>-->

    </template>
    <v-card>
      <v-card-title id="card-title">
        <IconDocumentation width="35"/>
        <span class="text-h5" id="card-title-text">카테고리 추가</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                  label="카테고리 이름*"
                  required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="설명"
                  type="text"
                  required
              ></v-text-field>
              <v-checkbox
                  label="비공개"
                  color="info"
                  value="info"
                  hide-details
              ></v-checkbox>
            </v-col>

          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
        >
          닫기
        </v-btn>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
        >
          저장
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import IconPlusBox from "./icons/IconPlusBox.vue";
import IconDocumentation from "./icons/IconDocumentation.vue";

export default {
  name: 'CreateCategoryForm',
  components: {IconDocumentation, IconPlusBox},

  data: () => ({
    dialog: false,
  }),

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

#plusbox-icon:hover {
  cursor: pointer;
}
</style>