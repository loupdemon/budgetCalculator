<template>
  <div class="container mx-auto">
    <CustomLoading v-if="isLoading"/>
    <div class="modal fade top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto" @click="onCloseHandler">
      <div
        v-show="isOpen"
        class="absolute inset-0 flex items-center justify-center bg-indigo-900 bg-opacity-50"
      >
        <div class="max-w-3xl p-6 bg-white rounded-md shadow-xl" @click.stop>
          <div class="flex items-center justify-between">
            <h3 class="text-2xl">
              <slot name="header">Model Title</slot>
            </h3>
            <CustomClose @click="onCloseHandler"/>
          </div>
          <slot name="body"></slot>
          <p class="mb-4 text-sm"></p>
          <!--    START FOOTER WITH BUTTONS        -->
          <div class="mt-4">
            <slot name="footer">
              <button
                @click="onCloseHandler"
                class="px-6 py-2 text-blue-800 border border-blue-600 rounded"
              >
                Cancel
              </button>
              <ConfirmationAlert
                v-if="isConfirmationModalOpen"
                title="Confirm Your Action"
                @close="isConfirmationModalOpen = false"
                @confirmed="
                  () =>
                    isDangerousClose()
                      ? closeDetailsModal()
                      : updateTransactions()
                "
              >
                <template #body>
                  {{
                    isDangerousClose()
                      ? "You have unsaved transactions. Do you really want to discard them?"
                      : "Do you want save this changes ? This action cannot be undone and can take some time."
                  }}
                </template>
              </ConfirmationAlert>
              <InfoModal
                v-if="isTransactionCompleted"
                @done="proceedTransaction"
                :color="isTransactionSuccessful ? 'bg-green-200' : 'bg-red-200'"
                :title="
                  isTransactionSuccessful
                    ? 'Everything is ok, transaction successful!'
                    : 'Something went wrong, sorry :('
                "
              />
              <button
                v-if="!isFrozen"
                class="px-6 py-2 ml-2 text-blue-100 rounded bg-blue-600"
                @click="isConfirmationModalOpen = true"
              >
                Save
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TransactionService } from "@/services/transactions.service";
import ConfirmationAlert from "@/components/info-details/confirmation-alert.component";
import InfoModal from "@/components/info-details/info-modal.component";
import CustomLoading from "@/components/info-details/custom-loading.component";
import CustomClose from "@/components/info-details/custom-close.component";
import { isValidTransactionObject } from "@/utils";

export default {
  name: "month-details-modal.component",
  components: {
    ConfirmationAlert,
    InfoModal,
    CustomLoading,
    CustomClose,
  },
  emits: {
    addIncome: isValidTransactionObject,
    addExpense: isValidTransactionObject,
  },
  modalStateController: null,
  props: {
    monthId: {
      type: Number, 
      required: true
    },
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
  },
  data() {
    return {
      isOpen: false,
      isConfirmationModalOpen: false,
      isTransactionSuccessful: false,
      isTransactionCompleted: false,
      isLoading: false,
      isCloseRequested: false,
    };
  },
  methods: {
    /**
     * Function that calls services to update information in dashboard and database
     */
    updateTransactions() {
      this.isLoading = true;
      new TransactionService().updateMonthData(
        this.monthId,
        this.incomes,
        this.tempIncomes,
        this.expenses,
        this.tempExpenses
      );
      TransactionService.waitForTimeout().then(() => {
          this.isTransactionSuccessful = true;
        })
        .finally(() => {
          this.isLoading = false;
          this.isTransactionCompleted = true;
        });
    },
    /**
     * Function that checks state of updating operations in modal and closes action
     */
    proceedTransaction() {
      if (!this.isTransactionCompleted) {
        return;
      }
      if (this.isTransactionSuccessful) {
        this.closeAll();
        this.$options.modalStateController.resolve(true);
        return;
      }
      this.closeAll();
      this.$options.modalStateController.resolve(false);
    },
    /**
     * Function that checks state of operation and calls for confirmation of done operations
     */
    onCloseHandler() {
      this.isCloseRequested = true;
      if (this.isDangerousClose()) {
        this.isConfirmationModalOpen = true;
        return;
      }
      this.closeDetailsModal();
    },
    /**
     * Function that closes all modals
     */
    closeDetailsModal() {
      this.closeAll();
      this.$options.modalStateController.resolve(false);
    },
    /**
     * Function that checks if closing of modal was initiated by user or was done by mistake
     */
    isDangerousClose() {
      return (
        this.isCloseRequested &&
        (this.tempExpenses.length > 0 || this.tempIncomes.length > 0)
      );
    },
    /**
     * Function that returns promise with current state of the window
     */
    async manageState() {
      this.isOpen = !this.isOpen;
      let resolve;
      let reject;
      const statePromise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      this.$options.modalStateController = { resolve, reject };
      return statePromise;
    },
    /**
     * Function that clear all settings in the window
     */
    closeAll() {
      this.isOpen = false;
      this.isConfirmationModalOpen = false;
      this.isTransactionSuccessful = false;
      this.isTransactionCompleted = false;
      this.isCloseRequested = false;
    },
  },
  watch: {
    isOpen(value) {
      if (value) {
        return document.querySelector("body").classList.add("overflow-hidden");
      }
      document.querySelector("body").classList.remove("overflow-hidden");
    },
  },
};
</script>
