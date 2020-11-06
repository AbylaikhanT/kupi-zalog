<template>
  <div class="list">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ItemList",
  props: {
    items: Array,
  },
};
</script>

<style lang="scss" scoped>
@import "..//variables";
</style>
