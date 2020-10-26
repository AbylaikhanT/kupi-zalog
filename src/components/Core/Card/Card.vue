<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Card",
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.card {
  display: flex;
  flex-direction: column;
  width: 410px;
  background-color: $white;
  border: 1px solid $light-gray7;
  border-radius: 5px;

  @media screen and (max-width: 1170px) {
    width: 100%;
  }
}
</style>
