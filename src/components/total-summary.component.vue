<template>
  <div class="ml-5 grid gap-3 grid-cols-3 grid-rows-1">
    <div class="flex">
      <p class="text-xl font-medium">INCOMES:</p>
      &nbsp;
      <p class="text-xl font-black">{{ incomes }}</p>
      &nbsp;
      <p class="text-xl">EUR</p>
    </div>
    <div class="flex">
      <p class="text-xl font-medium">EXPENSES:</p>
      &nbsp;
      <p class="font-black text-xl">{{ expenses }}</p>
      &nbsp;
      <p class="font-medium text-xl">EUR</p>
    </div>
    <div>
      <div class="flex border-4" :class="getStyles">
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
  computed: {
    /**
     * Function that calculate TOTAL element and returns value for it {Number}
     */
    calculateTotal() {
      return (this.incomes - this.expenses).toFixed(2);
    },
    /**
     * Function that returns classes for positive or negative balance
     */
    getStyles() {
      return this.calculateTotal > 0 ? "border-lime-400/75" : "border-red-400/75";
    },
    /**
     * Function that add a sign '+' for positive balance
     */
    getSign() {
      return this.calculateTotal > 0 ? "+" : "";
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
