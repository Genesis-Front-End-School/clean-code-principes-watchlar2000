<template>
  <header class="header">
    <h1 class="title">
      <router-link :to="{ name: 'home' }">Courses App</router-link>
    </h1>
  </header>
</template>

<style lang="scss" scoped>
.header {
  align-self: center;
  justify-self: center;

  .title {
    font-size: 48px;
    font-family: 'Open Sans';
    font-weight: 700;
  }
}
</style>
