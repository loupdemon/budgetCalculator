<template>
  <div class="max-w-md py-4 px-8 shadow-xl rounded-lg my-6 ml-2 border" :class="monthStyle">
    <!--    <div class="flex justify-center md:justify-end -mt-16">-->
    <!--      <img-->
    <!--        class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"-->
    <!--        src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"-->
    <!--      />-->
    <!--    </div>-->
    <div>
      <h2 class="text-gray-800 text-3xl font-semibold">
        Month: <b>{{ month.name }}</b>
      </h2>
      <h3 class="text-gray-800 text-2xl font-semibold">
        Working days: <b>{{ days }}</b>
      </h3>
      <div class="mt-2 text-black-700">
        <TransactionSummaries
          :expenditures="[...expenditures, ...deletedExpenditures]"
          :incomes="[...incomes, ...deletedIncomes]"
        />
      </div>
    </div>
    <div class="container mx-auto" @click="close">
      <div class="flex justify-end mt-4">
        <button
          @click="showDialog"
          class="text-xl font-medium px-6 py-2 text-white bg-blue-600 rounded shadow"
          type="button"
        >
          Show details
        </button>
      </div>
    </div>
    <div>
      <MonthDetailsModal
        ref="detailsModal"
        :expenditures="expenditures"
        :incomes="incomes"
        :temp-expenditures="tempExpenditures"
        :temp-incomes="tempIncomes"
        :is-frozen="isPassedMonth"
        @successful="proceedSuccessfulTransaction"
      >
        <template #header> {{ month.name }}-{{ year }}</template>
        <template #body>
          <ModalBody
            :expenditures="expenditures"
            :incomes="incomes"
            :temp-expenditures="tempExpenditures"
            :temp-incomes="tempIncomes"
            :is-frozen="isPassedMonth"
            :month="month"
            @addIncome="tempIncome => tempIncomes.push(tempIncome)"
            @addExpenditure="tempExpenditure => tempExpenditures.push(tempExpenditure)"
          >
            <template #incomes>
              <MonthDetailsTransactionsList
                title="incomes"
                :saved-transactions="incomes"
                :temp-transactions="tempIncomes"
                :deleted-transactions="deletedIncomes"
                @deleteTransaction="deleteIncome"
                @deleteTempTransaction="deleteTempIncome"
                @revertTransactionDelete="revertIncomeDelete"
              />
            </template>
            <template #expenditures>
              <MonthDetailsTransactionsList
                title="expenditures"
                :saved-transactions="expenditures"
                :temp-transactions="tempExpenditures"
                :deleted-transactions="deletedExpenditures"
                @deleteTransaction="deleteExpenditure"
                @deleteTempTransaction="deleteTempExpenditure"
                @revertTransactionDelete="revertExpenditureDelete"
              />
            </template>
          </ModalBody>
        </template>
      </MonthDetailsModal>
    </div>
  </div>
</template>

<script>
import { DaysService } from '../services/days.service';

import MonthDetailsModal from './month-details/month-details-modal.component';
import MonthDetailsTransactionsList from './month-details/month-details-transaction-lists.component';
import ModalBody from './month-details/month-details-body.component';
import TransactionSummaries from './transactions-summaries.component';
import { MonthType } from '@/enums';

const daysService = new DaysService();
export default {
  name: 'month-card.component',
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
    year: {
      type: Number,
      required: true,
    },
    monthType: {
      type: String,
      default: MonthType.Future,
    },
  },
  data() {
    return {
      tempIncomes: [],
      tempExpenditures: [],
      incomes: [{ id: Date.now() + 1, value: 4000, currency: 'USD', repeatPeriod: 1, comment: 'Salary' }],
      expenditures: [{ id: Date.now() + 3, value: 2050, currency: 'USD', repeatPeriod: 0, comment: 'For house' }],
      deletedIncomes: [],
      deletedExpenditures: [],
      days: daysService.getNumberOfDays(this.year, this.month.name),
    };
  },
  computed: {
    monthStyle() {
      if (this.monthType === MonthType.Passed) {
        return 'bg-gray-300';
      }

      if (this.monthType === MonthType.Current) {
        return 'bg-yellow-200';
      }

      return '';
    },

    isPassedMonth() {
      return this.monthType === MonthType.Passed;
    },
  },
  methods: {
    deleteTempIncome(id) {
      this.tempIncomes = this.tempIncomes.filter(el => el.id !== id);
    },
    deleteTempExpenditure(id) {
      this.tempExpenditures = this.tempExpenditures.filter(el => el.id !== id);
    },
    deleteExpenditure(id) {
      const expenditure = this.expenditures.find(el => el.id === id);
      if (expenditure) {
        this.deletedExpenditures.push(expenditure);
      }
      this.expenditures = this.expenditures.filter(el => el.id !== id);
    },
    deleteIncome(id) {
      const income = this.incomes.find(el => el.id === id);
      if (income) {
        this.deletedIncomes.push(income);
      }
      this.incomes = this.incomes.filter(el => el.id !== id);
    },

    revertIncomeDelete(id) {
      const income = this.deletedIncomes.find(el => el.id === id);
      if (income) {
        this.incomes.push(income);
      }
      this.deletedIncomes = this.deletedIncomes.filter(el => el.id !== id);
    },

    revertExpenditureDelete(id) {
      const expenditure = this.deletedExpenditures.find(el => el.id === id);
      if (expenditure) {
        this.expenditures.push(expenditure);
      }
      this.deletedExpenditures = this.deletedExpenditures.filter(el => el.id !== id);
    },

    async showDialog() {
      const result = await this.$refs.detailsModal.manageState();

      if (result) {
        this.proceedSuccessfulTransaction();
        return;
      }

      this.incomes.push(...this.deletedIncomes);
      this.expenditures.push(...this.deletedExpenditures);
      this.flushTempStorages();
    },

    proceedSuccessfulTransaction() {
      this.incomes = [...this.tempIncomes, ...this.incomes];
      this.expenditures = [...this.tempExpenditures, ...this.expenditures];
      this.flushTempStorages();
    },

    flushTempStorages() {
      this.tempIncomes = [];
      this.tempExpenditures = [];
      this.deletedIncomes = [];
      this.deletedExpenditures = [];
    },
  },
};
</script>

<style scoped></style>
