<template>
  <v-dialog
      v-model="dialog"
      persistent
      id="category-dialog"
  >
    <template v-slot:activator="{ props }" id="category-form-btn">
      <IconPlusBox id="plusbox-icon" width="30" v-bind="props"/>
<!--        <v-btn-->
<!--            v-bind="props"-->
<!--        >-->
<!--          btn-->
<!--        </v-btn>-->

    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">카테고리 추가</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Email*"
                  required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Password*"
                  type="password"
                  required
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
            >
              <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
              ></v-select>
            </v-col>
            <v-col
                cols="12"
                sm="6"
            >
              <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
        >
          Close
        </v-btn>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import IconPlusBox from "./icons/IconPlusBox.vue";

export default {
  name: 'CreateCategoryForm',
  components: {IconPlusBox},

  data: () => ({
    dialog: false,
  }),

}
</script>

<style scoped>
#plusbox-icon:hover {
  cursor: pointer;
  background: #cccccc;
  border-radius: 5px;
}
</style>