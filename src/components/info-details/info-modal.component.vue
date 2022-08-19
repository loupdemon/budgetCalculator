<template>
  <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-10" v-if="open">
    <div class="absolute w-full h-full opacity-50" @click="close" :class="color"></div>

    <div class="absolute max-h-full mx-auto">
      <div class="container bg-white overflow-hidden md:rounded">
        <div
          class="px-4 py-4 leading-none flex justify-between items-center font-medium text-sm bg-gray-100 border-b select-none"
        >
          <h3>{{ title }}</h3>
        </div>

        <div class="max-h-full px-4 py-4">
          <p class="text-gray-800">
            <slot name="body">Press button to proceed</slot>
          </p>

          <div class="text-right mt-4">
            <slot name="confirmButton">
              <button
                class="mr-2 px-4 py-2 text-sm rounded text-white bg-blue-600 focus:outline-none hover:bg-blue-400"
                @click="done"
              >
                Got it
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
  data() {
    return {
      open: true,
    };
  },
  emits: {
    done: null,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'bg-gray-900',
    },
  },
  methods: {
    /**
     * Function that calls action of window to close it
     */
    done() {
      this.open = false;
      this.$emit('done');
    },
  },
};
</script>
