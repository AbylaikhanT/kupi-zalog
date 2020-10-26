<template>
  <button
    v-if="$store.getters.hasCompany"
    :class="{ shown: show }"
    @click="clicked()"
  >
    <i class="fas fa-plus"></i>
    <span>Подать объявление</span>
  </button>
</template>

<script>
export default {
  name: "AccountProductButton",
  props: {
    show: Boolean,
  },
  methods: {
    clicked() {
      this.$emit("clicked", true);
      this.$router.push({ name: "company-add-product" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

button {
  width: 180px;
  height: 40px;
  border: 1px solid $white;
  border-radius: 5px;
  outline: none;
  background-color: transparent;
  color: $white;

  i {
    font-size: 10px;
  }

  span {
    margin-left: 8px;
    font-size: 12px;
    font-weight: bold;
  }
}

@media screen and (max-width: 1170px) {
  button {
    display: none;

    &.shown {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid $blue;
      background-color: $blue;
    }
  }
}
</style>
