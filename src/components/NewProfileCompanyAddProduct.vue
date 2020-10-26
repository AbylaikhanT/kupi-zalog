<template>
  <div class="profile">
    <Navbar company></Navbar>
    <div class="content">
      <ProfileCompanySidebar></ProfileCompanySidebar>
      <ProfileCompanyAddProduct></ProfileCompanyAddProduct>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Account/Navbar";
import ProfileCompanySidebar from "@/components/Account/Company/Sidebar";
import ProfileCompanyAddProduct from "@/components/ProfileCompanyAddProduct";

export default {
  name: "NewProfileCompanyProfile",
  components: {
    Navbar,
    ProfileCompanySidebar,
    ProfileCompanyAddProduct,
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
