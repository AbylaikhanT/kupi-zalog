<template>
  <div class="edit">
    <div class="header">Редактировать профиль</div>
    <div class="info-inputs">
      <div class="input-row">
        <span>Имя (ФИО)</span>
        <input :value="name" />
      </div>
      <div class="input-row">
        <span>Пол</span>
        <div class="gender">
          <div class="custom-control custom-radio">
            <input :checked="woman" type="radio" class="custom-control-input" />
            <label class="custom-control-label">Женский</label>
          </div>
          <div class="custom-control custom-radio">
            <input
              :checked="!woman"
              type="radio"
              class="custom-control-input"
            />
            <label class="custom-control-label">Мужской</label>
          </div>
        </div>
      </div>
      <div class="input-row">
        <span>Почта</span>
        <input :value="email" />
      </div>
      <div class="input-row">
        <span>Регион</span>
        <div class="region">
          <div class="input-wrapper">
            <input :value="region" />
            <div>
              <i class="fas fa-angle-up"></i>
            </div>
          </div>
          <div class="input-wrapper">
            <input :value="city" />
            <div>
              <i class="fas fa-angle-up"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header contacts">Контактная информация</div>
    <div class="input-row">
      <span>Телефон</span>
      <input :value="phone" />
    </div>
    <div class="phone">
      <span>Добавить телефон</span>
      <button>Подтвердить</button>
    </div>
    <div class="map-header">
      <div class="header">Укажите ваше расположение на карте</div>
      <div class="delete">Удалить метку</div>
    </div>
    <div class="map">Карта</div>
    <div class="controls">
      <button @click="modalShown = true" class="delete">Удалить</button>
      <button class="save">Сохранить изменения</button>
    </div>
    <ProfileModal v-if="modalShown" @close="modalShown = false"></ProfileModal>
  </div>
</template>

<script>
import ProfileModal from "@/components/ProfileModal";

export default {
  name: "ProfileEdit",
  components: {
    ProfileModal,
  },
  props: {
    name: String,
    woman: Boolean,
    email: String,
    region: String,
    city: String,
    phone: String,
  },
  data: function () {
    return {
      modalShown: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.edit {
  font-family: $font;

  .header {
    font-size: 22px;
    line-height: 25px;
    color: $avatar-black;
  }

  .info-inputs {
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

      input {
        border: 1px solid $border-gray;
        border-radius: 6px;
        color: $avatar-black;
        font-size: 12px;
        line-height: 14px;
        width: 505px;
        height: 35px;
        background: $white;
        padding: 10px 15px;
      }

      .gender {
        display: flex;

        div {
          margin-left: 50px;

          &:first-child {
            margin-left: 0;
          }
        }
      }

      .region {
        display: flex;

        .input-wrapper {
          border: 1px solid $border-gray;
          border-radius: 6px;
          display: flex;
          margin-right: 15px;
          width: 260px;
          overflow: hidden;

          &:last-child {
            width: 230px;
            margin-right: 0;
          }

          input {
            width: 235px;
            border: 0;
            border-radius: 0;
            padding: 10px 0 10px 15px;

            &:last-child {
              width: 195px;
            }
          }

          div {
            padding: 10px 15px 10px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: $white;

            i {
              font-size: 15px;
            }
          }
        }
      }
    }
  }

  .contacts {
    margin-top: 40px;
  }

  .input-row {
    display: flex;
    align-items: center;
    margin-top: 30px;

    span {
      font-size: 14px;
      line-height: 16px;
      color: $border-gray;
      width: 160px;
    }

    input {
      border: 1px solid $border-gray;
      border-radius: 6px;
      color: $avatar-black;
      font-size: 14px;
      line-height: 16px;
      width: 250px;
      height: 35px;
      background: $white;
      padding: 10px 15px;
    }
  }

  .phone {
    padding: 10px 0 0 160px;
    display: flex;
    flex-direction: column;

    span {
      font-size: 14px;
      line-height: 16px;
      color: $blue;
      text-decoration: underline;
    }

    button {
      width: 150px;
      height: 35px;
      background: $blue;
      color: $white;
      font-size: 12px;
      font-weight: bold;
      line-height: 14px;
      border-radius: 6px;
      margin-top: 30px;
    }
  }

  .map-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 60px;

    .delete {
      color: $profile-red;
      font-size: 14px;
      line-height: 16px;
      text-decoration: underline;
    }
  }

  .map {
    height: 300px;
    border: 1px solid $border-gray;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
    background: $white;
  }

  .controls {
    margin: 50px 0 55px 0;
    display: flex;

    button {
      width: 200px;
      height: 35px;
      margin-left: 20px;
      font-size: 12px;
      font-weight: bold;
      line-height: 14px;
      border-radius: 6px;

      &:first-child {
        margin-left: 0;
      }
    }

    .delete {
      border: 1px solid $blue;
      color: $blue;
      background: $white;
    }

    .save {
      color: $white;
      background: $blue;
    }
  }
}
</style>
