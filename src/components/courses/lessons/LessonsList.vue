<template>
  <div class="list">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.list {
  margin-top: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
