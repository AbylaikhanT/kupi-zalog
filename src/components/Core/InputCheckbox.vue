<template>
  <div class="checkbox">
    <div class="checkbox-wrapper">
      <input @change="changed()" type="checkbox" :checked="checked" />
      <div class="tick"></div>
    </div>
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "InputCheckbox",
  props: {
    checked: Boolean,
  },
  methods: {
    changed() {
      this.$emit("changed", true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";
@import "src/assets/mixins";

.checkbox {
  z-index: 30;
  display: flex;

  .checkbox-wrapper {
    position: relative;
    flex-shrink: 0;
    width: 20px;
    height: 20px;

    .tick {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      border: 1px solid $light-gray2;
      border-radius: 4px;

      &::after {
        position: absolute;
        display: none;
        content: "\f00c";
        color: $light-gray5;
        font-family: "Font Awesome 5 Free";
        font-size: 12px;
        font-weight: 600;
      }
    }

    input {
      position: absolute;
      z-index: 35;
      opacity: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;

      &:checked ~ .tick::after {
        display: block;
      }
    }
  }

  span {
    margin-left: 8px;
    color: $dark-blue;

    a {
      @include a($blue);
    }
  }
}
</style>
