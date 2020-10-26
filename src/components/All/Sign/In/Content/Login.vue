<template>
  <div class="login">
    <InputPhone
      @changed="setPhone"
      @entered="signIn()"
      placeholder="Телефон"
    ></InputPhone>
    <InputPassword
      @changed="setPassword"
      @entered="signIn()"
      placeholder="Пароль"
    ></InputPassword>
    <span @click="forgotPassword()">Забыли пароль?</span>
    <PrimaryButton @clicked="signIn()">Войти</PrimaryButton>
  </div>
</template>

<script>
import InputPhone from "@/components/Core/InputPhone";
import InputPassword from "@/components/Core/InputPassword";
import PrimaryButton from "@/components/Core/PrimaryButton";

export default {
  name: "SignInLogin",
  components: {
    InputPhone,
    InputPassword,
    PrimaryButton,
  },
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    setPhone(phone) {
      this.phone = phone;
    },
    setPassword(password) {
      this.password = password;
    },
    forgotPassword() {
      this.$emit("forgot", this.phone);
    },
    signIn() {
      this.$store
        .dispatch("signIn", {
          phone: this.phone,
          password: this.password,
        })
        .then(
          function () {
            this.redirect("home", {}, {}, true);
          }.bind(this)
        )
        .catch(
          function (error) {
            this.$notify({
              group: "sign",
              title: "Ошибка!",
              text: "Неправильный логин или пароль!",
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

.login {
  display: flex;
  flex-direction: column;

  .password {
    margin-top: 15px;
  }

  span {
    margin-top: 15px;
    color: $dark-gray2;
    cursor: pointer;
  }

  button {
    margin-top: 30px;
  }
}
</style>
