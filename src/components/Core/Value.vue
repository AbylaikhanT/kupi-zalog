<template>
  <div class="value">
    <span v-if="label" class="label">{{ label }}</span>
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "Value",
  props: {
    label: String,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.value {
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1170px) {
    width: 100%;
  }

  span {
    color: $dark-blue;
  }

  .label {
    margin-bottom: 10px;
    color: $gray;
  }
}
</style>
