<template>
  <div class="forgot">
    <InputPhone
      :phone="newPhone"
      @changed="setNewPhone"
      placeholder="Телефон"
      disabled
    ></InputPhone>
    <span>Пожалуйста введите код подтверждения из смс</span>
    <InputText @changed="setCode" placeholder="Код из смс"></InputText>
    <span v-if="allowedToSend" @click="sendCode(true)" class="send"
      >Отправить код</span
    >
    <span v-else class="timer">Отправить код повторно через 00:{{ time }}</span>
    <div class="controls">
      <SecondaryButton @clicked="moveBack()">Назад</SecondaryButton>
      <PrimaryButton @clicked="checkCode()">Далее</PrimaryButton>
    </div>
  </div>
</template>

<script>
import InputPhone from "@/components/Core/InputPhone";
import InputText from "@/components/Core/InputText";
import PrimaryButton from "@/components/Core/PrimaryButton";
import SecondaryButton from "@/components/Core/SecondaryButton";

export default {
  name: "SignInForgotPassword",
  components: {
    InputPhone,
    InputText,
    PrimaryButton,
    SecondaryButton,
  },
  props: {
    phone: String,
  },
  data() {
    return {
      newPhone: this.phone,
      code: "",
      allowedToSend: true,
      time: 60,
      timer: undefined,
    };
  },
  methods: {
    moveBack() {
      this.$emit("back", true);
    },
    moveForward() {
      this.$emit("forward", true);
    },
    setNewPhone(phone) {
      this.newPhone = phone;
    },
    setCode(code) {
      this.code = code;
    },
    sendCode(resend) {
      if (this.allowedToSend) {
        this.$http
            .post("user/forgot_password/", {
            phone: this.newPhone,
            resend: resend,
          })
          .then(
            function (response) {
              if (response.data.status) {
                if (!this.$store.getters.didForgotPassword) {
                  this.$store.commit("setForgotPassword", this.newPhone);
                }
                this.$notify({
                  group: "sign",
                  title: "Успешно!",
                  text: response.data.detail,
                  type: "success",
                });
              } else {
                this.$notify({
                  group: "sign",
                  title: "Ошибка!",
                  text: response.data.detail,
                  type: "error",
                });
                this.moveBack();
              }
            }.bind(this)
          );
        this.allowedToSend = false;
        this.timer = setInterval(this.decreaseTimer, 1000);
      }
    },
    decreaseTimer() {
      this.time--;
      if (this.time < 0) {
        clearInterval(this.timer);
        this.allowedToSend = true;
        this.time = 60;
      }
    },
    checkCode() {
      this.$http
        .post("user/forgot_password/", {
          phone: this.newPhone,
          otp: this.code,
        })
        .then(
          function (response) {
            if (response.data.status) {
              this.$store.commit("setNewPassword", true);
              this.$notify({
                group: "sign",
                title: "Успешно!",
                text: response.data.detail,
                type: "success",
              });
              this.moveForward();
            } else {
              this.$notify({
                group: "sign",
                title: "Ошибка!",
                text: response.data.detail,
                type: "error",
              });
            }
          }.bind(this)
        );
    },
  },
  created() {
    if (this.$store.state.newPassword) {
      this.moveForward();
    }

    if (this.$store.getters.didForgotPassword) {
      this.newPhone = this.$store.state.forgotPassword;
    } else {
      this.sendCode(this.$store.state.didForgotPassword);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.forgot {
  display: flex;
  flex-direction: column;

  span {
    margin-bottom: 5px;
    color: $dark-gray2;
  }

  .text {
    &:not(:first-of-type) {
      margin-top: 15px;
    }
  }

  .send {
    margin-top: 5px;
    color: $blue;
    font-size: 12px;
    cursor: pointer;
  }

  .timer {
    margin-top: 5px;
    font-size: 12px;
  }

  .controls {
    margin-top: 30px;
    display: flex;

    button {
      flex: 1;

      &:not(:first-of-type) {
        margin-left: 20px;
      }
    }
  }
}
</style>
