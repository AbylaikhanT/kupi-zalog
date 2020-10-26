<template>
  <div v-if="$store.state.modal === 'signUp'" class="sign">
    <div @click="closeModal()" class="overlay"></div>
    <div class="wrapper">
      <div class="window">
        <div class="header">
          <span @click="openModal('signIn')">Вход</span>
          <span @click="openModal('signUp')" class="active">Регистрация</span>
        </div>
        <div class="content">
          <SignUpChoice
            v-if="content === 'choice'"
            @isUser="setIsUser"
            @forward="moveToInfo()"
          ></SignUpChoice>
          <SignUpInfo
            v-if="content === 'info'"
            :isUser="isUser"
            @info="setInfo"
            @back="moveToChoice()"
            @forward="signUpUser()"
          ></SignUpInfo>
          <SignUpConfirmPhone
            v-if="content === 'confirm'"
            @code="setCode"
            @back="moveToInfo()"
            @forward="confirmPhone()"
          ></SignUpConfirmPhone>
          <SignUpCompany
            v-if="content === 'company'"
            @company="setCompany"
            @back="moveToInfo()"
            @forward="signUpCompany()"
          ></SignUpCompany>
          <SignUpFill
            v-if="content === 'fill'"
            @back="moveToCompany()"
            @forward="moveToConfirm()"
          ></SignUpFill>
        </div>
      </div>
      <div @click="closeModal()" class="close">
        <i class="fas fa-times"></i>
      </div>
    </div>
  </div>
</template>

<script>
import SignUpChoice from "@/components/All/Sign/Up/Content/Choice";
import SignUpInfo from "@/components/All/Sign/Up/Content/Info";
import SignUpConfirmPhone from "@/components/All/Sign/Up/Content/ConfirmPhone";
import SignUpFill from "@/components/All/Sign/Up/Content/Fill";
import SignUpCompany from "@/components/All/Sign/Up/Content/Company";

import { mapActions } from "vuex";

export default {
  name: "SignUpModal",
  components: {
    SignUpChoice,
    SignUpInfo,
    SignUpConfirmPhone,
    SignUpFill,
    SignUpCompany,
  },
  data() {
    return {
      content: "choice",
      isUser: true,
      info: undefined,
      company: undefined,
      code: "",
    };
  },
  methods: {
    ...mapActions(["openModal", "closeModal"]),
    moveToChoice() {
      this.content = "choice";
    },
    moveToInfo() {
      this.content = "info";
    },
    moveToConfirm() {
      this.content = "confirm";
    },
    moveToFill() {
      this.content = "fill";
    },
    moveToCompany() {
      this.content = "company";
    },
    setIsUser(isUser) {
      this.isUser = isUser;
    },
    setInfo(info) {
      this.info = info;
    },
    setCompany(company) {
      this.company = company;
    },
    setCode(code) {
      this.code = code;
    },
    signUpUser() {
      if (this.isUser) {
        this.$http
            .post("user/registration/", this.info)
          .then(
            function (response) {
              if (response.data.status) {
                this.moveToConfirm();
              } else {
                this.$notify({
                  group: "sign",
                  title: "Ошибка",
                  text: response.data.detail,
                  type: "error",
                });
              }
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$notify({
                group: "sign",
                title: "Ошибка",
                text: JSON.stringify(error.response.data),
                type: "error",
              });
            }.bind(this)
          );
      } else {
        this.moveToCompany();
      }
    },
    confirmPhone() {
      this.$http
        .post("user/validate_user_phone/", {
          phone: this.info.phone,
          otp: this.code,
        })
        .then(
          function (response) {
            if (response.data.status) {
              this.openModal("signIn");
            } else {
              this.$notify({
                group: "sign",
                title: "Ошибка",
                text: response.data.detail,
                type: "error",
              });
            }
          }.bind(this)
        )
        .catch(
          function (error) {
            this.$notify({
              group: "sign",
              title: "Ошибка",
              text: JSON.stringify(error.response.data),
              type: "error",
            });
          }.bind(this)
        );
    },
    signUpCompany() {
      this.$http
        .post(
          "companies/registration/",
          Object.assign({}, this.info, this.company)
        )
        .then(
          function (response) {
            if (response.data.status) {
              this.moveToConfirm();
            } else {
              this.$notify({
                group: "sign",
                title: "Ошибка",
                text: response.data.detail,
                type: "error",
              });
            }
          }.bind(this)
        )
        .catch(
          function (error) {
            this.$notify({
              group: "sign",
              title: "Ошибка",
              text: JSON.stringify(error.response.data),
              type: "error",
            });
          }.bind(this)
        );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

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
    }

    .content {
      margin-top: 15px;
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
