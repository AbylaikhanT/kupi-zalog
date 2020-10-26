<template>
  <div class="value">
    <div class="label">
      <i v-if="icon" :class="icon"></i>
      <span>{{ label }}</span>
    </div>
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "CardValue",
  props: {
    icon: String,
    label: String,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.value {
  padding: 20px;
  display: flex;
  justify-content: space-between;

  &:not(:first-child) {
    border-top: 1px solid $light-gray7;
  }

  .label {
    i {
      margin-right: 10px;
      width: 10px;
    }
  }

  span {
    color: $black;
  }
}
</style>
