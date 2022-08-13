<template>
  <div class="m-2">
    <div class="flex mb-1 p-1">
      <p class="text-lg">Incomes:</p>
      &nbsp;
      <p class="text-lg font-black">{{ totalIncomes }}</p>
      &nbsp;
      <p class="text-lg">EUR</p>
    </div>

    <div class="flex mb-1 p-1">
      <p class="text-lg">Expenses:</p>
      &nbsp;
      <p class="font-black text-lg">{{ totalExpenses }}</p>
      &nbsp;
      <p class="font-medium text-lg">EUR</p>
    </div>

    <div class="p-2" :class="getStyles">
      <div class="flex mb-1">
        <p class="font-medium text-xl">TOTAL:</p>
        &nbsp;
        <p class="text-xl font-black">{{ getSign }}{{ calculateTotal }}</p>
        &nbsp;
        <p class="font-medium text-xl">EUR</p>
      </div>
      <p class="text-xl">{{ getMessage }}</p>
    </div>
  </div>
</template>

<script>
import { CurrencyValues } from '@/enums';

export default {
  name: 'total-section.component',
  props: {
    incomes: {
      type: Array,
      required: true,
    },
    expenses: {
      type: Array,
      required: true,
    },
  },

  methods: {
    calculateSummary(arr) {
      let summary = 0;
      arr.forEach(el => {
        if (el.currency === CurrencyValues.UAH) {
          summary += el.value / this.eurRate;
          return;
        }
        summary += el.value;
      });
      return summary.toFixed(3);
    },
  },
  computed: {
    calculateTotal() {
      return (this.totalIncomes - this.totalExpenses).toFixed(3);
    },
    getStyles() {
      if (this.calculateTotal > 0) {
        // return 'bg-green-400';
        return '';
      }

      if (this.calculateTotal < 0) {
        // return 'bg-red-400';
        return '';
      }

      // return 'bg-gray-400';
      return '';
    },

    getMessage() {
      return '';
      // if (this.calculateTotal > 0) {
      //   return 'IN PROFIT :)';
      // }
      //
      // if (this.calculateTotal < 0) {
      //   return 'IN DEBT :(';
      // }
      //
      // if (Number(isNaN(this.calculateTotal))) {
      //   return 'SOMETHING WENT WRONG!';
      // }
      //
      // return 'JUST IN BUDGET :(';
    },

    getSign() {
      if (this.calculateTotal > 0) {
        return '+';
      }

      return '';
    },
  },

  data() {
    return {
      eurRate: null,
      totalIncomes: this.calculateSummary(this.incomes),
      totalExpenses: this.calculateSummary(this.expenses),
    };
  },

  watch: {
    incomes() {
      this.totalIncomes = this.calculateSummary(this.incomes);
    },
    expenses() {
      this.totalExpenses = this.calculateSummary(this.expenses);
    },
    eurRate() {
      this.totalIncomes = this.calculateSummary(this.incomes);
      this.totalExpenses = this.calculateSummary(this.expenses);
    },
  },
};
</script>

<style scoped></style>
