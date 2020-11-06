<template>
  <div class="page">
    <Navbar :tabs="tabs"></Navbar>
    <div class="toolbar-wrapper">
      <Toolbar
        @toggledNavbarMenu="toggleNavbarMenu()"
        @toggledDropdownMenu="toggleDropdownMenu()"
      ></Toolbar>
    </div>
    <div class="content-wrapper">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <div class="footer-wrapper">
      <Footer></Footer>
    </div>
    <NavbarMenu
      v-if="navbarMenuShown"
      @toggled="toggleNavbarMenu()"
    ></NavbarMenu>
    <DropdownMenu
      v-if="dropdownMenuShown"
      @toggled="toggleDropdownMenu()"
    ></DropdownMenu>
    <MobileFilters
      v-if="filtersShown"
      @toggled="toggleFilters()"
    ></MobileFilters>
    <notifications group="sign" position="bottom left"></notifications>
  </div>
</template>

<script>
import Navbar from "@/components/All/Navbar";
import Toolbar from "@/components/All/Toolbar";
import Footer from "@/components/All/Footer";
import NavbarMenu from "@/components/All/NavbarMenu";
import DropdownMenu from "@/components/All/DropdownMenu";
import MobileFilters from "@/components/All/MobileFilters";

export default {
  name: "Page",
  components: {
    Navbar,
    Toolbar,
    Footer,
    NavbarMenu,
    DropdownMenu,
    MobileFilters,
  },
  data() {
    return {
      navbarMenuShown: false,
      dropdownMenuShown: false,
      filtersShown: false,
      tabs: [],
    };
  },
  methods: {
    toggleNavbarMenu() {
      this.navbarMenuShown = !this.navbarMenuShown;
    },
    toggleDropdownMenu() {
      this.dropdownMenuShown = !this.dropdownMenuShown;
    },
    toggleFilters() {
      this.filtersShown = !this.filtersShown;
    },
  },
  mounted: function () {
    this.$http.get("page/list").then(
      function (response) {
        this.tabs = response.data;
      }.bind(this)
    );
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  position: relative;

  .toolbar-wrapper {
    margin-top: 40px;
    width: 1170px;

    @media screen and (max-width: 1170px) {
      margin-top: 0;
      padding: 20px;
      width: 100%;
    }
  }

  .search-wrapper {
    margin-top: 40px;
    width: 1170px;

    @media screen and (max-width: 1170px) {
      margin-top: 20px;
      padding: 0 20px;
      width: 100%;
    }
  }

  .categories-wrapper {
    margin-top: 40px;
    width: 1170px;

    @media screen and (max-width: 1170px) {
      display: none;
    }
  }

  .content-wrapper {
    margin-top: 40px;
    display: flex;

    @media screen and (max-width: 1170px) {
      width: 100%;
    }

    .content {
      width: 1170px;

      @media screen and (max-width: 1170px) {
        width: 100%;
      }
    }
  }

  .horizontal-ad-wrapper {
    margin: 45px 0 60px 0;
    width: 1170px;

    @media screen and (max-width: 1170px) {
      display: none;
    }
  }

  .footer-wrapper {
    margin-top: 60px;
    width: 100%;
  }
}
</style>
