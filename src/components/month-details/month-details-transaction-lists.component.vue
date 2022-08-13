<template>
  <TransactionsList :transactions="savedTransactions" @deleteTransaction="deleteTransaction"
    >Saved {{ title }}
  </TransactionsList>
  <TransactionsList :transactions="tempTransactions" @deleteTransaction="deleteTempTransaction"
    >Unsaved {{ title }}
  </TransactionsList>
  <TransactionsList
    v-if="deletedTransactions.length > 0"
    :transactions="deletedTransactions"
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
  },

  emits: {
    deleteTransaction: id => !Number.isNaN(Number(id)),
    deleteTempTransaction: id => !Number.isNaN(Number(id)),
    revertTransactionDelete: id => !Number.isNaN(Number(id)),
  },
  methods: {
    deleteTransaction(id) {
      this.$emit('deleteTransaction', id);
    },
    deleteTempTransaction(id) {
      this.$emit('deleteTempTransaction', id);
    },
    revertTransactionDelete(id) {
      this.$emit('revertTransactionDelete', id);
    },
  },
};
</script>

<style scoped></style>
