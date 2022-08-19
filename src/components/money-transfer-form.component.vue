<template>
  <h2 class="text-2xl font-normal leading-normal mt-0 mb-1 text-purple-800">
    <slot>Adding some transaction</slot>
  </h2>
  <form>
    <div class="shadow overflow-hidden sm:rounded-md">
      <div class="px-4 py-5 bg-white sm:p-6">
        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6 sm:col-span-3">
            <label
              for="money-value"
              class="block text-sm font-medium text-gray-700"
              >Value</label
            >
            <input
              type="number"
              v-model="value"
              name="money-value"
              id="money-value"
              autocomplete=""
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-solid border-2 border-gray-200 shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div class="col-span-6 sm:col-span-3">
            <label
              for="currency"
              class="block text-sm font-medium text-gray-700"
              >Currency</label
            >
            {{currency}}
          </div>
          <div class="col-span-6 sm:col-span-6 lg:col-span-4">
            <label for="comment" class="block text-sm font-medium text-gray-700"
              >Comment</label
            >
            <input
              type="text"
              v-model="comment"
              name="comment"
              id="comment"
              autocomplete=""
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-solid border-2 border-gray-200 shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
      <div v-if="errors.length" class="p-1 bg-pink-400 text-1xl">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" :key="error">- {{ error }}</li>
        </ul>
      </div>
      <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          @click="cancel"
          class="px-6 py-2 text-blue-800 border border-blue-600 rounded"
        >
          Cancel
        </button>
        <button
          class="px-6 py-2 ml-2 text-blue-100 rounded bg-blue-600"
          @click="addTransaction"
        >
          Add transaction
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { inputExists, isValidTransactionObject } from "@/utils";
import { CurrencyValues } from "@/enums";

export default {
  name: "money-transfer-form.component",
  emits: {
    add: isValidTransactionObject,
    cancel: null,
  },
  data() {
    return {
      errors: [],
      value: null,
      currency: CurrencyValues.EUR,
      comment: "",
    };
  },
  props: {
    month: {
      type: Object,
      required: true,
    },
  },
  methods: {
    /**
     * Function that adds transaction to modal window of month card
     * @param {Object[]} e object of income
     */
    addTransaction(e) {
      e.preventDefault();
      this.checkForm();
      if (this.errors.length === 0) {
        const { value, comment} = this;
        const id = Date.now().toString();
        this.$emit("add", {
          value,
          comment,
          id
        });
      }
    },
    /**
     * Function that calls cancel from modal window of month
     */
    cancel() {
      this.$emit("cancel");
    },
    /**
     * Function that checks form doesn't have errors
     */
    checkForm() {
      this.errors = [];
      if (!inputExists(this.value)) {
        this.errors.push("Value can not be empty");
      }
      if (!inputExists(this.currency)) {
        this.errors.push("Currency can not be empty");
      }
    },
  },
};
</script>
