<script setup lang="ts">
import OfferListItem from '~/components/offer/OfferListItem.vue';

interface Card {
  title: string;
  description: string;
  id: string;
  initialValue: string;
  updatedAt: string;
  district: string;
  attachedFiles: { id: string; name: string; path: string }[];
  bids: any[];
  endTime: string;
  address: any
}
const props = defineProps<{ offers: Card[] | null }>()
</script>
<template>
  <div class="flex-1 grid grid-cols-1 gap-[16px] px-[10px] md:px-[0px] ml-[0px] md:mx-[16px]">
    <OfferListItem v-for="item in props.offers" :offer="item" :key="item.id" />
  </div>
</template>
