<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="m-2">
    <div class="flex rounded-md shadow-sm justify-center">
      <a
        class="py-2 px-4 text-sm font-medium text-blue-700 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
      >
        Dashboard
      </a>
    </div>
  </div>
  <component :is="currentView" />
</template>

<script>
import BudgetDashboard from '@/pages/months-dashboard.page.vue';
import NotFound from '@/pages/no-found.page.vue';

const routes = {
  '/': BudgetDashboard
};

export default {
  data() {
    return {
      currentPath: window.location.hash,
    };
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound;
    },
  },
  methods: {
    setCurrentPath() {
      this.currentPath = window.location.hash;
    },
  },
  mounted() {
    window.addEventListener('hashchange', this.setCurrentPath);
  },
  beforeUnmount() {
    document.removeEventListener('hashchange', this.setCurrentPath);
  },
};
</script>
