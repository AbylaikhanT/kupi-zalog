<template>
  <div class="category">
    <div @click="closeModal()" class="overlay"></div>
    <div class="wrapper">
      <div class="content">
        <div class="header">Выберите рубрику</div>
        <div class="categories">
          <div id="outer" class="outer">
            <div
              v-for="outer in categories"
              @click="selectOuter(outer)"
              @mouseover="hoverOuter($event, outer)"
              @touchstart="scrollToMiddle($event, outer)"
              :class="{ selected: selectedOuter === outer }"
            >
              {{ outer.name }}
            </div>
          </div>
          <div id="middle" class="middle">
            <template
              v-for="outer in categories"
              v-if="selectedOuter === outer"
            >
              <div
                v-for="middle in outer.children"
                @click="selectMiddle(middle, outer)"
                @mouseover="hoverMiddle($event, middle, outer)"
                @touchstart="scrollToInner($event, middle, outer)"
                :class="{ selected: selectedMiddle === middle }"
              >
                {{ middle.name }}
              </div>
            </template>
          </div>
          <div id="inner" class="inner">
            <template
              v-for="outer in categories"
              v-if="selectedOuter === outer"
            >
              <template
                v-for="middle in outer.children"
                v-if="selectedMiddle === middle"
              >
                <div
                  v-for="inner in middle.children"
                  @click="selectInner(inner, middle, outer)"
                  @mouseover="hoverInner($event, inner, middle, outer)"
                  :class="{ selected: selectedInner === inner }"
                >
                  {{ inner.name }}
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
      <div @click="closeModal()" class="close">
        <i class="fas fa-times"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Category",
  created() {
    this.$http
      .get("categories", {
        headers: {
          Authorization: this.$store.state.token,
        },
      })
      .then(
        function (response) {
          this.categories = response.data;
          /* document.title = this.categories.seo.title;
                this.meta=document.createElement('meta');
                this.meta.name='description';
                this.meta.setAttribute('content',this.categories.seo.title);
                document.getElementsByTagName('head')[0].appendChild(this.meta); */
        }.bind(this)
      );
  },
  data() {
    return {
      selectedOuter: undefined,
      selectedMiddle: undefined,
      selectedInner: undefined,
      categories: [],
      isHoveredOuter: false,
      isHoveredMiddle: false,
      lastMouseX: 0,
      lastMouseY: 0,
      categoryName: "",
      description: "",
    };
  },
  methods: {
    ...mapActions(["closeModal"]),
    hoverOuter(e, outer) {
      this.selectedOuter = outer;
      this.selectedMiddle = undefined;
      this.selectedInner = undefined;
    },
    hoverMiddle(e, middle, outer) {
      this.selectedOuter = outer;
      this.selectedMiddle = middle;
      this.selectedInner = undefined;
    },
    hoverInner(e, inner, middle, outer) {
      this.selectedOuter = outer;
      this.selectedMiddle = middle;
      this.selectedInner = inner;
    },
    scrollToMiddle(e, outer) {
      this.hoverOuter(e, outer);
      if (outer.children.length > 0) {
        setTimeout(function () {
          document.getElementById("middle").scrollIntoView();
        }, 100);
      }
    },
    scrollToInner(e, middle, outer) {
      this.hoverMiddle(e, middle, outer);
      if (middle.children.length > 0) {
        setTimeout(function () {
          document.getElementById("inner").scrollIntoView();
        }, 100);
      }
    },
    selectOuter(outer) {
      this.hoverOuter(outer);
      this.$emit("selected", [outer]);
      this.$emit("close");
    },
    selectMiddle(middle, outer) {
      this.hoverMiddle(middle, outer);
      this.$emit("selected", [outer, middle]);
      this.$emit("close");
    },
    selectInner(inner, middle, outer) {
      this.hoverInner(inner, middle, outer);
      this.$emit("selected", [outer, middle, inner]);
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.category {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .overlay {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .wrapper {
    position: absolute;
    z-index: 1;

    .content {
      padding: 20px;
      width: 800px;
      background-color: $white;
      border: 1px solid $light-gray3;
      border-radius: 5px;

      @media screen and (max-width: 1170px) {
        width: 100vw;
      }

      .header {
        color: $black;
        font-size: 18px;
      }

      .categories {
        margin-top: 20px;
        display: flex;

        @media screen and (max-width: 1170px) {
          overflow: scroll;
        }

        .outer,
        .middle,
        .inner {
          width: 250px;
          height: 300px;
          overflow: scroll;
          color: $dark-blue;
          cursor: pointer;

          @media screen and (max-width: 1170px) {
            flex-shrink: 0;
            width: 100%;
          }

          div {
            height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px 0 15px;

            &::after {
              content: "\f054";
              font-family: "Font Awesome 5 Free";
              font-weight: 600;
            }
          }
        }

        .selected {
          background-color: $blue2;
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
