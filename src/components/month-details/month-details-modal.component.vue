<template>
  <div class="container mx-auto">
    <CustomLoading v-if="isLoading" />
    <div class="flex justify-center" @click="onCloseHandler">
      <div v-show="isOpen" class="absolute inset-0 flex items-center justify-center bg-indigo-900 bg-opacity-50">
        <div class="max-w-3xl p-6 bg-white rounded-md shadow-xl" @click.stop>
          <div class="flex items-center justify-between">
            <h3 class="text-2xl">
              <slot name="header"> Model Title</slot>
            </h3>

            <CustomClose @click="onCloseHandler" />
          </div>

          <slot name="body"></slot>

          <p class="mb-4 text-sm"></p>
          <!--    START FOOTER WITH BUTTONS        -->
          <div class="mt-4">
            <slot name="footer">
              <button @click="onCloseHandler" class="px-6 py-2 text-blue-800 border border-blue-600 rounded">
                Cancel
              </button>

              <ConfirmationAlert
                v-if="isConfirmationModalOpen"
                title="Confirm Your Action"
                @close="isConfirmationModalOpen = false"
                @confirmed="() => (isDangerousClose() ? closeDetailsModal() : updateTransactions())"
              >
                <template #body>
                  {{
                    isDangerousClose()
                      ? 'You have unsaved transactions. Do you really want to discard them?'
                      : 'Do you want save this changes ? This action cannot be undone and can take some time.'
                  }}
                </template>
              </ConfirmationAlert>
              <InfoModal
                v-if="isTransactionCompleted"
                @done="proceedTransaction"
                :color="isTransactionSuccessful ? 'bg-green-400' : 'bg-red-600'"
                :title="
                  isTransactionSuccessful
                    ? 'Everything is ok, transaction successful!'
                    : 'Something went wrong, sorry :('
                "
              />
              <button v-if="!isFrozen" class="px-6 py-2 ml-2 text-blue-100 rounded bg-blue-600" @click="isConfirmationModalOpen = true">
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
import { TransactionService } from '@/services/transactions.service';
import ConfirmationAlert from '@/components/confirmation-alert.component';
import InfoModal from '@/components/info-modal.component';
import CustomLoading from '@/components/custom-loading.component';
import CustomClose from '@/components/custom-close.component';
import { isValidTransactionObject } from '@/utils';

export default {
  name: 'month-details-modal.component',
  components: {
    ConfirmationAlert,
    InfoModal,
    CustomLoading,
    CustomClose,
  },
  emits: {
    addIncome: isValidTransactionObject,
    addExpenditure: isValidTransactionObject,
    // successful: null,
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
    tempExpenditures: {
      type: Array,
      required: true,
    },
    expenditures: {
      type: Array,
      required: true,
    },
    isFrozen: {
      type: Boolean,
      default: false
    }
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
    updateTransactions() {
      this.isLoading = true;
      TransactionService.update(this.incomes, this.tempIncomes, this.expenditures, this.tempExpenditures)
        .then(() => {
          this.isTransactionSuccessful = true;
        })
        .finally(() => {
          this.isLoading = false;
          this.isTransactionCompleted = true;
        });
    },

    proceedTransaction() {
      if (!this.isTransactionCompleted) {
        return;
      }

      if (this.isTransactionSuccessful) {
        this.closeAll();
        // this.isOpen = true;
        // this.$emit('successful');
        this.$options.modalStateController.resolve(true);
        return;
      }

      this.closeAll();
      this.$options.modalStateController.resolve(false);
    },

    onCloseHandler() {
      this.isCloseRequested = true;
      if (this.isDangerousClose()) {
        this.isConfirmationModalOpen = true;
        return;
      }
      this.closeDetailsModal();
    },
    closeDetailsModal() {
      this.closeAll();
      this.$options.modalStateController.resolve(false);
    },

    isDangerousClose() {
      return this.isCloseRequested && (this.tempExpenditures.length > 0 || this.tempIncomes.length > 0);
    },

    handleKeydown(e) {
      if (this.isOpen && e.key === 'Escape') {
        this.closeDetailsModal();
      }
    },

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
    closeAll() {
      this.isOpen = false;
      this.isConfirmationModalOpen = false;
      this.isTransactionSuccessful = false;
      this.isTransactionCompleted = false;
      this.isCloseRequested = false;
    },
  },

  mounted() {
    document.addEventListener('keydown', this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  },

  watch: {
    isOpen(value) {
      if (value) {
        return document.querySelector('body').classList.add('overflow-hidden');
      }
      document.querySelector('body').classList.remove('overflow-hidden');
    },
  },
};
</script>
<style scoped></style>
