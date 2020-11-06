<template>
  <div class="support">
    <Header>Служба поддержки сайта</Header>
    <div class="wrapper">
      <div class="content">
        <HorizontalValue label="Цель обращения">
          <Select
            :options="goals"
            name="name"
            :option="goal"
            :isSelected="goal !== 0"
            @changed="setGoal"
          ></Select>
        </HorizontalValue>
        <HorizontalValue label="Тема обращения">
          <InputText :text="title" @changed="setTitle"></InputText>
        </HorizontalValue>
        <HorizontalValue label="Описание" base>
          <Textarea :text="description" @changed="setDescription"></Textarea>
          <span>{{ descriptionLength }} знаков осталось</span>
        </HorizontalValue>
        <div class="controls">
          <SecondaryButton @clicked="reset()">Отменить</SecondaryButton>
          <PrimaryButton @clicked="send()">Отправить</PrimaryButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Account/Header";
import HorizontalValue from "@/components/Core/HorizontalValue";
import Select from "@/components/Core/Select";
import InputText from "@/components/Core/InputText";
import Textarea from "@/components/Core/Textarea";
import PrimaryButton from "@/components/Core/PrimaryButton";
import SecondaryButton from "@/components/Core/SecondaryButton";

export default {
  name: "AccountCompanySupport",
  components: {
    Header,
    HorizontalValue,
    Select,
    InputText,
    Textarea,
    PrimaryButton,
    SecondaryButton,
  },
  computed: {
    descriptionLength() {
      return 9000 - this.description.length;
    },
  },
  data() {
    return {
      goals: [
        {
          id: 0,
          name: "Выберите цель обращения",
        },
      ],
      goal: 0,
      title: "",
      description: "",
    };
  },
  methods: {
    setGoal(goal) {
      this.goal = goal;
    },
    setTitle(title) {
      this.title = title;
    },
    setDescription(description) {
      this.description = description;
    },
    reset() {
      this.goal = 0;
      this.title = "";
      this.description = "";
    },
    send() {
      this.$http
        .post(
          "support",
          {
            goal: this.goal,
            title: this.title,
            description: this.description,
          },
          {
            headers: {
              Authorization: this.$store.state.token,
            },
          }
        )
        .then(
          function (response) {
            if (response.data.status) {
              this.reset();
              this.$notify({
                group: "sign",
                title: "Успешно!",
                text: `Вы успешно оставили заявку в поддержку.`,
                type: "success",
              });
            }
          }.bind(this)
        );
    },
  },
  created() {
    this.$http
      .get("goal-support", {
        headers: {
          Authorization: this.$store.state.token,
        },
      })
      .then(
        function (response) {
          this.goals = this.goals.concat(response.data);
        }.bind(this)
      );
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.support {
  flex: 1;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1170px) {
    width: 100%;
  }

  .wrapper {
    padding: 30px;
    flex: 1;
    display: flex;
    justify-content: center;

    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      @media screen and (max-width: 1170px) {
        align-items: flex-start;
      }

      .value {
        &:not(:first-child) {
          margin-top: 15px;
        }

        @media screen and (max-width: 1170px) {
          flex-direction: column;
          align-items: flex-start;
        }
      }

      .textarea {
        margin-bottom: 5px;
      }

      span {
        color: $gray;
      }

      .controls {
        flex-direction: column;
      }

      button {
        width: 150px;

        &:not(:first-child) {
          margin-left: 15px;

          @media screen and (max-width: 1170px) {
            margin: 15px 0 0 0;
          }
        }
      }
    }
  }
}
</style>
