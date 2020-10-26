<template>
  <div class="sign">
    <div @click="$emit('close')" class="overlay"></div>
    <div class="wrapper">
      <div class="window">
        <div class="top window-row">
          <div :class="{ active: login }" @click="login = true">Вход</div>
          <div :class="{ active: !login }" @click="login = false">
            Регистрация
          </div>
        </div>
        <div class="middle window-row">
          <div v-if="login">
            <input
              v-model="phone"
              @keyup="handleSignIn"
              placeholder="Телефон"
            />
            <input
              v-model="password"
              @keyup="handleSignIn"
              placeholder="Пароль"
              type="password"
            />
            <div class="remember">
              <input type="checkbox" @keyup="handleSignIn" checked />
              <div class="checkmark"></div>
              <span>Remember me</span>
            </div>
          </div>
          <div v-else>
            <template v-if="!selected">
              <button
                @click="
                  isUser = true;
                  selected = true;
                "
                class="btn-type"
              >
                Хочу купить
              </button>
              <button
                @click="
                  isUser = false;
                  selected = true;
                "
                class="btn-type"
              >
                Хочу продать
              </button>
            </template>
            <template v-if="selected && !phoneConfirmation && !companyFilled">
              <input
                v-model="phone"
                @keyup="handleSignUp"
                placeholder="Телефон"
              />
              <input
                v-model="first_name"
                @keyup="handleSignUp"
                placeholder="Имя"
              />
              <input
                v-model="last_name"
                @keyup="handleSignUp"
                placeholder="Фамилия"
              />
              <input
                v-model="email"
                @keyup="handleSignUp"
                placeholder="Электронная почта"
              />
              <input
                v-model="password1"
                @keyup="handleSignUp"
                placeholder="Придумайте пароль"
                type="password"
              />
              <input
                v-model="password2"
                @keyup="handleSignUp"
                placeholder="Повторите пароль"
                type="password"
              />
              <div class="controls">
                <button @click="selected = false">Назад</button>
                <button @click="signUp()" class="forward">Далее</button>
              </div>
            </template>
            <template
              v-if="selected && !phoneConfirmation && !isUser && companyFilled"
            >
              <div class="select-wrapper">
                <select v-model="companyType">
                  <option value="" selected disabled hidden>
                    Выберите тип учереждения
                  </option>
                  <option v-for="type of companyTypes" :value="type.id">
                    {{ type.title }}
                  </option>
                </select>
              </div>
              <input
                v-model="companyTitle"
                type="text"
                placeholder="Напишите название учреждения"
              />
              <div class="select-wrapper">
                <select v-model="companyStructure">
                  <option value="" selected disabled hidden>
                    Выберите тип организации
                  </option>
                  <option
                    v-for="structure of companyStructures"
                    :value="structure.id"
                  >
                    {{ structure.title }}
                  </option>
                </select>
              </div>
              <input
                v-model="companyStructureTitle"
                type="text"
                placeholder="Напишите название организации"
              />
              <input v-model="companyId" type="text" placeholder="БИН/ИИН" />
              <div class="select-wrapper">
                <select v-model="companyCity">
                  <option value="" selected disabled hidden>
                    Выберите город
                  </option>
                  <option v-for="city of cities" :value="city.id">
                    {{ city.title }}
                  </option>
                </select>
              </div>
              <input v-model="companyAddress" type="text" placeholder="Адрес" />
              <div class="controls">
                <button @click="selected = false">Назад</button>
                <button @click="signUp()" class="forward">Далее</button>
              </div>
            </template>
            <template
              v-if="
                selected &&
                phoneConfirmation &&
                (isUser || (!isUser && companyFilled && companyFilledProceed))
              "
            >
              <input
                v-model="phone"
                @keyup="handleSignUp"
                placeholder="Телефон"
              />
              <input
                v-model="sms"
                @keyup="handleConfirm"
                placeholder="Код из смс"
              />
              <div class="controls">
                <button @click="phoneConfirmation = false">Назад</button>
                <button @click="confirm()" class="forward">Далее</button>
              </div>
            </template>
          </div>
        </div>
        <div v-if="login" class="bottom window-row">
          <button @click="signIn()">Вход</button>
        </div>
      </div>
      <div @click="$emit('close')" class="close">
        <i class="fas fa-times"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignModal",
  data: function () {
    return {
      login: true,
      isUser: true,
      selected: false,
      phoneConfirmation: false,
      companyFilled: false,
      companyFilledProceed: false,
      phone: "",
      password: "",
      first_name: "",
      last_name: "",
      email: "",
      password1: "",
      password2: "",
      sms: "",
      companyTitle: "",
      companyStructureTitle: "",
      companyType: undefined,
      companyTypes: [
        {
          id: 1,
          title: "Ламбард",
        },
        {
          id: 2,
          title: "Банк",
        },
      ],
      companyStructure: undefined,
      companyStructures: [
        {
          id: 1,
          title: "ТОО",
        },
        {
          id: 2,
          title: "ИП",
        },
        {
          id: 3,
          title: "АО",
        },
        {
          id: 4,
          title: "ООО",
        },
      ],
      companyId: undefined,
      companyCity: undefined,
      cities: [
        {
          id: 1,
          title: "Алматы",
          parent: null,
        },
        {
          id: 2,
          title: "Астана",
          parent: null,
        },
        {
          id: 3,
          title: "Орал",
          parent: null,
        },
      ],
      companyAddress: "",
    };
  },
  methods: {
    signUp: function () {
      if (this.isUser) {
        this.$http
            .post("user/registration/", {
            phone: this.phone,
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password1: this.password1,
            password2: this.password2,
          })
          .then(
            function (response) {
              if (response.data.status) {
                this.phoneConfirmation = true;
              }
            }.bind(this)
          )
          .catch(
            function () {
              this.$notify({
                group: "sign",
                title: "Ошибка",
                text: "Пользователь не зарегистрирован",
                type: "error",
              });
            }.bind(this)
          );
      } else {
        if (this.companyFilled) {
          if (!this.companyFilledProceed) {
            this.companyFilledProceed = true;
            this.$http.post("companies/registration/", {
                phone: this.phone,
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                password1: this.password1,
                password2: this.password2,
                iin: this.companyId,
                type: this.companyType,
                title: this.companyTitle,
                structure: this.companyStructure,
                structure_title: this.companyStructureTitle,
                city: this.companyCity,
                address: this.companyAddress,
              })
              .then(
                function (response) {
                  if (response.data.status) {
                    this.phoneConfirmation = true;
                  }
                }.bind(this)
              )
              .catch(
                function () {
                  this.$notify({
                    group: "sign",
                    title: "Ошибка",
                    text: "Компания не зарегистрирована",
                    type: "error",
                  });
                }.bind(this)
              );
          }
        } else {
          this.companyFilled = true;
        }
      }
    },
    signIn: function () {
      this.$store
        .dispatch("signIn", {
          phone: this.phone,
          password: this.password,
        })
        .catch(
          function () {
            this.$notify({
              group: "sign",
              title: "Ошибка",
              text: "Неправильный логин или пароль",
              type: "error",
            });
          }.bind(this)
        );
    },
    confirm: function () {
      if (this.isUser || this.companyFilled) {
        this.$http
            .post("user/validate_user_phone/", {
            phone: this.phone,
            otp: this.sms,
          })
          .then(
            function (response) {
              if (response.data.status) {
                this.login = true;
              }
            }.bind(this)
          )
          .catch(
            function () {
              this.$notify({
                group: "sign",
                title: "Ошибка",
                text: "Неправильный логин или пароль",
                type: "error",
              });
            }.bind(this)
          );
      }
    },
    handleSignIn: function (e) {
      if (e.keyCode === 13) {
        this.signIn();
      }
    },
    handleSignUp: function (e) {
      if (e.keyCode === 13) {
        this.signUp();
      }
    },
    handleConfirm: function (e) {
      if (e.keyCode === 13) {
        this.confirm();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.sign {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .overlay {
    background: rgba(0, 0, 0, 0.4);
    width: 100vw;
    height: 100vh;
  }

  .wrapper {
    position: absolute;
    z-index: 105;

    .window {
      width: 360px;
      background: $white;
      border: 1px solid $active-gray;
      border-radius: 6px;
      padding: 50px;

      .window-row {
        margin-top: 40px;

        &:first-child {
          margin-top: 0;
        }

        .btn-type {
          width: 100%;
          height: 50px;
          background: $blue;
          border: none;
          border-radius: 5px;
          color: $white;
          font-size: 18px;
          line-height: 22px;

          &:first-child {
            margin-bottom: 15px;
          }
        }
      }

      .top {
        font-size: 20px;
        line-height: 24px;
        color: $avatar-black;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        div {
          padding: 5px 10px;
          cursor: pointer;
        }

        .active {
          font-size: 26px;
          line-height: 30px;
          border-bottom: 1px solid $blue;
        }
      }

      .middle {
        div input {
          width: 100%;
          height: 40px;
          border: 1px solid $gray;
          border-radius: 6px;
          padding: 13px;
          margin-top: 15px;

          &:first-child {
            margin-top: 0;
          }

          &::placeholder {
            color: $gray3;
            font-size: 12px;
            line-height: 14px;
          }
        }

        .select-wrapper {
          background: $white;
          border: 1px solid $gray;
          border-radius: 5px;
          width: 100%;
          height: 40px;
          position: relative;
          z-index: 50;
          cursor: pointer;
          margin-top: 15px;
          font-size: 12px;
          line-height: 14px;

          &:first-child {
            margin-top: 0;
          }

          &::after {
            height: 100%;
            position: absolute;
            display: flex;
            align-items: center;
            top: 0;
            right: 15px;
            content: "\f078";
            font-size: 12px;
            font-family: "Font Awesome 5 Free";
            font-weight: 600;
          }

          select {
            padding: 13px;
            width: 100%;
            height: 100%;
            appearance: none;
            background: transparent;
            position: relative;
            outline: none;
            z-index: 55;
          }
        }

        .remember {
          margin-top: 15px;
          position: relative;
          cursor: pointer;
          user-select: none;
          display: flex;
          align-items: center;

          .checkmark {
            position: absolute;
            top: auto;
            left: 0;
            width: 22px;
            height: 22px;
            border: 1px solid $gray;
            border-radius: 3px;
            z-index: 1;

            &::after {
              content: "";
              position: absolute;
              top: 3px;
              left: 7px;
              width: 7px;
              height: 12px;
              border: solid $checkbox-green;
              border-width: 0 3px 3px 0;
              transform: rotate(45deg);
              display: none;
            }
          }

          input {
            position: absolute;
            opacity: 0;
            width: 100%;
            height: 100%;
            z-index: 5;
            cursor: pointer;

            &:checked ~ .checkmark::after {
              display: block;
            }
          }

          span {
            margin-left: 35px;
            font-size: 14px;
            line-height: 16px;
            color: $gray3;
            z-index: 1;
          }
        }

        .controls {
          display: flex;
          margin-top: 20px;

          button {
            width: calc(50% - 10px);
            height: 40px;
            border: 1px solid $blue;
            border-radius: 5px;
            color: $almost-black;
            font-size: 14px;
            font-weight: bold;
            line-height: 19px;

            &.forward {
              margin-left: 20px;
              background: $blue;
              border: none;
              color: $white;
            }
          }
        }
      }

      .bottom {
        button {
          text-transform: uppercase;
          font-size: 14px;
          font-weight: bold;
          line-height: 16px;
          color: $white;
          width: 100%;
          height: 49px;
          background: $blue;
          border: 0;
          border-radius: 6px;
        }
      }
    }

    .close {
      position: absolute;
      top: 0;
      right: -35px;
      color: $border-white;
      cursor: pointer;
    }
  }
}
</style>
