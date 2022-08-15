<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="m-2">
    <div class="flex rounded-md shadow-sm justify-center">
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
