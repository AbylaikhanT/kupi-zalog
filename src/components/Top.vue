<template>
  <div class="top">
    <h3>Топ-ломбарды</h3>
    <div v-if="pawnShopsLoading">
      <div class="d-flex justify-content-center">
        <div class="spinner-border text-primary spinner-md" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="pawnshops">
        <div
          class="d-flex justify-content-between item mb-2 p-3"
          v-for="(value, key) in pawnshops"
          :key = "key"
          @click="redirect('pawnshop', { id: value[0] })"
        >
          <div
            class="image"
            v-bind:style="
              'background-image: url(https://api.kupizalog.kz/media/' +
              value[2] +
              ');'
            "
          ></div>
          <span>{{ value[1] }}</span>
        </div>
      </div>
      <div @click="redirect('lombards')" class="all">Все ломбарды</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Top",
  data: function () {
    return {
      pawnshops: [],
      pawnShopsLoading: false,
    };
  },
  mounted: function () {
    this.pawnShopsLoading = true;
    this.$http.get("companies/rating", {
        headers: {
          Authorization: this.$store.state.token,
        },
      })
      .then(
        function (response) {
          this.pawnshops = response.data;
          this.pawnShopsLoading = false;
        }.bind(this)
      );
    document.documentElement.scrollTop = 0;
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";
@import "@/assets/mixins";

.top {
  display: flex;
  flex-direction: column;
  margin-top: 80px;

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
