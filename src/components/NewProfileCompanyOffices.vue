<template>
  <div class="profile">
    <ProfileNavbar company></ProfileNavbar>
    <div class="content">
      <ProfileCompanySidebar></ProfileCompanySidebar>
      <ProfileCompanyOffices></ProfileCompanyOffices>
    </div>
  </div>
</template>

<script>
import ProfileNavbar from "@/components/ProfileNavbar";
import ProfileCompanySidebar from "@/components/ProfileCompanySidebar";
import ProfileCompanyOffices from "@/components/ProfileCompanyOffices";

export default {
  name: "NewProfileCompanyOffices",
  components: {
    ProfileCompanyOffices,
    ProfileNavbar,
    ProfileCompanySidebar,
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
