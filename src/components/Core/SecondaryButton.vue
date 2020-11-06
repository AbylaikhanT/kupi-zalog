<template>
  <button @click="clicked()">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "SecondaryButton",
  methods: {
    clicked() {
      this.$emit("clicked", true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

button {
  padding: 10px 20px;
  border: 1px solid $blue;
  border-radius: 5px;
  outline: none;
  background-color: $white;
  color: $blue;
  font-weight: bold;
  letter-spacing: 0.5px;
}
</style>
