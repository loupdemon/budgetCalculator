<template>
  <div class="" style="text-align: center">
    <h1 class="text-3xl font-bold underline">Welcome to Budget Calculator!</h1>
    <h2 class="text-2xl">Now is year {{ year }}. Let's plan your budget</h2>
  </div>
  <RouteComponent />
</template>

<script>

import RouteComponent from '@/components/route.component'
export default {
  name: 'App',
  components: {
    RouteComponent
  },
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
