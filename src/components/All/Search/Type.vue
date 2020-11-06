<template>
  <div class="types">
    <div @click="changed('all')" class="type">
      <button :class="{ active: selectedType === 'all' }">
        <i class="fas fa-th-large"></i>
      </button>
      <span>Всеrr</span>
    </div>
    <div @click="changed('pawnshop')" class="type">
      <button :class="{ active: selectedType === 'pawnshop' }">
        <i class="far fa-gem"></i>
      </button>
      <span>Ломбардffghjk</span>
    </div>
    <div @click="changed('bank')" class="type">
      <button :class="{ active: selectedType === 'bank' }">
        <i class="fas fa-university"></i>
      </button>
      <span>Банк</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchType",
  props: {
    type: String,
  },
  data() {
    return {
      selectedType: this.type ? this.type : "all",
    };
  },
  methods: {
    changed(type) {
      this.selectedType = type;
      this.$emit("changed", type);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.types {
  display: flex;

  .type {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $blue;
    cursor: pointer;

    &:not(:first-child) {
      margin-left: 15px;
    }

    button {
      width: 50px;
      height: 50px;
      background-color: $white;
      border: 1px solid $light-gray2;
      outline: none;
      border-radius: 5px;

      &.active {
        background-color: $light-gray3;
      }

      i {
        font-size: 18px;
      }
    }

    span {
      margin-top: 7px;
      font-size: 12px;
    }
  }
}
</style>
