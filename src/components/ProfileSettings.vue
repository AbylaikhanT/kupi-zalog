<template>
  <div class="settings">
    <div class="header">Изменить пароль</div>
    <div class="phone">
      <span class="label">Ваш номер:</span>
      <span>{{ phone }}</span>
    </div>
    <div class="passwords">
      <div class="input-row">
        <span>Старый пароль</span>
        <div class="input-wrapper">
          <input :value="password" type="password" />
          <div @click="changeType">
            <i class="far fa-eye"></i>
          </div>
        </div>
      </div>
      <div class="input-row">
        <span>Новый пароль</span>
        <div class="input-wrapper">
          <input :value="password" type="password" />
          <div @click="changeType">
            <i class="far fa-eye"></i>
          </div>
        </div>
      </div>
      <div class="input-row">
        <span>Повторите пароль</span>
        <div class="input-wrapper">
          <input :value="password" type="password" />
          <div @click="changeType">
            <i class="far fa-eye"></i>
          </div>
        </div>
      </div>
    </div>
    <button class="save">Сохранить изменения</button>
  </div>
</template>

<script>
export default {
  name: "ProfileSettings",
  props: {
    phone: String,
    password: String,
  },
  methods: {
    changeType(e) {
      const target = (e.target.tagName === "I"
        ? e.target.parentElement.parentElement
        : e.target.parentElement
      ).children[0];
      if (target.type === "password") {
        target.type = "text";
        target.parentElement.classList.add("active");
      } else {
        target.type = "password";
        target.parentElement.classList.remove("active");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.settings {
  font-family: $font;

  .header {
    font-size: 22px;
    line-height: 25px;
    color: $avatar-black;
  }

  .label {
    font-size: 14px;
    line-height: 16px;
    color: $border-gray;
  }

  .phone {
    display: flex;
    align-items: center;
    color: $avatar-black;
    margin-top: 28px;

    .label {
      margin-right: 5px;
    }
  }

  .passwords {
    margin-top: 40px;

    .input-row {
      display: flex;
      align-items: center;
      margin-top: 25px;

      &:first-child {
        margin-top: 0;
      }

      span {
        font-size: 14px;
        line-height: 16px;
        color: $border-gray;
        width: 160px;
      }

      .input-wrapper {
        border: 1px solid $border-gray;
        border-radius: 6px;
        display: flex;
        margin-right: 15px;
        width: 400px;
        overflow: hidden;

        &.active {
          i {
            color: $completely-black;
          }
        }

        input {
          color: $completely-black;
          font-size: 14px;
          line-height: 16px;
          height: 35px;
          background: $white;
          width: 375px;
          border: 0;
          border-radius: 0;
          padding: 10px 0 10px 15px;
        }

        div {
          padding: 10px 15px 10px 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: $white;
          cursor: pointer;

          i {
            font-size: 15px;
            color: $profile-password-gray;
          }
        }
      }
    }
  }

  .save {
    width: 180px;
    height: 35px;
    font-size: 12px;
    font-weight: bold;
    line-height: 14px;
    border-radius: 6px;
    color: $white;
    background: $blue;
    margin-top: 50px;
  }
}
</style>
