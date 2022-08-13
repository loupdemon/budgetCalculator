<template>
  <div class="mt-8 grid lg:grid-cols-4 sm:grid-cols-2">
    <div v-for="month in months" :key="month.id">
      <MonthCard :month="month" :year="year" :month-type="getMonthType(month.id)"></MonthCard>
    </div>
  </div>
</template>

<script>
import MonthCard from '../components/month-card.component';
import { months } from '../constants';
import { MonthType } from '@/enums';

export default {
  name: 'base-component',
  components: {
    MonthCard,
  },
  data() {
    return {
      months: months,
      year: new Date().getFullYear(),
    };
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
  },
};
</script>

<style scoped></style>
