    <template>
  <div class="pawnshops">
    <AccountBack @clicked="getBack()"></AccountBack>
    <h1>Все ломбарды</h1>
    <div class="list">
      <template v-if="$route.query.sale">
        <Pawnshop
          v-for="(pawnshop, index) in pawnshops"
          :key="index"
          :id="pawnshop.id"
          :title="pawnshop.title"
          :logo="pawnshop.image.path"
          sale
          class="item"
        ></Pawnshop>
      </template>
      <template v-else>
        <Pawnshop
          v-for="(pawnshop, index) in pawnshops"
          :key="index"
          :id="pawnshop[0]"
          :title="pawnshop[1]"
          :logo="`/media/${pawnshop[2]}`"
          class="item"
        ></Pawnshop>
      </template>
    </div>
  </div>
</template>

<script>
import AccountBack from "@/components/Account/Back";
import Pawnshop from "@/components/All/Pawnshop";

export default {
  name: "TopPawnshops",
  components: {
    AccountBack,
    Pawnshop,
  },
  watch: {
    "$route.query.sale": function (sale) {
      this.getListings();
    },
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
    getListings() {
      if (this.$route.query.sale) {
        this.$http.get("monetizations/sell-out").then(
          function (response) {
            this.pawnshops = response.data;
          }.bind(this)
        );
      } else {
        this.$http
            .get("companies/rating", {
            headers: {
              Authorization: this.$store.state.token,
            },
          })
          .then(
            function (response) {
              this.pawnshops = response.data;
            }.bind(this)
          );
      }
    },
  },
  created() {
    this.getListings();
  },
  mounted() {
    document.documentElement.scrollTop = 0;
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

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

  .item {
    // margin-bottom: 15px;
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
