<template>
  <div class="profile">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "AccountUserProfile",
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.profile {
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1170px) {
    width: 100%;
  }
}
</style>
