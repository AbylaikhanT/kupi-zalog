<template>
  <div class="description">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CardDescription",
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.description {
  padding: 20px;
  color: $black;

  &:not(:first-child) {
    border-top: 1px solid $light-gray7;
  }
}
</style>
