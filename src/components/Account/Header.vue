<template>
  <div :class="{ compact: compact }" class="header">
    <h1>
      <slot></slot>
    </h1>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    compact: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.header {
  padding: 40px 30px 0 30px;

  @media screen and (max-width: 1170px) {
    width: 100vw;
    max-width: 100%;
  }

  &.compact {
    padding: 0;

    h1 {
      font-size: 20px;
    }
  }

  h1 {
    font-size: 30px;
    color: $black;
  }
}
</style>
