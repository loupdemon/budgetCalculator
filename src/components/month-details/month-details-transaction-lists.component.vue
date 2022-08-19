<template>
  <TransactionsList :transactions="savedTransactions" :is-frozen="isFrozen" @deleteTransaction="deleteTransaction"
    >Saved {{ title }}
  </TransactionsList>
  <TransactionsList :transactions="tempTransactions" :is-frozen="isFrozen" @deleteTransaction="deleteTempTransaction"
    >Unsaved {{ title }}
  </TransactionsList>
  <TransactionsList
    v-if="deletedTransactions.length > 0"
    :transactions="deletedTransactions"
    :is-frozen="isFrozen"
    @deleteTransaction="revertTransactionDelete"
    >Deleted {{ title }}
  </TransactionsList>
</template>

<script>
import TransactionsList from '@/components/transactions-list.component';
export default {
  name: 'month-details-transaction-lists.component',
  components: {
    TransactionsList,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    tempTransactions: {
      type: Array,
      required: true,
    },
    savedTransactions: {
      type: Array,
      required: true,
    },
    deletedTransactions: {
      type: Array,
      required: true,
    },
    isFrozen: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    deleteTransaction: id => !Number.isNaN(Number(id)),
    deleteTempTransaction: id => !Number.isNaN(Number(id)),
    revertTransactionDelete: id => !Number.isNaN(Number(id)),
  },
  methods: {
    /**
     * Function that calls deleteTransaction from month cart component
     * @param {String} id unique id of transaction
     */
    deleteTransaction(id) {
      this.$emit('deleteTransaction', id);
    },
    /**
     * Function that calls deleteTempTransaction from month cart component
     * @param {String} id unique id of transaction
     */
    deleteTempTransaction(id) {
      this.$emit('deleteTempTransaction', id);
    },
    /**
     * Function that calls revertTransactionDelete from month cart component
     * @param {String} id unique id of transaction
     */
    revertTransactionDelete(id) {
      this.$emit('revertTransactionDelete', id);
    },
  },
};
</script>
