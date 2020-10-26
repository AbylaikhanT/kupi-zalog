<template>
  <div class="profile">
    <ProfileNavbar company></ProfileNavbar>
    <div class="content">
      <ProfileCompanySidebar></ProfileCompanySidebar>
      <div></div>
    </div>
  </div>
</template>

<script>
import ProfileNavbar from "@/components/ProfileNavbar";
import ProfileCompanySidebar from "@/components/ProfileCompanySidebar";

export default {
  name: "NewProfileCompany",
  components: {
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
