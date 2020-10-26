<template>
  <div class="profile">
    <ProfileNavbar company></ProfileNavbar>
    <div class="content">
      <ProfileCompanySidebar tab="services" company></ProfileCompanySidebar>
      <Services></Services>
    </div>
  </div>
</template>

<script>
import ProfileNavbar from "@/components/ProfileNavbar";
import ProfileCompanySidebar from "@/components/ProfileCompanySidebar";
import Services from "@/components/Services";

export default {
  name: "ServicesPage",
  components: {
    ProfileNavbar,
    ProfileCompanySidebar,
    Services,
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
