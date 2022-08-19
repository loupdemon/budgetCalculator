<template>
  <div class="mt-4">
    <!--    Start of the form        -->
    <div class="overflow-auto max-h-128">
      <div class="hidden sm:block" aria-hidden="true">
        <div class="py-5">
          <div class="border-t border-gray-200" />
        </div>
      </div>
      <!--              START INCOMES SECTION-->
      <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Incomes</h3>
              <p class="mt-1 text-sm text-gray-600">Salary, bonuses, one-time incomes etc</p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <slot name="incomes">NO ANY INCOMES!</slot>
            <MoneyTransferForm
              v-if="isIncomeFormOpen"
              :month="month"
              @add="handleAddIncome"
              @cancel="cancelIncomeTransaction"
              >Adding income
            </MoneyTransferForm>
            <div v-if="!isIncomeFormOpen" class="h-15 grid grid-cols-5 gap-12 content-center">
              <button
                v-if="!isFrozen"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full col-start-3 m-1.5"
                @click="isIncomeFormOpen = true"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <!--              START INCOMES SECTION-->
      <div class="hidden sm:block" aria-hidden="true">
        <div class="py-5">
          <div class="border-t border-gray-200" />
        </div>
      </div>
      <!--              START EXPENSES SECTION-->
      <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Expenses</h3>
              <p class="mt-1 text-sm text-gray-600">Taxes, commissions, gifts etc .</p>
            </div>
          </div>
          <div class="mt-3 md:mt-0 md:col-span-2">
            <slot name="expenses">NO ANY INCOMES!</slot>
            <MoneyTransferForm
              v-if="isExpensesFormOpen"
              :month="month"
              @add="handleAddExpense"
              @cancel="cancelExpenseTransaction"
            >
              Adding Expense
            </MoneyTransferForm>
            <div v-if="!isExpensesFormOpen" class="h-15 grid grid-cols-5 gap-12 content-center">
              <button
                v-if="!isFrozen"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full col-start-3 m-1.5"
                @click="isExpensesFormOpen = true"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <!--              END EXPENSES SECTION-->
      <div class="hidden sm:block" aria-hidden="true">
        <div class="py-5">
          <div class="border-t border-gray-200" />
        </div>
      </div>
      <!--              START SUMMARIES SECTION-->
      <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Summary</h3>
              <p class="mt-1 text-sm text-gray-600">Here you see how GOOD or BAD things are...</p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <TransactionsSummaries
              :incomes="[...tempIncomes, ...incomes]"
              :expenses="[...tempExpenses, ...expenses]"
            />
          </div>
        </div>
      </div>
      <!--              END SUMMARIES SECTION-->
    </div>
  </div>
</template>

<script>
import MoneyTransferForm from '@/components/money-transfer-form.component';
import TransactionsSummaries from '@/components/transactions-summaries.component';
import { isValidTransactionObject } from '@/utils';

export default {
  name: 'month-body.component',
  components: {
    MoneyTransferForm,
    TransactionsSummaries,
  },
  emits: {
    addIncome: isValidTransactionObject,
    addExpense: isValidTransactionObject,
  },
  modalStateController: null,
  props: {
    tempIncomes: {
      type: Array,
      required: true,
    },
    incomes: {
      type: Array,
      required: true,
    },
    tempExpenses: {
      type: Array,
      required: true,
    },
    expenses: {
      type: Array,
      required: true,
    },
    isFrozen: {
      type: Boolean,
      default: false,
    },
    month: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isIncomeFormOpen: false,
      isExpensesFormOpen: false,
    };
  },

  methods: {
    /**
     * Function that calls addIncome from month card component
     * @param {Object[]} obj income object
     */
    handleAddIncome(obj) {
      this.isIncomeFormOpen = false;
      this.$emit('addIncome', obj);
    },
    /**
     * Function that calls addExpense from month card component
     * @param {Object[]} obj income expense
     */
    handleAddExpense(obj) {
      this.isExpensesFormOpen = false;
      this.$emit('addExpense', obj);
    },
    /**
     * Function that closes expenses adding form
     */
    cancelExpenseTransaction() {
      this.isExpensesFormOpen = false;
    },
    /**
     * Function that closes incomes adding form
     */
    cancelIncomeTransaction() {
      this.isIncomeFormOpen = false;
    },
  },
};
</script>
