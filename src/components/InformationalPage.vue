<template>
  <div class="page">
    <div v-if="selectedTab" class="content">
      <p v-html="selectedTab.description"></p>
    </div>
  </div>
</template>

<script>

export default {
  name: "InformationalPage",
  components: {},
  data: function () {
    return {
      tabs: [],
    };
  },
  computed: {
    selectedTab: function () {
      for (const tab of this.tabs) {
        if (tab.slug === this.$route.params.slug) {
          document.documentElement.scrollTop = 0;
          return tab;
        }
      }
      return undefined;
    },
  },
  mounted: function () {
    console.log("inf page");
    this.$http
      .get("page/list/", {
        headers: {
          Authorization: this.$store.state.token,
        },
      })
      .then(
        function (response) {
          this.tabs = response.data;
          if (this.selectedTab) {
            document.title = this.selectedTab.name;
          }
        }.bind(this)
      );
    document.documentElement.scrollTop = 0;
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";
@import "@/assets/mixins";

.page {
  margin-top: 35px;

  @media screen and (max-width: 1170px) {
    padding: 0 20px;
  }

  .tabs {
    width: 100%;
    margin-bottom: 40px;
    border-bottom: 1px solid $border-gray;
    display: flex;
    z-index: 1;

    @media screen and (max-width: 1170px) {
      overflow: scroll;
    }

    .tab {
      flex-shrink: 0;
      width: 110px;
      color: $avatar-black;
      font-size: 16px;
      line-height: 19px;
      display: flex;
      justify-content: center;
      padding-top: 10px;
      padding-bottom: 10px;
      cursor: pointer;
      position: relative;
      bottom: -2px;
      z-index: 2;

      &.active {
        color: $blue;
        border-bottom: 3px solid $blue;
      }

      i {
        margin-right: 12px;
      }
    }

    a {
      @include a($avatar-black);
    }
  }

  .content {
    width: 100%;
    padding: 30px;
    border: 1px solid rgba(112, 112, 112, 0.1);
    border-radius: 5px;
    color: $avatar-black;

    h1 {
      font-size: 26px;
      line-height: 34px;
      font-weight: bold;
      text-align: center;
    }

    p {
      margin-top: 30px;
      font-size: 18px;
      line-height: 22px;
    }
  }
}
</style>
