<template>
  <div class="offices">
    <div class="top">
      <h1>Филиалы</h1>
      <button>Добавить</button>
    </div>
    <div class="bottom">
      <div class="header">
        <span>Название</span>
        <span>Адрес</span>
        <span>Город</span>
        <span>Доход</span>
      </div>
      <div class="bottom-table">
        <div class="bottom-table-row">
          <span>OnMonday</span>
          <span>Самал-2, ЖК Сатти, 13-этаж</span>
          <span>г.Алматы</span>
          <span>1 500 000тг</span>
        </div>
        <div class="bottom-table-row">
          <span>OnMonday</span>
          <span>Самал-2, ЖК Сатти, 13-этаж</span>
          <span>г.Алматы</span>
          <span>1 500 000тг</span>
        </div>
        <div class="bottom-table-row">
          <span>OnMonday</span>
          <span>Самал-2, ЖК Сатти, 13-этаж</span>
          <span>г.Алматы</span>
          <span>1 500 000тг</span>
        </div>
        <div class="bottom-table-row">
          <span>OnMonday</span>
          <span>Самал-2, ЖК Сатти, 13-этаж</span>
          <span>г.Алматы</span>
          <span>1 500 000тг</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileNavbar from "@/components/ProfileNavbar";
import ProfileCompanySidebar from "@/components/ProfileCompanySidebar";

export default {
  name: "ProfileCompanyOffices",
  components: {
    ProfileNavbar,
    ProfileCompanySidebar,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.offices {
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  flex: 1;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 30px;
    }

    button {
      border: 1px solid $blue;
      border-radius: 3px;
      color: $blue;
      padding: 10px 30px;
      font-weight: bold;
    }
  }

  .bottom {
    display: flex;
    flex-direction: column;
    margin-top: 40px;

    .header {
      display: flex;
      padding: 0 20px;

      span {
        width: 25%;
        font-size: 18px;
        color: $border-gray;
      }
    }

    .bottom-table {
      display: flex;
      flex-direction: column;

      .bottom-table-row {
        display: flex;
        padding: 20px;
        border: 1px solid $item-gray;
        border-radius: 5px;
        margin-top: 5px;

        span {
          width: 25%;
          font-size: 18px;
          color: $avatar-black;
        }
      }
    }
  }
}
</style>
