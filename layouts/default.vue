<template>
    <div>
      <Menu />
      <slot />
      <Footer />
    </div>
</template>
<script setup lang="ts">
  import Menu from '@/components/landing/Menu.vue';
  import Footer from '@/components/landing/Footer.vue';
</script>
