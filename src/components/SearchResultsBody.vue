<template>
  <div class="results">
    <SearchResultsList></SearchResultsList>
  </div>
</template>

<script>
import SearchResultsList from "@/components/SearchResultsList";
import Top from "@/components/Top";
import Sale from "@/components/Sale";

export default {
  name: "SearchResultsBody",
  components: {
    SearchResultsList,
    Top,
    Sale,
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.rersults {
  width: 860px;

  @media screen and (max-width: 1170px) {
    width: 100%;
  }
}
</style>
