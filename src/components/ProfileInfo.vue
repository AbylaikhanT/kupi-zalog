<template>
  <div class="info">
    <div class="top-row">
      <div class="avatar">
        <i class="fas fa-user"></i>
      </div>
      <div class="right">
        <div class="main-info">
          <div class="name">{{ name }}</div>
          <div class="misc">
            <div class="gender">
              <span class="label">Пол:</span>
              <span class="value">{{ gender }}</span>
            </div>
            <div class="region">
              <span class="label">Регион:</span>
              <span class="value">{{ region }}</span>
            </div>
          </div>
        </div>
        <div @click="$store.commit('moveToEdit')" class="edit">
          <i class="fas fa-pen"></i>
          <span>Редактировать профиль</span>
        </div>
      </div>
    </div>
    <div class="middle-row profile-row">
      <div class="header">Контактная информация:</div>
      <div class="secondary-info">
        <div class="address">
          <span class="label">Адрес:</span>
          <span class="value">{{ address }}</span>
        </div>
        <div class="phone">
          <span class="label">Телефон:</span>
          <span class="value">{{ phone }}</span>
        </div>
        <div class="email">
          <span class="label">Адрес эл. почты:</span>
          <span class="value">{{ email }}</span>
        </div>
      </div>
    </div>
    <div class="bottom-row profile-row">Карта</div>
  </div>
</template>

<script>
export default {
  name: "ProfileInfo",
  props: {
    name: String,
    gender: String,
    region: String,
    address: String,
    phone: String,
    email: String,
  },
  computed: {
    info: function () {
      return this.$store.state.info;
    },
    edit: function () {
      return this.$store.state.edit;
    },
    settings: function () {
      return this.$store.state.settings;
    },
    favorite: function () {
      return this.$store.state.favorite;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../..src/assets/variables/_variables.scss";

.info {
  font-family: $font;

  .profile-row {
    margin-top: 50px;
  }

  .top-row {
    display: flex;

    .avatar {
      width: 140px;
      height: 140px;
      border: 1px solid $border-gray;
      border-radius: 6px;
      color: $border-gray;
      font-size: 50px;
      background: $avatar-gray;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .right {
      flex: 1;
      padding: 30px;
      display: flex;
      justify-content: space-between;

      .main-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: $avatar-black;

        .name {
          font-size: 22px;
          line-height: 25px;
        }

        .misc {
          display: flex;
          flex-direction: column;

          div {
            display: flex;
            font-size: 16px;
            line-height: 19px;

            .label {
              color: $border-gray;
              margin-right: 6px;
            }
          }

          .region {
            margin-top: 5px;
          }
        }
      }

      .edit {
        color: $blue;
        font-size: 16px;
        font-weight: 500;
        line-height: 19px;
        cursor: pointer;

        i {
          margin-right: 5px;
        }
      }
    }
  }

  .middle-row {
    color: $avatar-black;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    flex-direction: column;

    .header {
      font-weight: 500;
    }

    .secondary-info {
      margin-top: 20px;

      div {
        margin-top: 10px;

        &:first-child {
          margin-top: 0;
        }

        .label {
          color: $border-gray;
          margin-right: 6px;
        }
      }
    }
  }

  .bottom-row {
    height: 300px;
    border: 1px solid $border-gray;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 85px;
    background: $white;
  }
}
</style>
