<template>
  <div class="profile">
    <ProfileNavbar></ProfileNavbar>
    <div class="content">
      <ProfileCompanySidebar tab="products"></ProfileCompanySidebar>
      <ProfileCompanyProducts></ProfileCompanyProducts>
    </div>
  </div>
</template>

<script>
import ProfileNavbar from "@/components/ProfileNavbar";
import ProfileCompanySidebar from "@/components/ProfileCompanySidebar";
import ProfileCompanyProducts from "@/components/ProfileCompanyProducts";

export default {
  name: "NewProfileCompanyProducts",
  components: {
    ProfileNavbar,
    ProfileCompanySidebar,
    ProfileCompanyProducts,
  },
};
</script>

<style lang="scss" scoped>
.profile {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    display: flex;
  }
}
</style>
