<template>
  <div class="favorites">
    <Header>Избранные</Header>
    <div class="content">
      <!--<SearchFilter></SearchFilter>-->
      <FavoritesList></FavoritesList>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Account/Header";
import FavoritesList from "@/components/All/FavoritesList";

export default {
  name: "AccountUserFavorites",
  components: {
    Header,
    FavoritesList,
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.favorites {
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1170px) {
    flex: 1;
    width: 100vw;
  }

  .content {
    padding: 30px;
    width: 940px;

    @media screen and (max-width: 1170px) {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
