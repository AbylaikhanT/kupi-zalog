<template>
  <div class="main">
    <div :style="background" class="avatar"></div>
    <div class="info">
      <div class="name">
        {{ company ? $store.state.company.title : fullName
        }}{{ $store.state.balance }}
      </div>
      <div @click="clicked('edit')" class="control edit">
        <i class="fas fa-pen"></i>
        <span>Редактировать профиль</span>
      </div>
      <div v-if="company" @click="openModal" class="control fill">
        <i class="fas fa-credit-card"></i>
        <span>Пополнить счет</span>
      </div>
    </div>
    <vmodal name="example" :width="350" :adaptive="true">
      <div class="modal-container">
        <h2 class="modal-title">Сумма пополнения</h2>
        <div class="d-flex align-items-end price-input">
          <input type="number" v-model="amount" />
          <span class="ml-auto price-valute">KZT</span>
        </div>
        <div class="price-list d-flex justify-content-between">
          <button @click="onChangeAmount(500)">500</button>
          <button @click="onChangeAmount(2000)">2 000</button>
          <button @click="onChangeAmount(5000)">5 000</button>
          <button @click="onChangeAmount(15000)">15 000</button>
        </div>
        <button
          :disabled="!amount || paymentLoading"
          class="submit-button"
          @click="pay()"
        >
          <div
            v-if="paymentLoading"
            class="spinner-border text-light"
            role="status"
            style="width: 19px; height: 19px"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <span v-else>Выберите способ пополнения</span>
        </button>
      </div>
    </vmodal>
  </div>
</template>

<script>
export default {
  name: "CardMain",
  props: {
    company: Boolean,
  },
  data: function () {
    return {
      amount: undefined,
      paymentLoading: false,
      widget: new cp.CloudPayments(),
    };
  },
  computed: {
    fullName() {
      return `${this.$store.state.info.first_name} ${this.$store.state.info.last_name}`;
    },
    background() {
      return this.$store.getters.hasCompany
        ? `background-image: url('https://api.kupizalog.kz${this.$store.state.company.image.path}');`
        : "";
    },
  },
  methods: {
    openModal() {
      this.$modal.show("example");
    },
    clicked(control) {
      this.$emit("clicked", control);
    },
    onChangeAmount(amount) {
      this.amount = amount;
    } /*
            onSubmitAmount() {
                this.paymentLoading = true;
                this.$http.post('payments/order/', {
                    amount: this.amount,
                }).then(function(response) {
                    window.location.href = response.data.data.payment_page_url;
                }.bind(this));
            },*/,
    setAmount() {
      this.$store.commit(
        "setBalance",
        this.$store.state.balance + Number(this.amount)
      );
    },
    pay() {
      this.widget.pay(
        "auth", // или 'charge'
        {
          //options
          publicId: "pk_a0e7c33b5ddc2fd44cd317c370955", //id из личного кабинета
          description: "Пополнение счета в kupizalog.kz", //назначение
          amount: Number(this.amount), //сумма
          currency: "KZT", //валюта
          invoiceId: "1234567", //номер заказа  (необязательно)
          accountId: "user@example.com", //идентификатор плательщика (необязательно)
          skin: "modern", //дизайн виджета (необязательно)
          data: {
            myProp: "myProp value",
          },
        },
        {
          onSuccess: function () {
            // success
            console.log("Yeah bitch");
          },
          onFail: function () {
            // fail
            //действие при неуспешной оплате
          },
          onComplete: function () {
            //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
          },
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.main {
  padding: 20px;
  display: flex;

  .avatar {
    width: 80px;
    height: 80px;
    background-position: center;
    background-size: contain;
    border: 1px solid $light-gray7;
    border-radius: 50%;
  }

  .info {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .name {
      color: $black;
      font-size: 18px;
      font-weight: 600;
    }

    .control {
      color: $blue;
      cursor: pointer;

      i {
        font-size: 12px;
      }

      span {
        margin-left: 4px;
        text-decoration: underline;
      }
    }

    .edit {
      margin-top: 15px;
    }

    .fill {
      margin-top: 10px;
    }
  }

  .modal-container {
    padding: 40px 20px;

    .modal-title {
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 38px;
    }

    .price-input {
      width: 100%;
      border-bottom: 1px solid #b9c5cd;
      padding-bottom: 5px;
      margin-bottom: 26px;
      font-size: 24px;
      line-height: 32px;
      font-weight: 800;

      .price-valute {
        font-size: 24px;
        line-height: 32px;
        font-weight: 800;
      }

      input {
        width: 90%;
        outline: none;
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      input[type="number"] {
        -moz-appearance: textfield;
      }
    }

    .price-list {
      margin-bottom: 28px;

      button {
        outline: none;
        padding: 9px;
        min-width: 70px;
        border: 1px solid #4da1ff;
        color: #4da1ff;
        background: transparent;
        border-radius: 35px;
        font-size: 12px;
        line-height: 14px;
      }
    }

    .submit-button {
      width: 100%;
      padding: 11px;
      background-color: #4da1ff;
      border-radius: 5px;
      font-size: 14px;
      line-height: 19px;
      color: #ffffff;
      font-weight: 600;
    }

    .submit-button:disabled {
      background-color: #b9c5cd;
    }
  }
}
</style>
