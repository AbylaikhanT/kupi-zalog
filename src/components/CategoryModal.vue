<template>
  <div class="category-modal">
    <div @click="$emit('close')" class="overlay"></div>
    <div class="wrapper">
      <div class="window">
        <div class="top window-row">Выберите рубрику</div>
        <div class="middle window-row">
          <div class="left">
            <div
              v-for="outer in categories"
              @click="selectOuter(outer)"
              @mouseover="
                selectedOuterCategory = outer;
                selectedInnerCategory = false;
              "
              :class="{ selected: selectedOuterCategory === outer }"
            >
              {{ outer.name }}
            </div>
          </div>
          <div class="right">
            <template v-if="selectedOuterCategory" v-for="outer in categories">
              <div
                v-if="selectedOuterCategory === outer"
                v-for="inner in outer.children"
                @click="selectInner(inner, outer)"
                @mouseover="selectedInnerCategory = inner"
                :class="{ selected: selectedInnerCategory === inner }"
              >
                {{ inner.name }}
              </div>
            </template>
          </div>
        </div>
      </div>
      <div @click="$emit('close')" class="close">
        <i class="fas fa-times"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryModal",
  data: function () {
    return {
      selectedOuterCategory: false,
      selectedInnerCategory: false,
      categories: [],
    };
  },
  methods: {
    selectOuter: function (outer) {
      this.selectedOuterCategory = outer;
      this.selectedInnerCategory = false;
      this.$emit("selectedOuter", outer);
      this.$emit("close");
    },
    selectInner: function (inner, outer) {
      this.selectedInnerCategory = inner;
      this.$emit("selectedInner", inner);
      this.$emit("selectedInnerOuter", outer);
      this.$emit("close");
    },
  },
  mounted: function () {
    this.$http.get("categories").then(
      function (response) {
        this.categories = response.data;
      }.bind(this)
    );
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.category-modal {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .overlay {
    background: rgba(0, 0, 0, 0.4);
    width: 100vw;
    height: 100vh;
  }

  .wrapper {
    position: absolute;
    z-index: 105;

    .window {
      width: 540px;
      background: $white;
      border: 1px solid $active-gray;
      border-radius: 6px;
      padding: 20px;

      .window-row {
        margin-top: 20px;

        &:first-child {
          margin-top: 0;
        }
      }

      .top {
        font-size: 18px;
        line-height: 22px;
        color: $completely-black;
      }

      .middle {
        height: 300px;
        display: flex;

        & > div {
          width: 250px;
          overflow: scroll;
          color: $avatar-black;
          font-size: 14px;
          line-height: 17px;
          cursor: pointer;
        }

        .left {
          div {
            height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px 0 15px;

            &::after {
              content: "\f054";
              font-size: 14px;
              line-height: 17px;
              font-family: "Font Awesome 5 Free";
              font-weight: 600;
            }
          }
        }

        .right {
          div {
            height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px 0 15px;

            &::after {
              content: "\f054";
              font-size: 14px;
              line-height: 17px;
              font-family: "Font Awesome 5 Free";
              font-weight: 600;
            }
          }
        }

        .selected {
          background: $blue2;
          color: $white;
        }
      }
    }

    .close {
      position: absolute;
      top: 0;
      right: -35px;
      color: $border-white;
      cursor: pointer;
    }
  }
}
</style>
