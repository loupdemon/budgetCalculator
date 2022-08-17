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
        @rerender="calculateBudget"
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
    this.calculateBudget();
  },
  methods: {
    /**
     * Function for defining type of month in relation to year, if it passed or not
     * returns type of month {String}
     * @param {Number} monthId - Month id from the Map object
     */
    getMonthType(monthId) {
      const currentMonthId = new Date().getMonth() + 1;
      if (monthId < currentMonthId) {
        return MonthType.Passed;
      }
      if (monthId === currentMonthId) {
        return MonthType.Current;
      }
      return MonthType.Future;
    },
    /**
     * Function for calculating total income and expense for whole year and set this data for each month
     * returns nothing
     */
    calculateBudget() {
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
