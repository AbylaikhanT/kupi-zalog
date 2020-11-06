<template>
  <div :class="{ start: base }" class="value">
    <div v-if="label" class="label">
      <span>{{ label }}</span>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "HorizontalValue",
  props: {
    label: String,
    base: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.value {
  display: flex;
  align-items: center;

  @media screen and (max-width: 1170px) {
    flex: 1;
    width: 100%;
  }

  &.start {
    align-items: flex-start;
  }

  .label {
    margin-right: 15px;
    color: $dark-blue;
  }

  .content {
    width: 500px;

    @media screen and (max-width: 1170px) {
      margin-top: 15px;
      width: 100%;
    }
  }
}
</style>
