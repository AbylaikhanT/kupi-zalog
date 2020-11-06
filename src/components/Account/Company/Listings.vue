<template>
  <div class="listings">
    <Header>Мои объявления</Header>
    <div class="content">
      <!--<SearchFilter></SearchFilter>-->
      <ListingsList></ListingsList>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Account/Header";
import ListingsList from "@/components/Account/Company/ListingsList";

export default {
  name: "AccountCompanyListings",
  components: {
    Header,
    ListingsList,
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.listings {
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1170px) {
    flex: 1;
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
