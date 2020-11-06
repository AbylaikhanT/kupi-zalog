<template>
  <div class="sign">
    <div class="window">
      <div class="header">
        <span @click="redirect('login')" class="active">Вход</span>
        <span @click="redirect('registration')">Регистрация</span>
      </div>
      <div class="content">
        <SignInLogin
          v-if="content === 'login'"
          @forgot="moveToForgot"
        ></SignInLogin>
        <SignInForgotPassword
          v-if="content === 'forgot'"
          @back="moveToLogin()"
          @forward="moveToNewPassword()"
          :phone="phone"
        ></SignInForgotPassword>
        <SignInNewPassword
          v-if="content === 'new'"
          @back="moveToLogin()"
          @forward="moveToLogin()"
          :phone="phone"
        ></SignInNewPassword>
      </div>
    </div>
  </div>
</template>

<script>
import SignInLogin from "@/components/All/Sign/In/Content/Login";
import SignInForgotPassword from "@/components/All/Sign/In/Content/ForgotPassword";
import SignInNewPassword from "@/components/All/Sign/In/Content/NewPassword";

export default {
  name: "Login",
  components: {
    SignInLogin,
    SignInForgotPassword,
    SignInNewPassword,
  },
  data() {
    return {
      content: "login",
      phone: "",
    };
  },
  methods: {
    moveToForgot(phone) {
      this.content = "forgot";
      this.phone = phone;
    },
    moveToLogin() {
      this.content = "login";
    },
    moveToNewPassword() {
      this.content = "new";
    },
  },
  created() {
    if (this.$store.getters.loggedIn) {
      this.redirect("home");
    }

    if (this.$store.state.newPassword) {
      this.phone = this.$store.state.forgotPassword;
      this.moveToNewPassword();
    }

    if (this.$store.getters.didForgotPassword) {
      this.phone = this.$store.state.forgotPassword;
      this.moveToForgot();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.sign {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .window {
    margin: 150px 0;
    padding: 50px;
    width: 360px;
    border: 1px solid $light-gray3;
    border-radius: 4px;
    background-color: $white;

    @media screen and (max-width: 1170px) {
      margin: 0;
      width: 100vw;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      span {
        padding: 5px 10px;
        border-bottom: 3px solid transparent;
        color: $dark-blue;
        font-size: 20px;
        cursor: pointer;

        &.active {
          border-bottom: 3px solid $blue;
          font-size: 26px;
        }
      }
    }

    .content {
      margin-top: 15px;
    }
  }
}
</style>
