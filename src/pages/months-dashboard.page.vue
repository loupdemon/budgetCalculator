<template>
  <TotalSummary :expenses="totalExpense" :incomes="totalIncome"></TotalSummary>
  <div v-if="!loading" class="mt-8 grid grid-cols-4 gap-4 place-content-center">
    <div v-for="month in months" :key="month.id">
      <MonthCard
        :month="month"
        :monthId="month.id"
        :year="year"
        :month-type="getMonthType(month.id)"
        :monthsData="monthsData"
        @rerender="calculateTotal"
      ></MonthCard>
    </div>
  </div>
</template>

<script>
import TotalSummary from "../components/total-summary.component.vue";
import MonthCard from "../components/month-card.component";
import { TransactionService } from "@/services/transactions.service";
import { months } from "../constants";
import { MonthType } from "@/enums";

export default {
  name: "base-component",
  components: {
    TotalSummary,
    MonthCard,
  },
  data() {
    return {
      loading: true,
      months: months,
      year: new Date().getFullYear(),
      monthsData: new Map(),
      totalIncome: 0,
      totalExpense: 0,
    };
  },
  mounted() {
    this.calculateTotal();
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
    calculateTotal() {
      new TransactionService()
        .getMonthData()
        .then((response) => {
          let totalIncomes = 0;
          let totalExpenses = 0;
          for (const el in response) {
            this.monthsData.set(el, response[el]);

            const incomesArray = response[el].incomes;
            if (incomesArray.length) {
              incomesArray.forEach((element) => {
                totalIncomes += element.value;
              });
            }
            const expensesArray = response[el].expenses;
            if (expensesArray.length) {
              expensesArray.forEach((element) => {
                totalExpenses += element.value;
              });
            }
          }
          this.totalIncome = totalIncomes;
          this.totalExpense = totalExpenses;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped></style>
