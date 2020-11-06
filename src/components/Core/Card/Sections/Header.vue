<template>
  <div class="header">
    <h5>
      <slot></slot>
    </h5>
  </div>
</template>

<script>
export default {
  name: "CardHeader",
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.header {
  padding: 20px;

  &:not(:first-child) {
    border-top: 1px solid $light-gray7;
  }

  h5 {
    margin: 0;
    color: $dark-blue;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
