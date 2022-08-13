<template>
  <h2 class="text-2xl font-normal leading-normal mt-0 mb-1 text-purple-800">
    <slot>Adding some transaction</slot>
  </h2>
  <form>
    <div class="shadow overflow-hidden sm:rounded-md">
      <div class="px-4 py-5 bg-white sm:p-6">
        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6 sm:col-span-3">
            <label for="money-value" class="block text-sm font-medium text-gray-700">Value</label>
            <input
              type="number"
              v-model="value"
              name="money-value"
              id="money-value"
              autocomplete=""
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label for="currency" class="block text-sm font-medium text-gray-700">Currency</label>
            <select
              v-model="currency"
              id="currency"
              name="currency"
              autocomplete="currency"
              class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option v-for="currencyValue in currencyValues" :key="currencyValue" :value="currencyValue">
                {{ currencyValue }}
              </option>
            </select>
          </div>

          <div v-if="tags.length > 0" class="col-span-6 sm:col-span-3">
            <label for="tag" class="block text-sm font-medium text-gray-700">Tag</label>
            <select
              v-model="tag"
              id="tag"
              name="tag"
              autocomplete="tag"
              class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option v-for="tagValue in tags" :key="tagValue" :value="tagValue">
                {{ tagValue }}
              </option>
            </select>
          </div>

          <div class="col-span-6 sm:col-span-6 lg:col-span-2">
            <label for="repeat" class="block text-sm font-medium text-gray-700">Repeat</label>
            <select
              id="repeat"
              v-model="repeatPeriod"
              name="repeat"
              autocomplete=""
              class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option v-for="periodValue in repeatingPeriods" :key="periodValue" :value="periodValue">
                {{ getRepeatingPeriodForUser(periodValue) }}
              </option>
            </select>
          </div>

          <div class="col-span-6 sm:col-span-6 lg:col-span-4">
            <label for="comment" class="block text-sm font-medium text-gray-700">Comment</label>
            <input
              type="text"
              v-model="comment"
              name="comment"
              id="comment"
              autocomplete=""
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
        <button @click="cancel" class="px-6 py-2 text-blue-800 border border-blue-600 rounded">Cancel</button>

        <button class="px-6 py-2 ml-2 text-blue-100 rounded bg-blue-600" @click="addTransaction">
          Add transaction
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { inputExists, isValidTransactionObject } from '@/utils';
import { CurrencyValues, RepeatingPeriod, RepeatingPeriodForUser } from '@/enums';
import { TagsService } from '@/services/tags.service';

const tagsService = new TagsService();

export default {
  name: 'money-transfer-form.component',
  emits: {
    add: isValidTransactionObject,
    cancel: null,
  },

  data() {
    return {
      errors: [],
      value: null,
      tag: '',
      tags: [],
      currency: CurrencyValues.USD,
      repeatPeriod: RepeatingPeriod.Once,
      comment: '',
      date: this.getStartedOn(),
    };
  },

  props: {
    month: {
      type: Object,
      required: true,
    },
  },

  computed: {
    currencyValues() {
      return Object.keys(CurrencyValues);
    },

    repeatingPeriods() {
      return Object.values(RepeatingPeriod);
    },
  },

  methods: {
    addTransaction(e) {
      e.preventDefault();
      this.checkForm();

      if (this.errors.length === 0) {
        const { value, currency, comment, repeatPeriod, tag, date } = this;
        const id = Date.now();
        this.$emit('add', { id, value, currency, comment, repeatPeriod, tag, date });
      }
    },

    cancel() {
      this.$emit('cancel');
    },
    checkForm() {
      this.errors = [];
      if (!inputExists(this.value)) {
        this.errors.push('Value can not be empty');
      }

      if (!inputExists(this.currency)) {
        this.errors.push('Currency can not be empty');
      }

      if (!inputExists(this.repeatPeriod)) {
        this.errors.push('Repeat period can not be empty');
      }
    },

    getRepeatingPeriodForUser(period) {
      return RepeatingPeriodForUser[period];
    },

    getStartedOn() {
      return `${new Date().getFullYear()}-${this.month.name}`;
    },
  },
  async mounted() {
    const tags = await tagsService.getAvailableTags();
    this.tags = tags;
  },
};
</script>

<style scoped></style>
