<template>
  <div class="page">
    <div class="top">
      <h1>Мои объявления</h1>
    </div>
    <div class="bottom">
      <Search hide></Search>
      <div class="filters">
        <div class="left">
          <div>
            <input type="checkbox" checked />
            <div class="checkmark"></div>
            <span>Опубликованные</span>
          </div>
          <div>
            <input type="checkbox" checked />
            <div class="checkmark"></div>
            <span>Сохраненные</span>
          </div>
          <div>
            <input type="checkbox" checked />
            <div class="checkmark"></div>
            <span>Продвинутые</span>
          </div>
          <div>
            <input type="checkbox" checked />
            <div class="checkmark"></div>
            <span>Не продвинутые</span>
          </div>
        </div>
        <div class="right">
          <button>Показать (4 объявлений)</button>
        </div>
      </div>
      <div class="products">
        <ProfileItem
          v-for="(product, key) in products"
          v-bind:key="key"
          v-bind:item="product"
        ></ProfileItem>
      </div>
      <div class="pagination">
        <div class="pages">
          <button></button>
          <button v-for="i in 2" :class="{ active: i === 1 }">{{ i }}</button>
          <button></button>
        </div>
      </div>
    </div>
    <notifications group="add" position="top center"></notifications>
  </div>
</template>

<script>
import Search from "@/components/Search";
import ProfileItem from "@/components/ProfileItem";

export default {
  name: "ProfileCompanyProducts",
  components: {
    Search,
    ProfileItem,
  },
  data: function () {
    return {
      products: [],
    };
  },
  mounted: function () {
    this.$http
      .post(
        "companies/ads/",
        {},
        {
          headers: {
            Authorization: this.$store.state.accessToken,
          },
        }
      )
      .then(
        function (response) {
          this.products = response.data;
        }.bind(this)
      );
    if (this.$store.state.showNewProductNotification) {
      this.$notify({
        group: "add",
        title: "Опубликовано",
        text: "Спасибо! Ваше объявление будет опубликовано после проверки.",
        type: "success",
      });
      this.$store.commit("setShowNewProductNotification", false);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.page {
  padding: 40px 30px;
  width: 100%;

  .top {
    h1 {
      font-size: 30px;
    }
  }

  .bottom {
    margin-top: 40px;
    display: flex;
    flex-direction: column;

    .filters {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;

        & > div {
          margin-right: 50px;
          position: relative;
          cursor: pointer;
          user-select: none;
          display: flex;
          align-items: center;

          &:last-child {
            margin-right: 0;
          }

          .checkmark {
            position: absolute;
            top: auto;
            left: 0;
            width: 22px;
            height: 22px;
            border: 1px solid $gray;
            border-radius: 3px;
            z-index: 1;

            &::after {
              content: "";
              position: absolute;
              top: 3px;
              left: 7px;
              width: 7px;
              height: 12px;
              border: solid $checkbox-green;
              border-width: 0 3px 3px 0;
              transform: rotate(45deg);
              display: none;
            }
          }

          input {
            position: absolute;
            opacity: 0;
            width: 100%;
            height: 100%;
            z-index: 5;
            cursor: pointer;

            &:checked ~ .checkmark::after {
              display: block;
            }
          }

          span {
            margin-left: 35px;
            z-index: 1;
          }
        }
      }

      .right {
        button {
          width: 260px;
          height: 40px;
          padding: 10px;
          border: 1px solid $white;
          border-radius: 5px;
          background: $blue;
          color: $white;
          font-size: 14px;
          font-weight: bold;
          line-height: 19px;
        }
      }
    }

    .products {
      margin-top: 40px;
      display: flex;
      flex-wrap: wrap;
    }

    .pagination {
      display: flex;
      justify-content: center;

      .pages {
        display: flex;
        align-items: center;

        button {
          margin-right: 10px;
          border: 0.5px solid $border-gray;
          border-radius: 6px;
          color: $completely-black;
          width: 40px;
          height: 40px;
          font-size: 16px;
          font-weight: 500;
          background: $white;

          &:first-child {
            width: 55px;
            box-sizing: border-box;
            border: 2px solid rgba(88, 94, 102, 0.2);

            &::before {
              content: "\f053";
              font-family: "Font Awesome 5 Free";
              font-weight: 900;
              font-size: 12px;
            }
          }

          &:last-child {
            margin-right: 0;
            box-sizing: border-box;
            width: 55px;
            border: 2px solid rgba(88, 94, 102, 0.2);

            &::after {
              content: "\f054";
              font-family: "Font Awesome 5 Free";
              font-weight: 900;
              font-size: 12px;
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
}
</style>
