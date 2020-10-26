<template>
  <div class="page">
    <Navbar class="navbar-custom" :tabs="tabs"></Navbar>
    <div class="container">
      <div class="toolbar-wrapper">
        <Toolbar
          @toggledNavbarMenu="toggleNavbarMenu()"
          @toggledDropdownMenu="toggleDropdownMenu()"
        ></Toolbar>
      </div>
      <div class="search-wrapper">
        <Search @toggled="toggleFilters()"></Search>
      </div>
      <div v-if="$route.name === 'home'" class="categories-wrapper">
        <Categories></Categories>
      </div>
      <div class="d-flex justify-content-start">
        <DescriptionOfCategories></DescriptionOfCategories>
      </div>
      <div class="content-wrapper">
        <div class="content">
          <router-view></router-view>
        </div>
        <div class="menu">
          <Sale></Sale>
          <Top></Top>
        </div>
      </div>
      <!--            <div class="horizontal-ad-wrapper">-->
      <!--                <HorizontalAd></HorizontalAd>-->
      <!--            </div>-->
      <NavbarMenu
        :tabs="tabs"
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
    <div class="footer-wrapper">
      <Footer></Footer>
    </div>
    <NavbarMenu
      :tabs="tabs"
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
import Search from "@/components/Search";
import Categories from "@/components/Categories";
import Footer from "@/components/All/Footer";
import Sale from "@/components/Sale";
import Top from "@/components/Top";
import NavbarMenu from "@/components/All/NavbarMenu";
import DropdownMenu from "@/components/All/DropdownMenu";
import MobileFilters from "@/components/All/MobileFilters";
import DescriptionOfCategories from "@/components/DescriptionOfCategories";

export default {
  name: "Page",
  metaInfo() {
    return {
      title: this.categoryName,
      meta: [
        {
          name:"description",
          content:
            "some words from Page components",
        },
      ],
    };
  },
  components: {
    Navbar,
    Toolbar,
    Search,
    Categories,
    Footer,
    Sale,
    Top,
    NavbarMenu,
    DropdownMenu,
    MobileFilters,
    DescriptionOfCategories,
  },
  data() {
    return {
      navbarMenuShown: false,
      dropdownMenuShown: false,
      filtersShown: false,
      categories: [],
      categoryName: "rdctfghnjkl",
      description: "",
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
    this.$http.get("fast_access_to_category", {
        headers: {
          Authorization: this.$store.state.token,
        },
      })
      .then(
        function (response) {
          this.categories = response.data;
          if (location.pathname !== "/") {
            const category = this.categories.find(
              (res) =>
                res.category.slug ===
                location.pathname.slice(1, location.pathname.length)
            );
            if (category) {
              //this.categoryName = category.category.name;
            }
          }
        }.bind(this)
      );
    this.$http.get("page/list").then(
      function (response) {
        this.tabs = response.data;
      }.bind(this)
    );
    document.documentElement.scrollTop = 0;
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

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
    justify-content: space-between;
    @media screen and (max-width: 1170px) {
      width: 100%;
    }

    .content {
      width: 860px;

      @media screen and (max-width: 1170px) {
        width: 100%;
      }
    }

    .menu {
      width: 260px;

      @media screen and (max-width: 1170px) {
        display: none;
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
