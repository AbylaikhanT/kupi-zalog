<template>
  <div class="ad">
    <span>Реклама</span>
  </div>
</template>

<script>
export default {
  name: "HorizontalAd",
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.ad {
  margin: 25px 0 60px 0;
  flex: 1;
  max-width: 1170px;
  height: 250px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid $border-gray;
  border-radius: 6px;

  span {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: $black;
  }
}

@media screen and (max-width: 1170px) {
  .ad {
    display: none;
  }
}
</style>
