<template>
  <div class="mt-3 md:mt-0 md:col-span-2">
    <div v-if="transactions.length > 0" class="mt-3 mb-3 md:mt-0 md:col-span-2">
      <h4 class="text-lg leading-6 text-black-900">
        <slot>Unknown transactions</slot>
      </h4>
      <div
        v-for="transaction of transactions"
        :key="transaction.id"
        class="m-1"
      >
        <div class="grid grid-cols-8 gap-2">
          <div
            class="grid grid-cols-1 gap-2 col-start-1 col-end-8 border border-blue-300 rounded-2xl p-1.5"
          >
            <div class="flex">
              <p class="font-medium">Value:&nbsp;</p>
              <p class="text-indigo-500">
                {{ transaction.value }} {{ transaction.currency }}
              </p>
            </div>

            <div class="flex">
              <div class="flex" v-if="commentExists(transaction.comment)">
                <p class="font-medium">Comment:&nbsp;</p>
                <p class="text-indigo-500">
                  {{ transaction.comment }}
                </p>
              </div>
            </div>
          </div>

          <div v-if="!isFrozen" class="h-12">
            <CustomClose @click="() => emitDelete(transaction.id)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inputExists } from "@/utils";
import CustomClose from "@/components/info-details/custom-close.component";

export default {
  name: "transactions-list.component",
  components: {
    CustomClose,
  },
  emits: {
    deleteTransaction: (el) => typeof el === "number",
  },
  props: {
    transactions: {
      type: Array,
      required: true,
    },
    isFrozen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    /**
     * Function that checks if comment is empty
     * @param {String} value 
     */
    commentExists(value) {
      return inputExists(value);
    },
    /**
     * Function that calls deleteTransaction from month card component
     * @param {String} id unique month id
     */
    emitDelete(id) {
      this.$emit("deleteTransaction", id);
    },
  },
};
</script>

<style scoped></style>
