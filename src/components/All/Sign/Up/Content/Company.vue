<template>
  <div class="info">
    <span v-if="isUser">Вы регистрируетесь в виде покупателя</span>
    <span v-else>Вы автоматически становитесь нашим партнером по продажам</span>
    <Select
      :options="types"
      :option="0"
      name="title"
      @changed="setType"
    ></Select>
    <InputText
      placeholder="Напишите название учреждения*"
      @changed="setTypeName"
    ></InputText>
    <Select
      :options="structures"
      :option="0"
      name="title"
      @changed="setStructure"
    ></Select>
    <InputText
      placeholder="Напишите название организации*"
      @changed="setStructureName"
    ></InputText>
    <InputText placeholder="БИН/ИИН" @changed="setNumber"></InputText>
    <Select
      :options="cities"
      :option="0"
      name="title"
      @changed="setCity"
    ></Select>
    <InputText placeholder="Адрес*" @changed="setAddress"></InputText>
    <span>* Обязательны для заполнения</span>
    <InputCheckbox @changed="setAgreed">
      Я соглашаюсь с
      <a href="/p/polzovatelskie-sog" target="_blank"
        >пользовательским соглашением</a
      >
      и
      <a href="/p/politika-konf" target="_blank"
        >политикой конфиденциальности</a
      >
    </InputCheckbox>
    <div class="controls">
      <SecondaryButton @clicked="moveBack()">Назад</SecondaryButton>
      <PrimaryButton @clicked="moveForward()">Далее</PrimaryButton>
    </div>
  </div>
</template>

<script>
import Select from "@/components/Core/Select";
import InputText from "@/components/Core/InputText";
import InputPassword from "@/components/Core/InputPassword";
import InputCheckbox from "@/components/Core/InputCheckbox";
import PrimaryButton from "@/components/Core/PrimaryButton";
import SecondaryButton from "@/components/Core/SecondaryButton";

export default {
  name: "SignUpCompany",
  components: {
    Select,
    InputText,
    InputPassword,
    InputCheckbox,
    PrimaryButton,
    SecondaryButton,
  },
  props: {
    isUser: Boolean,
  },
  data() {
    return {
      types: [
        {
          id: 0,
          title: "Выберите тип учреждения*",
        },
      ],
      structures: [
        {
          id: 0,
          title: "Выберите тип организации*",
        },
      ],
      cities: [
        {
          id: 0,
          title: "Выберите город*",
        },
      ],
      type: undefined,
      typeName: "",
      structure: undefined,
      structureName: "",
      number: "",
      city: undefined,
      address: "",
      agreed: false,
    };
  },
  methods: {
    moveBack() {
      this.$emit("back", true);
    },
    moveForward() {
      if (this.agreed) {
        this.$emit("company", {
          type: this.type,
          title: this.typeName,
          structure: this.structure,
          structure_title: this.structureName,
          iin: this.number,
          city: this.city,
          address: this.address,
          description: "",
          public_number: "",
          public_email: "",
        });
        this.$emit("forward", true);
      }
    },
    setType(type) {
      this.type = type;
    },
    setTypeName(typeName) {
      this.typeName = typeName;
    },
    setStructure(structure) {
      this.structure = structure;
    },
    setStructureName(structureName) {
      this.structureName = structureName;
    },
    setNumber(number) {
      this.number = number;
    },
    setCity(city) {
      this.city = city;
    },
    setAddress(address) {
      this.address = address;
    },
    setAgreed(agreed) {
      this.agreed = agreed;
    },
  },
  created() {
    this.$http
      .get("companies/registration", {
        headers: {
          Authorization: this.$store.state.token,
        },
      })
      .then(
        function (response) {
          this.types = this.types.concat(response.data.company_types);
          this.structures = this.structures.concat(
            response.data.company_structure
          );
          this.cities = this.cities.concat(response.data.cities);
        }.bind(this)
      );
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.info {
  display: flex;
  flex-direction: column;

  span {
    color: $dark-gray2;

    &:not(:first-of-type) {
      margin-top: 15px;
    }
  }

  .select,
  .text,
  .password,
  .checkbox {
    margin-top: 15px;
  }

  .controls {
    margin-top: 30px;
    display: flex;

    button {
      flex: 1;

      &:not(:first-of-type) {
        margin-left: 20px;
      }
    }
  }
}
</style>
