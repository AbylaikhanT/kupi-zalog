<template>
  <button @click="clicked()" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "PrimaryButton",
  props: {
    disabled: Boolean,
  },
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
  background-color: $blue;
  color: $white;
  font-weight: bold;
  letter-spacing: 0.5px;
}
button:disabled {
  background-color: $gray;
  border: 1px solid $gray;
}
</style>
