<template>
  <footer class="footer">
    <p><slot name="link"></slot></p>
    <p><slot name="message">Default footer</slot></p>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
