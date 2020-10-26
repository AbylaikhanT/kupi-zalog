<template>
  <div class="select">
    <select
      v-model="selected"
      @change="changed()"
      :class="{ selected: valueSelected }"
    >
      <option
        v-for="option in options"
        :value="option.id"
        :key="option.id"
        :selected="option.id === 0"
        :disabled="option.id === 0"
        :hidden="option.id === 0"
      >
        {{ option[name] }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: {
    options: Array,
    option: Number,
    name: String,
    isSelected: Boolean,
  },
  watch: {
    option(newValue) {
      this.selected = newValue;
    },
    isSelected(newValue) {
      this.valueSelected = newValue;
    },
  },
  data() {
    return {
      selected: this.option,
      valueSelected: this.isSelected,
    };
  },
  methods: {
    changed() {
      this.valueSelected = true;
      this.$emit("changed", this.selected);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.select {
  position: relative;
  z-index: 30;
  flex: 1;
  max-width: 100%;
  width: 270px;
  min-height: 40px;
  background-color: $white;
  border: 1px solid $gray;
  border-radius: 5px;

  @media screen and (max-width: 1170px) {
    width: 100%;
  }

  &::after {
    position: absolute;
    top: 0;
    right: 10px;
    display: flex;
    align-items: center;
    height: 100%;
    content: "\f107";
    color: $light-gray2;
    font-family: "Font Awesome 5 Free";
    font-weight: 600;
  }

  select {
    position: absolute;
    z-index: 35;
    padding: 0 25px 0 15px;
    width: 100%;
    height: 100%;
    background-color: transparent;
    appearance: none;
    outline: none;
    color: $light-gray2;

    &.selected {
      color: $dark-blue;
    }
  }
}
</style>
