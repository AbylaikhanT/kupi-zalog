<template>
  <div class="breadcrumbs">
    <span
      v-for="(breadcrumb,index) in breadcrumbs"
      :class="{ active: !!breadcrumb.route }"
      :key="index"
      @click="redirect(breadcrumb.route, breadcrumb.params)"
      >{{ breadcrumb.title }}</span
    >
  </div>
</template>

<script>
export default {
  name: "Breadcrumbs",
  props: {
    breadcrumbs: Array,
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.breadcrumbs {
  display: flex;
  flex-wrap: wrap;

  span {
    color: $dark-blue;

    &:not(:last-child) {
      &::after {
        margin: 0 5px;
        content: "/";
      }
    }

    &.active {
      color: $blue;
      cursor: pointer;
    }
  }
}
</style>
