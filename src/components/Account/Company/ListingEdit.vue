<template>
  <div class="product">
    <AccountBack @clicked="$router.go(-1)"></AccountBack>
    <div class="top">
      <h1>Подать объявление</h1>
    </div>
    <div class="bottom">
      <div class="category">
        <div class="left">Категория</div>
        <div class="right" @click="openModal('category')">
          <template v-if="this.selectedCategory">
            <span>{{ category }}</span>
            <button @click="openModal('category')">Изменить</button>
            <div class="tick">
              <i class="fas fa-check"></i>
            </div>
          </template>
          <span v-else>Выбрать категорию</span>
        </div>
      </div>
      <div v-for="(field, index) in fields" :key="index" class="field">
        <div class="left">{{ field.title }}</div>
        <div class="right">
          <div v-if="field.type === 'select'" class="select-wrapper">
            <select v-model="filledFields[field.id]">
              <option v-for="(value, key) in field.values" :value="value.value" :key="key">
                {{ value.value }}
              </option>
            </select>
          </div>
          <div v-if="field.type === 'integer'" class="input-wrapper">
            <input v-model="filledFields[field.id]" type="number" />
            <span>{{ field.measure }}</span>
          </div>
          <div v-if="field.type === 'radio-button'" class="radio-wrapper">
            <div v-for="(value, key) in field.values" :key="key">
              <input
                v-model="filledFields[field.id]"
                :value="value.value"
                type="radio"
              />
              <span>{{ value.value }}</span>
            </div>
          </div>
          <div v-if="field.type === 'check-box'" class="checkbox-wrapper">
            <div v-for="(value, key) in field.values" :key="key">
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
          <input v-model="name" type="text" />
        </div>
      </div>
      <div class="price">
        <div class="left">Цена</div>
        <div class="right">
          <input v-model="price" type="text" />
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
          <div class="images-container">
            <div v-for="(image, index) in images" :key="index" class="file">
              <InputPhoto
                @changed="setImage(index, $event)"
                :url="image"
                small
              ></InputPhoto>
            </div>
          </div>
          <div class="right-label">
            Объявления с фото получают в среднем в 3-5 раз больше откликов
          </div>
        </div>
      </div>
      <div class="controls">
        <div class="left">
          <button @click="update()">Сохранить изменения</button>
        </div>
      </div>
    </div>
    <Category
      v-if="$store.state.modal === 'category'"
      @selected="selectCategory"
      @close="$store.dispatch('closeModal')"
    ></Category>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import AccountBack from "@/components/Account/Back";
import Category from "@/components/Category";
import InputPhoto from "@/components/Core/InputPhoto";

export default {
  name: "AccountCompanyListingEdit",
  components: {
    AccountBack,
    Category,
    InputPhoto,
  },
  data: function () {
    return {
      name: "",
      price: "",
      description: "",
      images: [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      selectedCategory: undefined,
      fields: [],
      filledFields: {},
      categories: [],
      product: undefined,
    };
  },
  computed: {
    category() {
      return Array.from(
        this.selectedCategory,
        (category) => category.name
      ).join(" » ");
    },
  },
  methods: {
    ...mapActions(["openModal"]),
    update() {
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("price", this.price);
      formData.append("content", this.description);
      // formData.append('category', this.selectedCategory[this.selectedCategory.length - 1].id);
      const fields = [];
      for (const key in this.filledFields) {
        if (this.filledFields.hasOwnProperty(key)) {
          if (key.toString().split("-").length === 1) {
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
      }
      formData.append("charecterics", JSON.stringify(fields));
      let c = 0;
      for (let i = 0; i < this.images.length; i++) {
        if (this.images[i]) {
          formData.append("images[" + c + "]", this.images[i]);
          c++;
        }
      }
      this.$http
        .put(`product/${this.$route.params.id}`, formData, {
          headers: {
            Authorization: this.$store.state.token,
          },
        })
        .then(
          function (response) {
            if (response.status === 200) {
              this.$router.go();
              this.$notify({
                group: "sign",
                title: "Успешно!",
                text: `Вы успешно изменили объявление.`,
                type: "success",
              });
            }
          }.bind(this)
        );
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.$http
        .get(
          `categories/${
            this.selectedCategory[this.selectedCategory.length - 1].id
          }/fields`
        )
        .then(
          function (response) {
            this.fields = response.data;
            this.filledFields = [];
            for (let i = 0; i < this.fields.length; i++) {
              this.filledFields[this.fields[i].id] = this.fields[
                i
              ].values[0].value;
            }
            if (this.product.characteristics.length > 0) {
              for (let i = 0; i < this.product.characteristics.length; i++) {
                this.filledFields[
                  this.product.characteristics[i].characteristic.id
                ] = this.product.characteristics[i].value;
              }
            }
          }.bind(this)
        );
    },
    setImage(index, image) {
      this.images[index] = image;
    },
    findCategory(categories, id) {
      for (let category of categories) {
        if (category.id === id) {
          return [category];
        } else {
          if (category.children.length > 0) {
            const foundCategory = this.findCategory(category.children, id);
            if (foundCategory && Array.isArray(foundCategory)) {
              foundCategory.unshift(category);
              return foundCategory;
            }
          }
        }
      }
      return false;
    },
  },
  created() {
    this.$http
      .get(`product/${this.$route.params.id}/update-page`, {
        headers: {
          Authorization: this.$store.state.token,
        },
      })
      .then(
        function (response) {
          this.product = response.data.product[0];
          this.name = this.product.name;
          this.price = this.product.price;
          this.description = this.product.content;
          for (let i = 0; i < this.product.image.length; i++) {
            this.images[i] = this.product.image[i].path;
          }
          this.$http.get("categories").then(
            function (categories) {
              this.categories = categories.data;
              const category = this.findCategory(
                this.categories,
                this.product.category
              );
              if (category) {
                this.selectCategory(category);
              }
            }.bind(this)
          );
        }.bind(this)
      );
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.product {
  padding: 40px 30px;
  width: 100%;

  .top {
    margin-top: 30px;

    h1 {
      font-size: 30px;
    }
  }

  .bottom {
    margin-top: 20px;
    display: flex;
    flex-direction: column;

    input[type="text"],
    input[type="number"] {
      width: 160px;
      height: 40px;
      background: $white;
      border: 1px solid $border-gray;
      border-radius: 5px;
      padding: 12px 15px;
      font-size: 14px;
      line-height: 17px;
      color: $avatar-black;

      @media screen and (max-width: 1170px) {
        width: 80%;
      }
    }

    .field {
      display: flex;
      align-items: center;
      padding: 30px 0;
      border-top: 1px solid $profile-password-gray;

      @media screen and (max-width: 1170px) {
        flex-direction: column;
      }

      .left {
        flex-shrink: 0;
        width: 300px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 16px;
        color: $avatar-black;

        @media screen and (max-width: 1170px) {
          width: 100%;
          justify-content: flex-start;
        }

        &::after {
          content: "*";
          color: $profile-red;
        }
      }

      .right {
        width: 100%;
        max-width: 600px;
        margin-left: 20px;

        @media screen and (max-width: 1170px) {
          margin: 20px 0 0 0;
        }

        .select-wrapper {
          background: $white;
          border: 1px solid $border-gray;
          border-radius: 5px;
          width: 210px;
          height: 40px;
          position: relative;
          z-index: 50;
          cursor: pointer;

          @media screen and (max-width: 1170px) {
            width: 100%;
          }

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

      @media screen and (max-width: 1170px) {
        flex-direction: column;
      }

      .left {
        width: 300px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 16px;
        color: $avatar-black;

        @media screen and (max-width: 1170px) {
          width: 100%;
          justify-content: flex-start;
        }

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

        @media screen and (max-width: 1170px) {
          margin: 20px 0 0 0;
        }

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
      align-items: center;
      padding: 30px 0;
      border-top: 1px solid $profile-password-gray;

      @media screen and (max-width: 1170px) {
        flex-direction: column;
      }

      .left {
        width: 300px;
        display: flex;
        justify-content: flex-end;
        font-size: 16px;
        color: $avatar-black;

        @media screen and (max-width: 1170px) {
          width: 100%;
          justify-content: flex-start;
        }

        &::after {
          content: "*";
          color: $profile-red;
        }
      }

      .right {
        margin-left: 20px;

        @media screen and (max-width: 1170px) {
          margin: 20px 0 0 0;
          width: 100%;
        }

        input {
          width: 500px;
          border: 1px solid $border-gray;
          border-radius: 3px;
          background: $white;

          @media screen and (max-width: 1170px) {
            width: 100%;
          }
        }
      }
    }

    .price {
      display: flex;
      align-items: center;
      padding: 30px 0;
      border-top: 1px solid $profile-password-gray;

      @media screen and (max-width: 1170px) {
        flex-direction: column;
      }

      .left {
        width: 300px;
        display: flex;
        justify-content: flex-end;
        font-size: 16px;
        color: $avatar-black;

        @media screen and (max-width: 1170px) {
          width: 100%;
          justify-content: flex-start;
        }

        &::after {
          content: "*";
          color: $profile-red;
        }
      }

      .right {
        margin-left: 20px;

        @media screen and (max-width: 1170px) {
          margin: 20px 0 0 0;
          width: 100%;
        }

        input {
          width: 500px;
          border: 1px solid $border-gray;
          border-radius: 3px;
          background: $white;

          @media screen and (max-width: 1170px) {
            width: 100%;
          }
        }
      }
    }

    .description {
      display: flex;
      padding: 30px 0;
      border-top: 1px solid $profile-password-gray;

      @media screen and (max-width: 1170px) {
        flex-direction: column;
      }

      .left {
        width: 300px;
        display: flex;
        justify-content: flex-end;
        font-size: 16px;
        color: $avatar-black;

        @media screen and (max-width: 1170px) {
          width: 100%;
          justify-content: flex-start;
        }

        &::after {
          content: "*";
          color: $profile-red;
        }
      }

      .right {
        margin-left: 20px;

        @media screen and (max-width: 1170px) {
          margin: 20px 0 0 0;
        }

        textarea {
          padding: 10px 15px;
          width: 500px;
          height: 150px;
          border: 1px solid $border-gray;
          border-radius: 3px;
          background: $white;

          @media screen and (max-width: 1170px) {
            width: 100%;
          }
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

      @media screen and (max-width: 1170px) {
        flex-direction: column;
      }

      .left {
        width: 300px;
        display: flex;
        justify-content: flex-end;
        font-size: 16px;
        color: $avatar-black;

        @media screen and (max-width: 1170px) {
          width: 100%;
          justify-content: flex-start;
        }

        &::after {
          content: "*";
          color: $profile-red;
        }
      }

      .right {
        width: 500px;
        margin-left: 20px;

        @media screen and (max-width: 1170px) {
          margin: 20px 0 0 0;
          width: 100%;
        }

        .images-container {
          display: flex;
          flex-wrap: wrap;

          .file {
            margin-left: 20px;

            @media screen and (max-width: 1170px) {
              margin-left: 0;
            }

            &:nth-child(4n + 1) {
              margin-left: 0;
            }

            &:nth-child(n + 5) {
              margin-top: 20px;

              @media screen and (max-width: 1170px) {
                margin-top: 0;
              }
            }
          }
        }

        .right-label {
          color: $border-gray;
          margin-top: 5px;
        }
      }
    }

    .controls {
      padding: 30px 0;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid $profile-password-gray;

      @media screen and (max-width: 1170px) {
        flex-direction: column;
      }

      button {
        height: 40px;
        box-sizing: border-box;
        background-color: $blue;
        border: 1px solid $blue;
        border-radius: 5px;
        color: $white;
        font-weight: bold;
      }

      .left {
        display: flex;
        flex-direction: column;

        button {
          width: 320px;

          @media screen and (max-width: 1170px) {
            width: 100%;
          }

          &:not(:first-child) {
            margin-top: 20px;
          }
        }
      }

      .right {
        display: flex;

        @media screen and (max-width: 1170px) {
          margin-top: 20px;
          flex-direction: column;
        }

        button {
          width: 140px;

          @media screen and (max-width: 1170px) {
            width: 100%;
          }

          &.main {
            background-color: $blue;
            border: 1px solid $blue;
            color: $white;
          }

          &:not(:first-child) {
            margin-left: 20px;

            @media screen and (max-width: 1170px) {
              margin: 20px 0 0 0;
            }
          }
        }
      }
    }
  }
}
</style>
