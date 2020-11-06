<template>
  <div class="sign">
    <div class="window">
      <div class="header">
        <span @click="redirect('login')">Вход</span>
        <span @click="redirect('registration')" class="active"
          >Регистрация</span
        >
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
  name: "Registration",
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
              this.redirect("login");
              this.$notify({
                group: "sign",
                title: "Успешно!",
                text: "Вы успешно зарегистрировались.",
                type: "success",
              });
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
  created() {
    if (this.$store.getters.loggedIn) {
      this.redirect("home");
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
  }

  .content {
    margin-top: 15px;
  }
}
</style>
