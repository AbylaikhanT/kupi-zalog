<template>
  <div class="breadcrumbs">
    <span
      v-for="(breadcrumb, index) in breadcrumbs"
      :key="index"
      :class="{ active: !!breadcrumb.route }"
      @click="moveTo(breadcrumb.route, breadcrumb.query)"
      >{{ breadcrumb.title }}</span
    >
  </div>
</template>

<script>
export default {
  name: "AccountBreadcrumbs",
  props: {
    breadcrumbs: Array,
  },
  methods: {
    moveTo(route, query) {
      this.$router.push({ name: route, query: query });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.breadcrumbs {
  display: flex;
  width: 100%;

  span {
    color: $dark-blue;
    font-size: 20px;
    cursor: pointer;

    &:not(:last-child) {
      &::after {
        content: "/";
        color: $dark-blue;
      }
    }

    &.active {
      color: $blue;
    }
  }
}
</style>
