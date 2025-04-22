<script setup lang="ts">
import EventListItem from '~/components/event/EventListItem.vue';

interface Card {
  name: string;
  endDate: number; 
  closingTime:number;
  id: string;
  logo: string;
  description: string;
  goodType: string
}
const props = defineProps<{ events: Card[] | null }>()
</script>
<template>
  <div class="max-w-[1440px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px] mt-[32px] mb-[48px]">
    <EventListItem v-for="item in props.events" :event="item" :key="item.id" />
  </div>
</template>
