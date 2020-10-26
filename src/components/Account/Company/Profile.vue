<template>
  <div class="profile">
    <Header>Профиль</Header>
    <div class="bottom">
      <div class="column">
        <div class="column-card info">
          <div class="info-top">
            <div
              class="avatar"
              :style="
                'background-image: url(http://api.kupizalog.com/' +
                $store.state.info.image +
                ');'
              "
            ></div>
            <div class="right">
              <div class="name">
                <input
                  v-if="editing"
                  v-model="name"
                  :placeholder="$store.state.info.name"
                />
                <span v-else>{{ $store.state.info.name }}</span>
              </div>
              <div v-if="editing" @click="save" class="edit">
                <i class="fas fa-pen"></i>
                Сохранить
              </div>
              <div v-else @click="editing = true" class="edit">
                <i class="fas fa-pen"></i>
                Редактировать профиль
              </div>
            </div>
          </div>
          <div class="info-bottom">
            <div class="info-bottom-row">
              <div>
                <i class="fas fa-mobile-alt"></i>
                Телефон
              </div>
              <div>
                <input
                  v-if="editing"
                  v-model="phone"
                  :placeholder="$store.state.info.phone"
                />
                <span v-else>{{ $store.state.info.phone }}</span>
              </div>
            </div>
            <div class="info-bottom-row">
              <div>
                <i class="far fa-envelope"></i>
                Адрес эл. почты
              </div>
              <div>
                <input
                  v-if="editing"
                  v-model="email"
                  :placeholder="$store.state.userInfo.email"
                />
                <span v-else>{{ $store.state.info.email }}</span>
              </div>
            </div>
            <div class="info-bottom-row">
              <div>
                <i class="far fa-building"></i>
                Тип компании
              </div>
              <div>
                <input
                  v-if="editing"
                  v-model="business_type"
                  :placeholder="$store.state.userInfo.business_type"
                />
                <span v-else>{{ $store.state.info.business_type }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="column-card stats">
          <div class="stats-top">Статистика</div>
          <div class="stats-bottom">
            <div class="stats-bottom-row">
              <div>Количество сотрудников</div>
              <div>100</div>
            </div>
            <div class="stats-bottom-row">
              <div>Количество филиалов</div>
              <div>5</div>
            </div>
            <div class="stats-bottom-row">
              <div>Количество товаров</div>
              <div>150</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Account/Header";

export default {
  name: "AccountCompanyProfile",
  components: {
    Header,
  },
  data: function () {
    return {
      editing: false,
      name: "",
      phone: "",
      email: "",
      business_type: "",
    };
  },
  methods: {
    save: function () {
      this.$http
        .post(
          "http://api.kupizalog.com/api/auth/company-update",
          {
            name: this.name ? this.name : this.$store.state.info.name,
            phone: this.phone ? this.phone : this.$store.state.info.phone,
            email: this.email ? this.email : this.$store.state.info.email,
            business_type: this.business_type
              ? this.business_type
              : this.$store.state.info.business_type,
          },
          {
            headers: {
              Authorization: this.$store.state.token,
            },
          }
        )
        .then(
          function (response) {
            this.editing = false;
            this.$store.commit("setUserInfo", response.data[0]);
          }.bind(this)
        );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.profile {
  display: flex;
  flex-direction: column;

  .bottom {
    margin-top: 40px;
    padding: 0 10px;
    display: flex;

    .column {
      display: flex;
      flex-direction: column;
      padding: 20px;

      &:last-child {
        margin-left: 40px;
      }

      .column-card {
        width: 400px;
        border: 1px solid $item-gray;
        border-radius: 5px;

        &.info {
          display: flex;
          flex-direction: column;

          .info-top {
            display: flex;
            padding: 20px;

            .avatar {
              width: 80px;
              height: 80px;
              border-radius: 360px;
              background-size: contain;
              border: 1px solid $item-gray;
            }

            .right {
              display: flex;
              flex-direction: column;
              justify-content: center;
              margin-left: 20px;

              .name {
                font-size: 18px;
                font-weight: 600;
                color: $completely-black;

                input {
                  border: 1px solid $item-gray;
                  border-radius: 3px;
                }
              }

              .edit {
                margin-top: 15px;
                color: $blue;
                font-size: 14px;
                text-decoration: underline;
                cursor: pointer;

                i {
                  margin-right: 5px;
                }
              }
            }
          }

          .info-bottom {
            display: flex;
            flex-direction: column;

            .info-bottom-row {
              border-top: 1px solid $item-gray;
              padding: 20px;
              display: flex;
              justify-content: space-between;
              color: $completely-black;

              i {
                margin-right: 10px;
              }

              input {
                border: 1px solid $item-gray;
                border-radius: 3px;
              }
            }
          }
        }

        &.stats {
          display: flex;
          flex-direction: column;

          .stats-top {
            padding: 20px;
            font-size: 18px;
            font-weight: 600;
          }

          .stats-bottom {
            display: flex;
            flex-direction: column;

            .stats-bottom-row {
              border-top: 1px solid $item-gray;
              padding: 20px;
              display: flex;
              justify-content: space-between;
              color: $completely-black;

              i {
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
