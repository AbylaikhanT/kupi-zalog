<template>
  <div class="sale">
    <h3>Распродажа</h3>
    <div v-if="companiesLoading">
      <div class="d-flex justify-content-center">
        <div class="spinner-border text-primary spinner-own" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="pawnshops">
        <div
          class="item d-flex justify-content-between p-3"
          v-for="(company, index) in companies"
          :key = "index"
          @click="redirect('pawnshop', { id: company.id })"
        >
          <div
            class="image"
            v-bind:style="
              'background-image: url(https://api.kupizalog.kz/' +
              company.image.path +
              ');'
            "
          ></div>
          <span>{{ company.title }}</span>
        </div>
      </div>
      <div @click="redirect('lombards', {}, { sale: true })" class="all">
        Все ломбарды
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sale",
  data: function () {
    return {
      companies: [],
      companiesLoading: false,
    };
  },
  mounted: function () {
    this.companiesLoading = true;
    this.$http.get("monetizations/sell-out", {
        headers: {
          Authorization: this.$store.state.token,
        },
      })
      .then(
        function (response) {
          this.companies = response.data;
          this.companiesLoading = false;
        }.bind(this)
      );
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.sale {
  display: flex;
  flex-direction: column;

  @media (min-width: 992px) {
    margin-left: 44px;
  }

  .pawnshops {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 55px;
      background: $white;
      border: 1px solid $gray;
      border-radius: 6px;
      cursor: pointer;
      /*background-size: 12.5%;*/
      /*background-position: center;*/
      /*background-repeat: no-repeat;*/

      .image {
        width: 40px;
        height: 40px;
        background-size: cover;
        background-position: center center;
      }

      span {
        padding: 0 8px;
        max-width: 216px;
        color: $blue;
        font-size: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      &:hover {
        box-shadow: 0 2.5px 5px 0 $gray;
        z-index: 20;
      }
    }
  }

  h3 {
    font-weight: 500;
    font-size: 24px;
    color: $light-black;
    margin-bottom: 25px;
  }

  .all {
    text-align: end;
    font-size: 16px;
    color: $blue;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
