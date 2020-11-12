  <template>
  <div class="results">
    <div class="d-flex justify-content-start mb-3">
      <DescriptionOfCategories></DescriptionOfCategories>
    </div>
    <div class="d-flex justify-content-center" v-if="this.resultLoading">
      <!--<div class="spinner-border text-primary spinner-own" role="status">
        <span class="sr-only">Loading...</span>
      </div>-->
    </div>
    <div>
      <h3>
        Найдено {{ results.count ? results.count : 0 }} объявлений
      </h3>
      <div class="items">
        <SearchItem
          v-for="(item, index) in results.ads"
          v-bind="item"
          :key="index"
        ></SearchItem>
      </div>
      <div v-if="results.count > 0" class="pagination">
        <div class="pages">
          <button
            class="prevPagination"
            @click="changePage(--page)"
            :disabled="page === 1"
          ></button>
          <button
            v-for="(i,k) in results['all-pages']"
            :key="k"
            :class="{ active: i === page }"
            @click="changePage(i)"
          >
            {{ i }}
          </button>
          <button
            class="nextPagination"
            @click="changePage(++page)"
            :disabled="page === results['all-pages']"
          ></button>
        </div>
      </div>
    </div>
    <div v-if="results.count == 0">
      <h5>В этой категории нет объявлений</h5>
    </div>
  </div>
</template>

<script>
import SearchItem from "@/components/SearchItem";
import DescriptionOfCategories from "@/components/DescriptionOfCategories";


export default {
  name: "SearchResultsList",
  components: {
    SearchItem,
    DescriptionOfCategories,
  },
  data: function () {
    return {
      resultLoading: false,
      results: [],
      page: 1,
      notFound: false,
    };
  },
  methods: {
    findGetParameter: function (parameterName) {
      var result = null,
        tmp = [];
      var result_array = null;
      if (parameterName === "category") {
        if (location.pathname.includes("search")) {
          return null;
        }
        result_array = location.pathname
          .split("?")[0]
          .split("/v-")[0]
          .split("/");
        result = result_array.length - 1;
        return result;
      }
      if (parameterName === "category_id") {
        if (location.pathname.includes("search")) {
          return null;
        }
        result = location.pathname
          .split("?")[0]
          .split("/v-")[0]
          .split("/")
          .slice(-1)[0];
        return result;
      }
      if (parameterName === "location") {
        return 1;
      }
      if (parameterName === "location_id") {
        result_array = location.pathname.split("?")[0].split("/v-");
        if (result_array.length > 1) {
          result = result_array[1];
        } else {
          return null;
        }
        return result;
      }
      var items = location.search.substr(1).split("&");
      for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      }
      return result;
    },
    changePage: function (page) {
      let new_location = location.pathname + "?";
      if (this.findGetParameter("query")) {
        new_location += "&query=" + this.findGetParameter("query");
      }
      if (this.findGetParameter("type")) {
        new_location += "&type=" + this.findGetParameter("type");
      }
      new_location += "&page=" + page;
      window.location = new_location;
    },
  },
  mounted: function () {
    const params = {};
    this.resultLoading = true;
    if (this.findGetParameter("query")) {
      params.word = this.findGetParameter("query");
    }
    if (this.findGetParameter("category_id")) {
      params.category = this.findGetParameter("category_id");
    }
    if (this.findGetParameter("location_id")) {
      params.city = this.findGetParameter("location_id");
    }
    if (this.findGetParameter("type")) {
      params.type = this.findGetParameter("type");
    }
    if (this.findGetParameter("page")) {
      params.page = this.findGetParameter("page");
      this.page = parseInt(this.findGetParameter("page"));
    }
    this.$http
      .get(
        "product/filter",
        {
          params: params,
        },
        {
          headers: {
            Authorization: this.$store.state.token,
          },
        }
      )
      .then(
        function (response) {
          if (response.data.ads) {
            this.results = response.data;
            this.resultLoading = false;
          }
        }.bind(this)
      )
      .catch(() => {
        this.notFound = true;
        this.resultLoading = false;
      });
  },
  updated() {
    console.log(this.resultLoading);
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.results {
  @media screen and (max-width: 1170px) {
    margin-top: 0;
  }

  h3 {
    font-size: 14px;
    color: $border-gray;
  }

  .items {
    margin-top: 30px;

    .item {
      margin-top: 20px;

      &:first-child {
        margin-top: 0;
      }

      &:hover {
        box-shadow: 2.5px 0 5px 0 $gray;
      }
    }
  }

  .pagination {
    display: flex;
    flex-direction: column;
    align-items: center;

    .pages {
      display: flex;
      margin-top: 70px;
      width: 100%;

      @media screen and (max-width: 1170px) {
        flex-wrap: wrap;
      }
      .prevPagination,
      .nextPagination {
        width: 40px !important;
        &::after {
          margin-left: 0 !important;
        }
        &::before {
          margin-right: 0 !important;
        }
      }

      button {
        margin-right: 10px;
        border: 1px solid $border-gray;
        border-radius: 6px;
        color: $completely-black;
        width: 40px;
        height: 40px;
        font-size: 16px;
        font-weight: 500;
        background: $white;

        @media screen and (max-width: 1170px) {
          margin-bottom: 10px;
        }
        &:disabled {
          color: lightgray !important;
          border-color: lightgray !important;
        }

        &:first-child {
          border-color: $button-gray;
          width: 120px;

          &::before {
            content: "\f053";
            font-family: "Font Awesome 5 Free";
            font-weight: 900;
            margin-right: 20px;
          }
        }

        &:last-child {
          border-color: $button-gray;
          width: 120px;
          margin-right: 0;

          &::after {
            content: "\f054";
            font-family: "Font Awesome 5 Free";
            font-weight: 900;
            margin-left: 20px;
          }
        }

        &.active {
          background: $blue;
          color: $white;
          border: 0;
        }
      }
    }
  }
}
</style>
