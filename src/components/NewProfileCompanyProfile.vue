<template>
  <div class="profile">
    <ProfileNavbar company></ProfileNavbar>
    <div class="content">
      <ProfileCompanySidebar></ProfileCompanySidebar>
      <ProfileCompanyProfile></ProfileCompanyProfile>
    </div>
  </div>
</template>

<script>
import ProfileNavbar from "@/components/ProfileNavbar";
import ProfileCompanySidebar from "@/components/ProfileCompanySidebar";
import ProfileCompanyProfile from "@/components/ProfileCompanyProfile";

export default {
  name: "NewProfileCompanyProfile",
  components: {
    ProfileNavbar,
    ProfileCompanySidebar,
    ProfileCompanyProfile,
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
