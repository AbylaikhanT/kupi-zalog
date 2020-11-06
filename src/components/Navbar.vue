<template>
  <div class="top-navbar">
    <div class="container">
      <div class="row no-gutters">
        <div class="col">
          <ul>
            <li v-for="(tab, index) in tabs" v-if="tab.type === 1" :key="index">
              <a :href="'/' + tab.slug">{{ tab.name }}кккк</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data: function () {
    return {
      tabs: [],
    };
  },
  mounted: function () {
    this.$http.get("page/list/").then(
      function (response) {
        this.tabs = response.data;
      }.bind(this)
    );
  },
};
</script>

<style lang="scss" scoped>
@import "@src/assets/variables/_variables.scss";

.top-navbar {
  background-color: $blue;
  font-family: $font;
  font-weight: 500;
  font-size: 14px;
  color: $white;
  display: none;
  height: 56px;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }

  .container {
    padding-top: 0;
    padding-bottom: 0;
  }

  ul {
    list-style: none;
    display: flex;
    padding: 0;
    margin-bottom: 0;

    li {
      margin-right: 40px;

      &:last-child {
        margin-right: 0;
      }

      @include anchor($white);
    }
  }
}
</style>
