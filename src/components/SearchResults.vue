<template>
  <div class="results-wrapper">
    <SearchResultsList></SearchResultsList>
  </div>
</template>

<script>
import SearchResultsList from "@/components/SearchResultsList";

export default {
  name: "SearchResults",
  components: {
    SearchResultsList,
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.results-wrapper {
  width: 860px;

  @media screen and (max-width: 1170px) {
    padding: 0 20px;
    width: 100%;
  }
}
</style>
