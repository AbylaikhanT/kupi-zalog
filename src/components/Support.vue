<template>
  <div class="support">
    <div class="top">
      <h1>Служба поддержки сайта</h1>
    </div>
    <div class="bottom">
      <div class="bottom-row">
        <div class="left">Цель обращения</div>
        <div class="right">
          <div class="select-wrapper">
            <select>
              <option>Выберите цель обращения</option>
            </select>
          </div>
        </div>
      </div>
      <div class="bottom-row">
        <div class="left">Тема обращения</div>
        <div class="right">
          <div class="input-wrapper">
            <input type="text" />
          </div>
        </div>
      </div>
      <div class="bottom-row bottom-row-start">
        <div class="left">Описание</div>
        <div class="right">
          <div class="textarea-wrapper">
            <textarea></textarea>
            <span>9000 знаков осталось</span>
          </div>
        </div>
      </div>
      <div class="controls">
        <button class="cancel">Отменить</button>
        <button class="send">Отправить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Support",
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.support {
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
    align-items: center;

    .bottom-row {
      display: flex;
      margin-top: 30px;

      .left {
        width: 130px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      .right {
        width: 600px;
        margin-left: 30px;

        .select-wrapper {
          background: $white;
          border: 1px solid $border-gray;
          border-radius: 5px;
          width: 100%;
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
            width: 100%;
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

        .textarea-wrapper {
          display: flex;
          flex-direction: column;

          textarea {
            width: 100%;
            height: 150px;
            border: 1px solid $border-gray;
            border-radius: 3px;
            background: $white;
          }

          span {
            color: $border-gray;
            margin-top: 5px;
          }
        }
      }

      &.bottom-row-start {
        .left {
          align-items: flex-start;
        }
      }
    }

    .controls {
      margin-top: 20px;
      width: 760px;
      display: flex;
      justify-content: flex-end;

      button {
        width: 200px;
        height: 40px;
        border-radius: 5px;
        font-size: 14px;
        line-height: 19px;
        font-weight: bold;

        &.cancel {
          color: $blue;
          border: 1px solid $blue;
          background-color: transparent;
        }

        &.send {
          color: $white;
          border: 0;
          background-color: $blue;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
