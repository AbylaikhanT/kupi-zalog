<template>
  <div v-if="$store.state.modal === 'signIn'" class="sign">
    <div @click="closeModal()" class="overlay"></div>
    <div class="wrapper">
      <div class="window">
        <div class="header">
          <span @click="openModal('signIn')" class="active">Вход</span>
          <span @click="openModal('signUp')">Регистрация</span>
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
      <div @click="closeModal()" class="close">
        <i class="fas fa-times"></i>
      </div>
    </div>
  </div>
</template>

<script>
import SignInLogin from "@/components/All/Sign/In/Content/Login";
import SignInForgotPassword from "@/components/All/Sign/In/Content/ForgotPassword";
import SignInNewPassword from "@/components/All/Sign/In/Content/NewPassword";

import { mapActions } from "vuex";

export default {
  name: "SignInModal",
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
    ...mapActions(["openModal", "closeModal"]),
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
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.sign {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .overlay {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .wrapper {
    position: absolute;
    z-index: 25;

    .window {
      padding: 50px;
      width: 360px;
      border: 1px solid $light-gray3;
      border-radius: 4px;
      background-color: $white;

      @media screen and (max-width: 1170px) {
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

    .close {
      position: absolute;
      top: 0;
      right: -35px;
      color: $light-gray4;
      cursor: pointer;
    }
  }
}
</style>
