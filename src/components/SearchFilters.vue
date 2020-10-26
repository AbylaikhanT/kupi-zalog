<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="filters">
          <div class="top-row">
            <div class="price">
              <span>Цена (тг)</span>
              <div class="wrapper">
                <input placeholder="От" />
                <input placeholder="До" />
              </div>
            </div>
            <div class="diagonal">
              <span>Диагональ экрана</span>
              <div class="wrapper">
                <input placeholder="Выберите" />
                <div class="icon">
                  <i class="fas fa-chevron-up"></i>
                </div>
              </div>
            </div>
            <div class="manufacturer">
              <span>Производитель</span>
              <div class="wrapper">
                <input placeholder="Выберите" />
                <div class="icon">
                  <i class="fas fa-chevron-up"></i>
                </div>
              </div>
            </div>
            <div class="state">
              <span>Состояние</span>
              <div class="wrapper">
                <input placeholder="Выберите" />
                <div class="icon">
                  <i class="fas fa-chevron-up"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom-row">
            <div class="left">
              <div>
                <input type="checkbox" checked />
                <div class="checkmark"></div>
                <span>Только с фото</span>
              </div>
              <div>
                <input type="checkbox" />
                <div class="checkmark"></div>
                <span>Ломбард</span>
              </div>
              <div>
                <input type="checkbox" />
                <div class="checkmark"></div>
                <span>Банк</span>
              </div>
              <div>
                <input type="checkbox" />
                <div class="checkmark"></div>
                <span>Кредит</span>
              </div>
              <div>
                <input type="checkbox" />
                <div class="checkmark"></div>
                <span>В рассрочку</span>
              </div>
            </div>
            <button>Показать</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchFilters",
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.filters {
  .top-row {
    display: flex;
    justify-content: space-between;

    & > div {
      width: 260px;
      display: flex;
      flex-direction: column;

      &.price {
        input {
          width: 50%;

          &:first-child {
            border-right: 1px solid $gray;
          }
        }
      }

      .wrapper {
        margin-top: 10px;
        display: flex;
        border: 1px solid $gray;
        border-radius: 6px;
        height: 40px;
        overflow: hidden;

        input {
          flex: 1;
          padding: 13px 12px;
          background: $white;
          font-size: 14px;
          color: $completely-black;

          &::placeholder {
            color: $item-gray;
            font-size: 12px;
          }
        }

        .icon {
          padding-right: 16px;
          display: flex;
          align-items: center;
          background: $white;
        }
      }

      span {
        font-size: 16px;
        color: $avatar-black;
      }
    }
  }

  .bottom-row {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;

    .left {
      display: flex;

      & > div {
        margin-right: 50px;
        position: relative;
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;

        &:last-child {
          margin-right: 0;
        }

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
          z-index: 1;
        }
      }
    }

    button {
      background: $blue;
      border-radius: 6px;
      color: $white;
      font-size: 14px;
      font-weight: bold;
      width: 260px;
      height: 40px;
    }
  }
}
</style>
