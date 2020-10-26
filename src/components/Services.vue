<template>
  <div class="services">
    <div class="top">
      <h1>Платные услуги</h1>
    </div>
    <div class="bottom">
      <div class="section" id="vip">
        <div class="header">
          <h3 class="name">VIP</h3>
          <div class="desc">
            эта услуга для продвижение товара на главной странице эта услуга для
            продвижение товара на главной странице
          </div>
        </div>
        <div class="items">
          <div class="item">
            <h5 class="name">Название пакета</h5>
            <div class="points">
              <div class="point">Время действия N дней</div>
              <div class="point">Цена N монет</div>
              <div class="point">Количество объявлений N</div>
            </div>
            <button>Приобрести услугу</button>
          </div>
          <div class="item">
            <h5 class="name">Название пакета</h5>
            <div class="points">
              <div class="point">Время действия N дней</div>
              <div class="point">Цена N монет</div>
              <div class="point">Количество объявлений N</div>
            </div>
            <button>Приобрести услугу</button>
          </div>
          <div class="item">
            <h5 class="name">Название пакета</h5>
            <div class="points">
              <div class="point">Время действия N дней</div>
              <div class="point">Цена N монет</div>
              <div class="point">Количество объявлений N</div>
            </div>
            <button>Приобрести услугу</button>
          </div>
        </div>
      </div>
      <div class="section" id="top">
        <div class="header">
          <h3 class="name">ТОП</h3>
          <div class="desc">
            эта услуга для продвижение товара на главной странице эта услуга для
            продвижение товара на главной странице
          </div>
        </div>
        <div class="items">
          <div class="item">
            <h5 class="name">Название пакета</h5>
            <div class="points">
              <div class="point">Время действия N дней</div>
              <div class="point">Цена N монет</div>
              <div class="point">Количество объявлений N</div>
            </div>
            <button>Приобрести услугу</button>
          </div>
          <div class="item">
            <h5 class="name">Название пакета</h5>
            <div class="points">
              <div class="point">Время действия N дней</div>
              <div class="point">Цена N монет</div>
              <div class="point">Количество объявлений N</div>
            </div>
            <button>Приобрести услугу</button>
          </div>
          <div class="item">
            <h5 class="name">Название пакета</h5>
            <div class="points">
              <div class="point">Время действия N дней</div>
              <div class="point">Цена N монет</div>
              <div class="point">Количество объявлений N</div>
            </div>
            <button>Приобрести услугу</button>
          </div>
        </div>
      </div>
      <div class="section" id="sale">
        <div class="header">
          <h3 class="name">Распродажа</h3>
          <div class="desc">
            эта услуга для продвижение товара на главной странице эта услуга для
            продвижение товара на главной странице
          </div>
        </div>
        <div class="items">
          <div class="item">
            <h5 class="name">Название пакета</h5>
            <div class="points">
              <div class="point">Время действия N дней</div>
              <div class="point">Цена N монет</div>
              <div class="point">Количество объявлений N</div>
            </div>
            <button>Приобрести услугу</button>
          </div>
          <div class="item">
            <h5 class="name">Название пакета</h5>
            <div class="points">
              <div class="point">Время действия N дней</div>
              <div class="point">Цена N монет</div>
              <div class="point">Количество объявлений N</div>
            </div>
            <button>Приобрести услугу</button>
          </div>
          <div class="item">
            <h5 class="name">Название пакета</h5>
            <div class="points">
              <div class="point">Время действия N дней</div>
              <div class="point">Цена N монет</div>
              <div class="point">Количество объявлений N</div>
            </div>
            <button>Приобрести услугу</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Services",
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.services {
  padding: 40px 30px;
  width: 100%;

  .top {
    h1 {
      font-size: 30px;
    }
  }

  .bottom {
    padding-top: 10px;
    display: flex;
    flex-direction: column;

    .section {
      margin-top: 40px;
      display: flex;
      flex-direction: column;

      .header {
        display: flex;
        height: 64px;
        font-size: 24px;
        line-height: 32px;

        .name {
          width: 228px;
          margin: 0;
          padding: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: $white;
          letter-spacing: 4.32px;
          border-radius: 5px;
        }

        .desc {
          margin-left: 30px;
          color: $completely-black;
        }
      }

      .items {
        display: flex;
        margin-top: 30px;

        .item {
          width: calc(100% - 76px);
          border: 0.5px solid $border-gray;
          border-radius: 5px;
          background-color: $white;
          padding: 20px;
          color: $avatar-black;

          &:nth-child(3n + 2) {
            margin: 0 38px;
          }

          .name {
            font-size: 16px;
            line-height: 21px;
            font-weight: 500;
          }

          .points {
            font-size: 14px;
            line-height: 19px;

            .point {
              margin-top: 13px;

              &:first-child {
                margin-top: 18px;
              }
            }
          }

          button {
            width: 100%;
            height: 35px;
            margin-top: 27px;
            padding: 8px;
            border-radius: 5px;
            color: $white;
            font-size: 14px;
            line-height: 19px;
            font-weight: bold;
            background-color: $blue;
          }
        }
      }
    }

    #vip {
      .header {
        .name {
          background-color: $profile-red;
        }
      }
    }

    #top {
      .header {
        .name {
          background-color: $checkbox-green;
        }
      }
    }

    #sale {
      .header {
        .name {
          background-color: $favorite-yellow;
        }
      }
    }
  }
}
</style>
