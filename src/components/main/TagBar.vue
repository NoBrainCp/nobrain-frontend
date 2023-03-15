<template>
  <v-navigation-drawer
      width="300"
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
      location="right"
      class="nav-tag"
      style="position: fixed"
  >
    <v-list-item
        prepend-icon="mdi mdi-tag-multiple"
        title="태그"
        class="btn-tag"
        @click.stop="rail = !rail"
    >
      <template v-slot:append>
        <v-btn
            class="tag-btn"
            variant="text"
            icon="mdi-chevron-right"
            @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-chip-group
        v-model="selectedTags"
        column
        multiple
        v-if="!rail"
        selected-class="bg-light-blue"
        class="chip-group"
    >

      <v-chip
          v-for="(tag, i) in tags"
          :key="tag.id"
          :value="tag.name"
          filter
          elevation="2"
          @click="selectTag(tag.id)"
      >
        {{tag.name}}
      </v-chip>
    </v-chip-group>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'TagBar',
  data() {
    return {
      drawer: true,
      rail: true,

      tags: [
        { id: 1, name : "Java", isOpen : false},
        { id: 2, name : "Spring", isOpen : false},
        { id: 3, name : "SpringBoot", isOpen : false},
        { id: 4, name : "Vue", isOpen : false},
        { id: 5, name : "JavaScript", isOpen : false},
        { id: 6, name : "JPA", isOpen : false},
        { id: 7, name : "DataBase", isOpen : false},
      ],

      selectedTags: [],
    }
  },

  methods: {
    selectTag(id) {
      console.log(this.selectedTags);
    }
  }
}
</script>

<style scoped>
.tag-btn {
  margin: 4px 0;
}

.chip-group {
  margin-left: 10px;
}
</style>