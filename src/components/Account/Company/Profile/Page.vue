<template>
  <div class="profile">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "AccountCompanyProfile",
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.profile {
  flex: 1;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1170px) {
    width: 100%;
  }
}
</style>
