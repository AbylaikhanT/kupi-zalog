<template>
  <div class="listing">
    <AccountBack @clicked="$router.go(-1)"></AccountBack>
    <AccountBreadcrumbs :breadcrumbs="breadcrumbs"></AccountBreadcrumbs>
    <ItemDetail :id="$route.params.id" @name="addName" mine></ItemDetail>
  </div>
</template>

<script>
import AccountBack from "@/components/Account/Back";
import AccountBreadcrumbs from "@/components/Account/Breadcrumbs";
import ItemDetail from "@/components/ItemDetail";

export default {
  name: "AccountCompanyListingDetail",
  components: {
    AccountBack,
    AccountBreadcrumbs,
    ItemDetail,
  },
  data() {
    return {
      breadcrumbs: [
        {
          title: "Мои объявления",
          route: "company-listings-list",
        },
      ],
    };
  },
  methods: {
    addName(name) {
      this.breadcrumbs.push({
        title: name,
      });
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.listing {
  padding: 40px 30px;

  .breadcrumbs {
    margin-top: 30px;
  }

  .item {
    margin-top: 30px;
    width: 880px;

    @media screen and (max-width: 1170px) {
      width: 100%;
    }
  }
}
</style>
