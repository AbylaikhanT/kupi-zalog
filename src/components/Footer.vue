<!-- This component is does not use -->
<template>
  <footer>
    <div class="wrapper">
      <div class="content">
        <div @click="redirect('home', {}, {}, true)" class="logo"></div>
        <div class="info">
          <div class="section">
            <h5>Организации</h5>
            <ul>
              <!--<li>
                                <a @click="redirect('all', {}, {}, true)">Все</a
                            </li>-->
              <li>
                <a @click="redirect('lombards')">Ломбарды</a>
              </li>
              <li>
                <a @click="redirect('banks')">Банки</a>
              </li>
              <li>
                <a @click="$router.push('/p/zapreshchennye-tovary')"
                  >Запрещённые товары</a
                >
              </li>
              <li>
                <a @click="$router.push('/p/cookies')">Cookies</a>
              </li>
            </ul>
          </div>
          <div class="section">
            <h5>Категории</h5>
            <ul>
              <li><a @click="redirect('top-items')">Топ-товары</a></li>
              <!--<li><a href="top-lombards" >Топ товары</a></li>-->
              <li><a @click="redirect('vip')">Горячие</a></li>
              <li>
                <a @click="redirect('sale-out')">Распппродцкажа</a>
              </li>
              <li><a @click="$router.push('/p/auction')">Аукцион</a></li>
              <li><a @click="redirect('top-lombards')">Топ-ломбарды</a></li>
            </ul>
          </div>
          <div class="section contacts">
            <h5>Контакты</h5>
            <div class="section-row">
              <div class="icon">
                <i class="fas fa-phone-alt"></i>
              </div>
              <div class="desc">
                <span>
                  <a href="tel:+7 (701) 505-49-59">+7 (701) 505-49-59</a>
                </span>
              </div>
            </div>
            <div class="section-row">
              <div class="icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="desc">
                <span>г.Алматы, пр. Сатпаева 5</span>
              </div>
            </div>
            <div class="section-row">
              <div class="icon">
                <i class="far fa-envelope"></i>
              </div>
              <div class="desc">
                <span class="header">Отдел продаж:</span>
                <span
                  ><a href="mailto:info@kupizalog.kz"
                    >info@kupizalog.kz</a
                  ></span
                >
              </div>
            </div>
            <div class="section-row">
              <div class="icon">
                <i class="far fa-envelope"></i>
              </div>
              <div class="desc">
                <span class="header">Техподдержка:</span>
                <span
                  ><a href="mailto:support@kupizalog.kz"
                    >support@kupizalog.kz</a
                  ></span
                >
              </div>
            </div>
          </div>
          <div class="section social">
            <h5>Социальные сети</h5>
            <div class="icons">
              <!--
                            <a href="/">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="/">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="/">
                                <i class="fas fa-rss"></i>
                            </a>
                            -->
              <a href="/">
                <i class="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="description">
        <span
          >© 2019 Kupizalog. Все права защищены. Администрация сайта не несет
          ответственности за содержимое объявлений.</span
        >
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data: function () {
    return {
      isMobile: window.innerWidth < 1170,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";
@import "src/assets/mixins";

footer {
  height: 410px;
  background-color: $dark-gray;
  color: $white;

  @media screen and (max-width: 1170px) {
    height: auto;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    .content {
      padding-top: 70px;
      width: 1170px;
      height: 340px;
      display: flex;
      justify-content: space-between;

      @media screen and (max-width: 1170px) {
        padding: 40px 20px;
        width: 100%;
        height: auto;
        flex-direction: column;
      }

      .logo {
        width: 159px;
        height: 27px;
        background-image: url("src/assets/img/logo.png");
        background-size: cover;
        cursor: pointer;
      }

      .info {
        display: flex;

        @media screen and (max-width: 1170px) {
          margin-top: 40px;
          flex-direction: column;
        }

        .contacts {
          .section-row {
            display: flex;
            align-items: center;
            font-size: 10px;
            margin-bottom: 10px;

            &:last-child {
              margin-bottom: 0;
            }

            .icon {
              margin-right: 10px;
            }

            .desc {
              display: flex;
              flex-direction: column;

              span {
                margin-bottom: 5px;

                &:last-child {
                  margin-bottom: 0;
                }

                a {
                  @include a($white);
                }
              }

              .header {
                font-weight: bold;
              }
            }
          }
        }

        .social {
          h5 {
            margin-bottom: 34px;
          }

          .icons {
            display: flex;

            a {
              font-size: 15px;
              color: $white;
              text-decoration: none;
              margin-right: 50px;

              &:last-child {
                margin-right: 0;
              }

              &:link {
                color: $white;
                text-decoration: none;
              }

              &:visited {
                color: $white;
                text-decoration: none;
              }

              &:hover {
                color: $white;
                text-decoration: none;
              }

              &:active {
                color: $white;
                text-decoration: none;
              }
            }
          }
        }

        .section {
          color: $white;
          margin-right: 100px;

          &:last-child {
            margin-right: 0;
          }

          @media screen and (max-width: 1170px) {
            margin-right: 0;

            &:not(:first-child) {
              margin-top: 20px;
            }
          }
        }

        h5 {
          font-weight: bold;
          font-size: 14px;
          line-height: 16px;
          margin-bottom: 25px;
          text-transform: uppercase;
        }

        ul {
          list-style: none;
          padding: 0;

          li {
            margin-bottom: 10px;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }

    .description {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 70px;
      border-top: 1px solid $white;

      @media screen and (max-width: 1170px) {
        display: none;
      }
    }
  }

  a {
    @include a($white);
    cursor: pointer;
  }
}
</style>
