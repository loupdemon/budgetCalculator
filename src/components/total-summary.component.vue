<template>
  <div class="ml-5 grid gap-3 grid-cols-3 grid-rows-1">
    <div class="flex">
      <p class="text-lg">Incomes:</p>
      &nbsp;
      <p class="text-lg font-black">{{ incomes }}</p>
      &nbsp;
      <p class="text-lg">EUR</p>
    </div>

    <div class="flex">
      <p class="text-lg">Expenses:</p>
      &nbsp;
      <p class="font-black text-lg">{{ expenses }}</p>
      &nbsp;
      <p class="font-medium text-lg">EUR</p>
    </div>

    <div class="">
      <div class="flex">
        <p class="font-medium text-xl">TOTAL:</p>
        &nbsp;
        <p class="text-xl font-black">{{ getSign }}{{ calculateTotal }}</p>
        &nbsp;
        <p class="font-medium text-xl">EUR</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {},
  computed: {
    calculateTotal() {
      return (this.incomes - this.expenses).toFixed(2);
    },

    getSign() {
      if (this.calculateTotal > 0) {
        return "+";
      }
      return "";
    },
  },
  props: {
    incomes: {
      type: Number,
      default: 0,
    },
    expenses: {
      type: Number,
      default: 0,
    },
  },
};
</script>
