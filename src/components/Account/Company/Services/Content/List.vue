<template>
  <div class="list">
    <Header>Платные услуги</Header>
    <div class="bottom">
      <div v-for="(service, index) in services" :key="index" class="section" id="vip">
        <div class="header">
          <h3 class="name">{{ service.position.name }}</h3>
          <div class="desc">{{ service.position.description }}</div>
        </div>
        <div class="items">
          <div v-for="(item, index) in service.types" :key="index" class="item">
            <h5 class="name">{{ item.name }}</h5>
            <div class="points">
              <div class="point">
                Время действия {{ getDuration(item.life_time) }}
              </div>
              <div class="point">Цена {{ item.price }} монет</div>
              <div class="point">
                Количество объявлений {{ item.ads_count }}
              </div>
            </div>
            <button
              @click="redirect('company-services-buy', { type: item.id })"
            >
              Приобрести услугу
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Account/Header";

export default {
  name: "AccountUserServicesList",
  components: {
    Header,
  },
  data() {
    return {
      services: [],
    };
  },
  methods: {
    redirect(route, params) {
      this.$router.push({
        name: route,
        params: params,
      });
    },
    getDuration(time) {
      const onlyHours = time.indexOf(" ") === -1;
      let date;
      let duration = "";
      if (onlyHours) {
        date = window.moment(time, "H:m:s").toObject();
      } else {
        date = window.moment(time, "D H:m:s").toObject();
      }
      if (date.date && !onlyHours) {
        duration += ` ${date.date} дней`;
      }
      if (date.hours) {
        duration += ` ${date.hours} часов`;
      }
      if (date.minutes) {
        duration += ` ${date.minutes} минут`;
      }
      if (date.seconds) {
        duration += ` ${date.seconds} секунд`;
      }
      duration = duration ? duration.slice(1) : duration;
      return duration;
    },
  },
  created() {
    if (this.$store.getters.listingSucceded) {
      this.$store.commit("setListingSuccess", false);
    }
    this.$http
      .get("monetizations/page", {
        headers: {
          Authorization: this.$store.state.token,
        },
      })
      .then(
        function (response) {
          this.services = response.data;
        }.bind(this)
      );
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.list {
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1170px) {
    width: 100%;
  }

  .bottom {
    padding: 30px;
    display: flex;
    flex-direction: column;

    .section {
      display: flex;
      flex-direction: column;
      width: 100%;

      &:not(:first-child) {
        margin-top: 40px;
      }

      .header {
        display: flex;
        height: 64px;
        font-size: 24px;
        line-height: 32px;

        @media screen and (max-width: 1170px) {
          height: 100%;
          flex-direction: column;
        }

        .name {
          margin: 0;
          padding: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 228px;
          height: 64px;
          background-color: $green2;
          border-radius: 5px;
          color: $white;
          letter-spacing: 4.32px;
        }

        .desc {
          margin-left: 30px;
          font-size: 24px;
          color: $black;

          @media screen and (max-width: 1170px) {
            margin: 20px 0 0 0;
          }
        }
      }

      .items {
        margin-top: 30px;
        display: flex;
        flex-wrap: wrap;
        width: 1040px;

        @media screen and (max-width: 1170px) {
          width: 100%;
        }

        .item {
          box-sizing: border-box;
          width: 320px;
          border: 1px solid $border-gray;
          border-radius: 5px;
          background-color: $white;
          padding: 20px;
          color: $avatar-black;

          @media screen and (max-width: 1170px) {
            margin-top: 40px;
          }

          &:not(:nth-child(3n + 1)) {
            margin-left: 40px;

            @media screen and (max-width: 1170px) {
              margin-left: 0;
            }
          }

          &:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3)) {
            margin-top: 40px;
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
  }
}
</style>
