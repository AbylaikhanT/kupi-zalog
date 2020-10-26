<template>
  <div class="edit-phone">
    <div v-if="content === 'phone'">
      <Value label="Телефон">
        <InputPhone
          :phone="$store.state.info.phone"
          @changed="checkNewPhone"
        ></InputPhone>
      </Value>
    </div>
    <div v-if="content === 'edit'" class="edit">
      <Value label="Телефон">
        <InputPhone :phone="newPhone" @changed="setNewPhone"></InputPhone>
      </Value>
      <SecondaryButton @clicked="sendCode()">Изменить</SecondaryButton>
    </div>
    <div v-if="content === 'confirm'" class="confirm">
      <Value label="Телефон">
        <InputPhone :phone="newPhone"></InputPhone>
      </Value>
      <Value label="Пожалуйста введите код подтверждения из смс">
        <InputText @changed="setCode" placeholder="Код из смс"></InputText>
      </Value>
      <Value label="Новый код будет доступен через 60 сек">
        <PrimaryButton @clicked="checkCode">Подтвердить</PrimaryButton>
      </Value>
    </div>
  </div>
</template>

<script>
import Value from "@/components/Core/Value";
import InputText from "@/components/Core/InputText";
import InputPhone from "@/components/Core/InputPhone";
import PrimaryButton from "@/components/Core/PrimaryButton";
import SecondaryButton from "@/components/Core/SecondaryButton";

export default {
  name: "AccountUserProfileEditPhone",
  components: {
    Value,
    InputText,
    InputPhone,
    PrimaryButton,
    SecondaryButton,
  },
  data() {
    return {
      content: "phone",
      newPhone: "",
      code: "",
    };
  },
  methods: {
    moveTo(content) {
      this.content = content;
    },
    setNewPhone(phone) {
      this.newPhone = phone;
    },
    checkNewPhone(phone) {
      if (this.$store.state.info.phone !== phone) {
        this.newPhone = phone;
        this.moveTo("edit");
      }
    },
    setCode(code) {
      this.code = code;
    },
    sendCode() {
      this.$http
        .put(
          "user/profile/",
          {
            phone: this.newPhone,
          },
          {
            headers: {
              Authorization: this.$store.state.token,
            },
          }
        )
        .then(function (response) {
          if (response.data.status) {
            this.moveTo("confirm");
          }
        });
    },
    checkCode() {
      this.$http
        .put(
          "user/profile/",
          {
            phone: this.newPhone,
            phone_otp: this.code,
          },
          {
            headers: {
              Authorization: this.$store.state.token,
            },
          }
        )
        .then(function (response) {
          if (response.data.status) {
            this.$store.dispatch("setUserInfo");
            this.moveTo("phone");
            this.$notify({
              group: "sign",
              title: "Успешно!",
              text: "Телефон успешно изменен.",
              type: "success",
            });
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.edit-phone {
  width: 230px;

  button {
    width: 100%;
  }

  .edit {
    button {
      margin-top: 10px;
    }
  }

  .confirm {
    .value {
      &:not(:first-child) {
        margin-top: 10px;
      }
    }
  }
}
</style>
