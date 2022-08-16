<template>
  <div v-if="!loading" class="mt-8 grid lg:grid-cols-4 sm:grid-cols-2">
    <div v-for="month in months" :key="month.id">
      <MonthCard
        :month="month"
        :monthId = "month.id"
        :year="year"
        :month-type="getMonthType(month.id)"
        :monthsData="monthsData"
      ></MonthCard>
    </div>
  </div>
</template>

<script>
import MonthCard from "../components/month-card.component";
import { TransactionService } from "@/services/transactions.service";
import { months } from "../constants";
import { MonthType } from "@/enums";

export default {
  name: "base-component",
  components: {
    MonthCard,
  },
  data() {
    return {
      loading: true,
      months: months,
      year: new Date().getFullYear(),
      monthsData: new Map(),
    };
  },
  mounted() {
    new TransactionService()
      .selectAll()
      .then((response) => {
        for (const el in response) {
          this.monthsData.set(el, response[el]);
        }
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    getMonthType(id) {
      const currentMonthId = new Date().getMonth() + 1;
      if (id < currentMonthId) {
        return MonthType.Passed;
      }

      if (id === currentMonthId) {
        return MonthType.Current;
      }

      return MonthType.Future;
    },
    getMonthData(monthName) {
      return this.monthsData.get(monthName);
    },
  },
};
</script>

<style scoped></style>
