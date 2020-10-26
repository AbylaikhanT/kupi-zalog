<template>
  <div @click="clicked()" class="back">
    <i class="fas fa-arrow-left"></i>
    <span>Назад</span>
  </div>
</template>

<script>
export default {
  name: "AccountBack",
  methods: {
    clicked() {
      this.$emit("clicked", true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.back {
  display: flex;
  align-items: center;
  color: $blue;
  cursor: pointer;

  span {
    margin-left: 5px;
    font-size: 18px;
  }
}
</style>
