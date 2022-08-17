<template>
  <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-10" v-if="open">
    <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="close"></div>

    <div class="absolute max-h-full mx-auto">
      <div class="container bg-white overflow-hidden md:rounded">
        <div
          class="px-4 py-4 leading-none flex justify-between items-center font-medium text-sm bg-gray-100 border-b select-none"
        >
          <h3>{{ title }}</h3>
          <div @click="close" class="text-2xl hover:text-gray-600 cursor-pointer">&#215;</div>
        </div>

        <div class="max-h-full px-4 py-4">
          <p class="text-gray-800">
            <slot name="body"></slot>
          </p>

          <div class="text-right mt-4">
            <slot name="closeButton">
              <button @click="close" class="px-4 py-2 text-sm text-gray-600 focus:outline-none hover:underline">
                Cancel
              </button>
            </slot>

            <slot name="confirmButton">
              <button
                class="mr-2 px-4 py-2 text-sm rounded text-white bg-blue-600 focus:outline-none hover:bg-blue-400"
                @click="confirm"
              >
                Confirm
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      open: true,
    };
  },
  emits: {
    close: null,
    confirmed: null,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  methods: {
    close() {
      this.open = false;
      this.$emit('close');
    },

    confirm() {
      this.isLoading = true;
      this.$emit('confirmed');
    },
  },
};
</script>
