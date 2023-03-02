<template>
  <v-app-bar class="app-bar" style="position: fixed" flat border>
    <div class="category-title">
      <span class="mdi mdi-folder icon-folder"></span>
      {{category.name}}
    </div>

    <div class="category-description">
      {{category.description}}
    </div>

    <v-spacer/>

    <v-btn
        class="btn"
        color="blue"
        prepend-icon="mdi mdi-pencil-outline"
        border
    >
      수정
    </v-btn>
    <v-btn
        class="btn"
        color="red-accent-4"
        prepend-icon="mdi mdi-delete"
        border
    >
      삭제
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'CategoryBar',
  data() {
    return {
      category: {
        name: "Category Name",
        description: "Category Description",
      },
    }
  },
}
</script>

<style scoped>
.app-bar {
  opacity: 0.9;
}

.icon-folder {
  margin-right: 10px;
}

.category-title {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  padding: 8px 12px;
  margin-left: 50px;
  border-radius: 20px;
  background: #03A9F4;
  color: white;
  font-size: 17px;
  font-weight: 500;
}

.category-description {
  margin-left: 30px;
  color: #03A9F4;
  font-size: 15px;
  font-weight: 400;
}

.btn {
  width: 120px;
  height: 42px;
  margin-right: 10px;
}

.v-toolbar__content > .v-btn:last-child {
  margin-right: 50px;
}
</style>