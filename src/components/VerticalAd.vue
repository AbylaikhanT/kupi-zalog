<template>
  <div class="ad">
    <span>Реклама</span>
  </div>
</template>

<script>
export default {
  name: "VerticalAd",
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.ad {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 660px;
  background-color: $white;
  border: 1px solid $gray;
  border-radius: 5px;

  span {
    color: $dark-blue;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
