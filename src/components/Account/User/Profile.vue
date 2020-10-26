<template>
  <div class="profile">
    <Header>Профиль</Header>
    <div class="content">
      <div class="card">
        <div class="section info">
          <div class="avatar"></div>
          <div class="fullname">
            <div class="name">Имя Фамилия</div>
            <div class="edit">
              <i class="fas fa-pen"></i>
              <span>Редактировать профиль</span>
            </div>
          </div>
        </div>
        <div class="section header">
          <span>Контактная информация</span>
        </div>
        <div class="section phone">
          <div class="label">
            <i class="fas fa-mobile-alt"></i>
            <span>Телефон</span>
          </div>
          <div class="value">
            <span>+7 (777) 123 45 67</span>
          </div>
        </div>
        <div class="section email">
          <div class="label">
            <i class="far fa-envelope"></i>
            <span>Адрес эл. почты</span>
          </div>
          <div class="value">
            <span>name@email.com</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Account/Header";

export default {
  name: "AccountUserProfile",
  components: {
    Header,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.profile {
  display: flex;
  flex-direction: column;

  .content {
    padding: 40px 30px;

    .card {
      display: flex;
      flex-direction: column;
      width: 410px;
      height: 375px;
      background-color: $white;
      border: 1px solid $dark-gray3;
      border-radius: 5px;

      .section {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        color: $black;

        .label {
          i {
            width: 10px;
          }

          span {
            margin-left: 12px;
          }
        }

        &:not(:first-of-type) {
          border-top: 1px solid $dark-gray3;
        }
      }

      .info {
        justify-content: flex-start;
        padding: 20px 20px 30px 20px;

        .avatar {
          width: 80px;
          height: 80px;
          background-color: $dark-blue;
          border-radius: 50%;
        }

        .fullname {
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .name {
            color: $black;
            font-size: 18px;
            font-weight: 600;
          }

          .edit {
            margin-top: 15px;
            color: $blue;
            cursor: pointer;

            span {
              margin-left: 8px;
              text-decoration: underline;
            }
          }
        }
      }

      .header {
        span {
          color: $dark-blue;
          font-size: 18px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
