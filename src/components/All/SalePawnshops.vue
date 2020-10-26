<template>
  <div class="pawnshops">
    <AccountBack @clicked="getBack()"></AccountBack>
    <h1>Все ломбарды</h1>
    <div class="list">
      <Pawnshop
        v-for="(pawnshop, index) in pawnshops"
        :key="index"
        :id="pawnshop.id"
        :logo="pawnshop.image.path"
      ></Pawnshop>
    </div>
  </div>
</template>

<script>
import AccountBack from "@/components/Account/Back";
import Pawnshop from "@/components/All/Pawnshop";

export default {
  name: "Pawnshops",
  components: {
    AccountBack,
    Pawnshop,
  },
  data() {
    return {
      pawnshops: [],
    };
  },
  methods: {
    getBack() {
      this.$router.go(-1);
    },
  },
  created() {
    this.$http.get("monetizations/sell-out").then(
      function (response) {
        this.pawnshops = response.data;
      }.bind(this)
    );
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.pawnshops {
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1170px) {
    padding: 0 20px;
  }

  h1 {
    margin-top: 40px;
    color: $dark-gray;
    font-size: 24px;
    font-weight: 500;
  }

  .list {
    padding-top: 30px;
    display: flex;
    flex-wrap: wrap;

    .pawnshop {
      &:not(:first-child) {
        @media screen and (max-width: 1170px) {
          margin-top: 20px;
        }
      }

      &:not(:nth-child(3n + 1)) {
        margin-left: 40px;

        @media screen and (max-width: 1170px) {
          margin-left: 0;
        }
      }

      &:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3)) {
        margin-top: 20px;
      }
    }
  }
}
</style>
