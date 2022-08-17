<template>
  <div
    class="max-w-md py-4 px-8 shadow-xl rounded-lg my-6 ml-2 border"
    :class="monthStyle"
  >
    <div>
      <h2 class="text-gray-800 text-3xl font-semibold">
        <b>{{ month.name }}</b>
      </h2>
      <div class="text-black-700">
        <TransactionSummaries
          :expenses="[...expenses, ...deletedExpenses]"
          :incomes="[...incomes, ...deletedIncomes]"
        />
      </div>
    </div>
    <div class="container mx-auto" @click="close">
      <div class="flex justify-end mt-4">
        <button
          @click="showDialog"
          class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight 
          rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg 
          focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          type="button"
        >
          SHOW DETAILS
        </button>
      </div>
    </div>
    <div>
      <MonthDetailsModal
        ref="detailsModal"
        :monthId="monthId"
        :expenses="expenses"
        :incomes="incomes"
        :temp-expenses="tempExpenses"
        :temp-incomes="tempIncomes"
        :is-frozen="isPassedMonth"
        @successful="proceedSuccessfulTransaction"
      >
        <template #header> {{ month.name }} {{ year }}</template>
        <template #body>
          <ModalBody
            :expenses="expenses"
            :incomes="incomes"
            :temp-expenses="tempExpenses"
            :temp-incomes="tempIncomes"
            :is-frozen="isPassedMonth"
            :month="month"
            @addIncome="(tempIncome) => tempIncomes.push(tempIncome)"
            @addExpense="(tempExpense) => tempExpenses.push(tempExpense)"
          >
            <template #incomes>
              <MonthDetailsTransactionsList
                title="incomes"
                :saved-transactions="incomes"
                :temp-transactions="tempIncomes"
                :deleted-transactions="deletedIncomes"
                :is-frozen="isPassedMonth"
                @deleteTransaction="deleteIncome"
                @deleteTempTransaction="deleteTempIncome"
                @revertTransactionDelete="revertIncomeDelete"
              />
            </template>
            <template #expenses>
              <MonthDetailsTransactionsList
                title="expenses"
                :saved-transactions="expenses"
                :temp-transactions="tempExpenses"
                :deleted-transactions="deletedExpenses"
                :is-frozen="isPassedMonth"
                @deleteTransaction="deleteExpense"
                @deleteTempTransaction="deleteTempExpense"
                @revertTransactionDelete="revertExpenseDelete"
              />
            </template>
          </ModalBody>
        </template>
      </MonthDetailsModal>
    </div>
  </div>
</template>

<script>
import MonthDetailsModal from "./month-details/month-details-modal.component";
import MonthDetailsTransactionsList from "./month-details/month-details-transaction-lists.component";
import ModalBody from "./month-details/month-details-body.component";
import TransactionSummaries from "./transactions-summaries.component";
import { MonthType } from "@/enums";

export default {
  name: "month-card.component",
  components: {
    MonthDetailsModal,
    MonthDetailsTransactionsList,
    TransactionSummaries,
    ModalBody,
  },
  props: {
    month: {
      type: Object,
      required: true,
    },
    monthId: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    monthType: {
      type: String,
      default: MonthType.Future,
    },
    monthsData: {
      type: Map,
      default: MonthType.Future,
    },
  },
  data() {
    return {
      tempIncomes: [],
      tempExpenses: [],
      incomes: [],
      expenses: [],
      deletedIncomes: [],
      deletedExpenses: [],
    };
  },
  computed: {
    /**
     * Function that returns class in relation to monthType
     */
    monthStyle() {
      if (this.monthType === MonthType.Passed) {
        return "bg-zinc-200";
      } else if (this.monthType === MonthType.Current) {
        return "bg-blue-100";
      } else {
        return "bg-white";
      } 
    },
    isPassedMonth() {
      return this.monthType === MonthType.Passed;
    },
  },
  emits: {
    rerender: null,
  },
  methods: {
    /**
     * Function that deletes component of temporary added income in the modal
     * @param {String} id - unique id of income
     */
    deleteTempIncome(id) {
      this.tempIncomes = this.tempIncomes.filter((el) => el.id !== id);
    },
    /**
     * Function that deletes component of temporary added expense in the modal
     * @param {String} id - unique id of expense
     */
    deleteTempExpense(id) {
      this.tempExpenses = this.tempExpenses.filter((el) => el.id !== id);
    },
    /**
     * Function that changes added and saved expense to deleted one in the modal
     * @param {String} id - unique id of expense
     */
    deleteExpense(id) {
      const expense = this.expenses.find((el) => el.id === id);
      if (expense) {
        this.deletedExpenses.push(expense);
      }
      this.expenses = this.expenses.filter((el) => el.id !== id);
    },
    /**
     * Function that changes added and saved income to deleted one in the modal
     * @param {String} id - unique id of income
     */
    deleteIncome(id) {
      const income = this.incomes.find((el) => el.id === id);
      if (income) {
        this.deletedIncomes.push(income);
      }
      this.incomes = this.incomes.filter((el) => el.id !== id);
    },
    /**
     * Function that changes deleted income back to added and saved one in the modal
     * @param {String} id - unique id of income
     */
    revertIncomeDelete(id) {
      const income = this.deletedIncomes.find((el) => el.id === id);
      if (income) {
        this.incomes.push(income);
      }
      this.deletedIncomes = this.deletedIncomes.filter((el) => el.id !== id);
    },
        /**
     * Function that changes deleted expense back to added and saved one in the modal
     * @param {String} id - unique id of expense
     */
    revertExpenseDelete(id) {
      const expense = this.deletedExpenses.find((el) => el.id === id);
      if (expense) {
        this.expenses.push(expense);
      }
      this.deletedExpenses = this.deletedExpenses.filter((el) => el.id !== id);
    },
    /**
     * Function that shows the dialog window when user finishes his updating and click on close button
     * and calls for updating all the information in the dashboard and clear temporary storages
     */
    async showDialog() {
      const result = await this.$refs.detailsModal.manageState();
      if (result) {
        this.proceedSuccessfulTransaction();
        return;
      }
      this.incomes.push(...this.deletedIncomes);
      this.expenses.push(...this.deletedExpenses);
      this.flushTempStorages();
    },
    /**
     * Function that calls for updating all the information in the dashboard
     */
    proceedSuccessfulTransaction() {
      this.incomes = [...this.tempIncomes, ...this.incomes];
      this.expenses = [...this.tempExpenses, ...this.expenses];
      this.flushTempStorages();
      this.$emit("rerender");
    },
    /**
     * Function that calls for clearing temporary storages
     */
    flushTempStorages() {
      this.tempIncomes = [];
      this.tempExpenses = [];
      this.deletedIncomes = [];
      this.deletedExpenses = [];
    },
    /**
     * Function that gets information of incomes for called month
     */
    getMonthIncomes() {
      return this.monthsData.get(this.month.name).incomes;
    },
        /**
     * Function that gets information of expenses for called month
     */
    getMonthExpenses() {
      return this.monthsData.get(this.month.name).expenses;
    },
  },
  mounted() {
    this.incomes.push(...this.getMonthIncomes());
    this.expenses.push(...this.getMonthExpenses());
  },
};
</script>
