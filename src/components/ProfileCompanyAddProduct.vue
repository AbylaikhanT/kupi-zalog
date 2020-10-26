<template>
  <div class="product">
    <div class="top">
      <h1>Подать объявление</h1>
    </div>
    <div class="bottom">
      <div class="category">
        <div class="left">Категория</div>
        <div class="right" @click="$store.commit('setModalShown', true)">
          <template v-if="this.selectedOuterCategory">
            <span>{{
              this.selectedOuterCategory.name +
              (this.selectedInnerCategory
                ? " » " + this.selectedInnerCategory.name
                : "")
            }}</span>
            <button @click="$store.commit('setModalShown', true)">
              Изменить
            </button>
            <div class="tick">
              <i class="fas fa-check"></i>
            </div>
          </template>
          <span v-else>Выбрать категорию</span>
        </div>
      </div>
      <div v-for="field in fields" class="field">
        <div class="left">{{ field.title }}</div>
        <div class="right">
          <div v-if="field.type === 'select'" class="select-wrapper">
            <select v-model="filledFields[field.id]">
              <option v-for="value in field.values" :value="value.value">
                {{ value.value }}
              </option>
            </select>
          </div>
          <div v-if="field.type === 'integer'" class="input-wrapper">
            <input v-model="filledFields[field.id]" type="number" />
            <span>{{ field.measure }}</span>
          </div>
          <div v-if="field.type === 'radio-button'" class="radio-wrapper">
            <div v-for="value in field.values">
              <input
                v-model="filledFields[field.id]"
                :value="value.value"
                type="radio"
              />
              <span>{{ value.value }}</span>
            </div>
          </div>
          <div v-if="field.type === 'check-box'" class="checkbox-wrapper">
            <div v-for="value in field.values">
              <input
                v-model="filledFields[field.id + '-' + value.value]"
                :value="value.value"
                type="checkbox"
              />
              <span>{{ value.value }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="name">
        <div class="left">Название</div>
        <div class="right">
          <input v-model="name" />
        </div>
      </div>
      <div class="price">
        <div class="left">Цена</div>
        <div class="right">
          <input v-model="price" />
        </div>
      </div>
      <div class="description">
        <div class="left">Описание</div>
        <div class="right">
          <textarea v-model="description"></textarea>
          <div class="right-label">9000 знаков осталось</div>
        </div>
      </div>
      <div class="images">
        <div class="left">Фотографии</div>
        <div class="right">
          <input
            type="file"
            id="images"
            accept="image/x-png,image/jpeg"
            multiple
          />
          <label for="images" class="images-container">
            <div
              v-for="image of images"
              :style="'background-image: url(' + image + ');'"
              class="image selected"
            ></div>
            <div v-for="i in getImageDiff" class="image"></div>
          </label>
          <div class="right-label">
            Объявления с фото получают в среднем в 3-5 раз больше откликов
          </div>
        </div>
      </div>
      <div class="submit">
        <button @click="add()">Опубликовать</button>
      </div>
    </div>
    <Category
      v-if="$store.state.modalShown"
      @selectedOuter="selectOuter($event)"
      @selectedInner="selectInner($event)"
      @selectedInnerOuter="selectInnerOuter($event)"
      @close="$store.commit('setModalShown', false)"
    ></Category>
  </div>
</template>

<script>
import Category from "@/components/Category";

export default {
  name: "ProfileCompanyAddProduct",
  components: {
    Category,
  },
  data: function () {
    return {
      name: "",
      price: "",
      description: "",
      images: [],
      selectedOuterCategory: false,
      selectedInnerCategory: false,
      fields: [],
      filledFields: {},
    };
  },
  computed: {
    getImageDiff: function () {
      return 8 - this.images.length < 0 ? 0 : 8 - this.images.length;
    },
  },
  methods: {
    add: function () {
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("price", this.price);
      formData.append("content", this.description);
      formData.append(
        "category",
        this.selectedInnerCategory
          ? this.selectedInnerCategory.id
          : this.selectedOuterCategory
          ? this.selectedOuterCategory.id
          : 1
      );
      const fields = [];
      for (const key in this.filledFields) {
        if (
          this.filledFields.hasOwnProperty(key) &&
          key.toString().split("-").length === 1
        ) {
          fields.push({
            charecteric: parseInt(key),
            value: this.filledFields[key],
          });
        } else {
          fields.push({
            charecteric: parseInt(key.toString().split("-")[0]),
            value: key.toString().split("-")[1],
          });
        }
      }
      formData.append("charecterics", JSON.stringify(fields));
      const imagesInput = document.getElementById("images");
      for (let i = 0; i < imagesInput.files.length; i++) {
        formData.append("images[" + i + "]", imagesInput.files[i]);
      }
      this.$http
        .post("product/create", formData, {
          headers: {
            Authorization: this.$store.state.accessToken,
          },
        })
        .then(
          function (response) {
            if (response.status === 201) {
              this.$store.commit("setShowNewProductNotification", true);
              window.location = "/new/profile/company/products";
            }
          }.bind(this)
        );
    },
    selectOuter: function (outer) {
      this.selectedOuterCategory = outer;
      this.selectedInnerCategory = false;
      this.$http
        .get(
          "http://api.kupizalog.com/categories/" +
            this.selectedOuterCategory.id +
            "/fields"
        )
        .then(
          function (response) {
            this.fields = response.data.data;
            this.filledFields = [];
            for (let i = 0; i < this.fields.length; i++) {
              this.filledFields[i] = this.fields[i].items[0].id;
            }
          }.bind(this)
        );
    },
    selectInner: function (inner) {
      this.selectedInnerCategory = inner;
      this.$http
        .get("categories/" + this.selectedInnerCategory.id + "/fields")
        .then(
          function (response) {
            this.fields = response.data;
          }.bind(this)
        );
    },
    selectInnerOuter: function (outer) {
      this.selectedOuterCategory = outer;
    },
  },
  mounted: function () {
    const imagesInput = document.getElementById("images");
    imagesInput.addEventListener(
      "change",
      function () {
        for (let image of imagesInput.files) {
          const reader = new FileReader();
          reader.addEventListener(
            "load",
            function (f) {
              this.images.push(f.target.result);
            }.bind(this)
          );
          reader.readAsDataURL(image);
        }
      }.bind(this)
    );
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.product {
  padding: 40px 30px;
  width: 100%;

  .top {
    h1 {
      font-size: 30px;
    }
  }

  .bottom {
    margin-top: 20px;
    display: flex;
    flex-direction: column;

    .field {
      display: flex;
      padding: 30px 0;
      border-top: 1px solid $profile-password-gray;

      .left {
        width: 300px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 16px;
        color: $avatar-black;

        &::after {
          content: "*";
          color: $profile-red;
        }
      }

      .right {
        width: 100%;
        max-width: 600px;
        margin-left: 20px;

        .select-wrapper {
          background: $white;
          border: 1px solid $border-gray;
          border-radius: 5px;
          width: 210px;
          height: 40px;
          position: relative;
          z-index: 50;
          cursor: pointer;

          &::after {
            height: 100%;
            position: absolute;
            display: flex;
            align-items: center;
            top: 0;
            right: 15px;
            content: "\f078";
            font-size: 13px;
            font-family: "Font Awesome 5 Free";
            font-weight: 600;
          }

          select {
            padding: 0 30px 0 15px;
            width: 100%;
            height: 100%;
            appearance: none;
            background: transparent;
            position: relative;
            outline: none;
            z-index: 55;
          }
        }

        .input-wrapper {
          input {
            width: 160px;
            height: 40px;
            background: $white;
            border: 1px solid $border-gray;
            border-radius: 5px;
            padding: 12px 15px;
            font-size: 14px;
            line-height: 17px;
            color: $avatar-black;
          }
        }

        .radio-wrapper {
          display: flex;
          flex-wrap: wrap;

          & > div {
            width: calc(100% / 3 - 40px);

            &:nth-child(2n) {
              margin: 0 20px;
            }
          }
        }

        .checkbox-wrapper {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;

          div {
            min-width: 200px;
          }
        }
      }
    }

    .category {
      display: flex;
      padding: 30px 0;
      border-top: 1px solid $profile-password-gray;

      .left {
        width: 300px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 16px;
        color: $avatar-black;

        &::after {
          content: "*";
          color: $profile-red;
        }
      }

      .right {
        margin-left: 20px;
        font-size: 16px;
        color: $blue;
        cursor: pointer;
        display: flex;
        align-items: center;

        span {
          text-decoration: underline;
        }

        button {
          margin-left: 23px;
          width: 110px;
          height: 40px;
          font-size: 14px;
          font-weight: bold;
          line-height: 19px;
          color: $white;
          padding: 11px 20px;
          background: $blue2;
          border: 0;
          border-radius: 5px;
        }

        .tick {
          width: 24px;
          height: 24px;
          margin-left: 11px;
          border-radius: 360px;
          background: $checkbox-green;
          color: $border-white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 13px;
        }
      }
    }

    .name {
      display: flex;
      padding: 30px 0;
      border-top: 1px solid $profile-password-gray;

      .left {
        width: 300px;
        display: flex;
        justify-content: flex-end;
        font-size: 16px;
        color: $avatar-black;

        &::after {
          content: "*";
          color: $profile-red;
        }
      }

      .right {
        margin-left: 20px;

        input {
          width: 500px;
          border: 1px solid $border-gray;
          border-radius: 3px;
          background: $white;
        }
      }
    }

    .price {
      display: flex;
      padding: 30px 0;
      border-top: 1px solid $profile-password-gray;

      .left {
        width: 300px;
        display: flex;
        justify-content: flex-end;
        font-size: 16px;
        color: $avatar-black;

        &::after {
          content: "*";
          color: $profile-red;
        }
      }

      .right {
        margin-left: 20px;

        input {
          width: 500px;
          border: 1px solid $border-gray;
          border-radius: 3px;
          background: $white;
        }
      }
    }

    .description {
      display: flex;
      padding: 30px 0;
      border-top: 1px solid $profile-password-gray;

      .left {
        width: 300px;
        display: flex;
        justify-content: flex-end;
        font-size: 16px;
        color: $avatar-black;

        &::after {
          content: "*";
          color: $profile-red;
        }
      }

      .right {
        margin-left: 20px;

        textarea {
          width: 500px;
          height: 150px;
          border: 1px solid $border-gray;
          border-radius: 3px;
          background: $white;
        }

        .right-label {
          color: $border-gray;
          margin-top: 5px;
        }
      }
    }

    .images {
      display: flex;
      padding: 20px 0 30px 0;

      .left {
        width: 300px;
        display: flex;
        justify-content: flex-end;
        font-size: 16px;
        color: $avatar-black;

        &::after {
          content: "*";
          color: $profile-red;
        }
      }

      .right {
        width: 500px;
        margin-left: 20px;

        input[type="file"] {
          display: none;
        }

        .images-container {
          display: flex;
          flex-wrap: wrap;

          .image {
            width: 110px;
            height: 90px;
            background: $gray2;
            border-radius: 5px;
            border: 1px solid $brown;
            position: relative;
            margin-left: 20px;
            cursor: pointer;
            background-size: cover;

            &:nth-child(4n + 1) {
              margin-left: 0;
            }

            &:nth-child(n + 5) {
              margin-top: 20px;
            }

            &.selected {
              &::after {
                display: none;
              }
            }

            &::after {
              width: 25px;
              height: 25px;
              background: $blue;
              border-radius: 360px;
              content: "+";
              color: $white;
              font-size: 20px;
              position: absolute;
              top: calc((100% - 25px) / 2);
              left: calc((100% - 25px) / 2);
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }

        .right-label {
          color: $border-gray;
          margin-top: 5px;
        }
      }
    }

    .submit {
      padding: 30px 0;
      border-top: 1px solid $profile-password-gray;

      button {
        margin-left: 590px;
        background: $blue;
        color: $white;
        font-weight: bold;
        border-radius: 5px;
        padding: 10px 0;
        width: 230px;
      }
    }
  }
}
</style>
