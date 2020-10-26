<template>
  <div class="sign">
    <span @click="redirect('login')">Вход</span>
    <span class="middle"> / </span>
    <span @click="redirect('registration')">Регистрация</span>
    <!--<span @click="openModal('signIn')">Вход</span>-->
    <!--<span class="middle"> / </span>-->
    <!--<span @click="openModal('signUp')">Регистрация</span>-->
    <!--<SignInModal></SignInModal>-->
    <!--<SignUpModal></SignUpModal>-->
  </div>
</template>

<script>
import SignInModal from "@/components/All/Sign/In/Modal";
import SignUpModal from "@/components/All/Sign/Up/Modal";

import { mapActions } from "vuex";

export default {
  name: "Sign",
  components: {
    SignInModal,
    SignUpModal,
  },
  methods: {
    ...mapActions(["openModal"]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.sign {
  display: flex;

  span {
    color: $blue;
    font-size: 16px;
    cursor: pointer;

    &.middle {
      margin: 0 5px;
    }
  }
}
</style>
