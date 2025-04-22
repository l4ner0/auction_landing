<script setup lang="ts">
import OfferFilters from "~/components/offer/OfferFilter.vue";
import Button from "~/components/ui/button/Button.vue";
import { XIcon } from "lucide-vue-next";

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "on-search"]);

const handleSearch = (searchData: any) => {
  emit("on-search", searchData);
  emit("close");
};
</script>

<template>
  <div
    class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end sm:items-center justify-center"
  >
    <div
      class="bg-white w-full sm:max-w-lg sm:rounded-lg max-h-[90vh] overflow-auto rounded-t-lg shadow-lg flex flex-col"
    >
      <div
        class="p-4 border-b sticky top-0 bg-white z-10 flex items-center justify-between"
      >
        <h2 class="text-lg font-semibold text-gray-900">Filtros</h2>
        <Button variant="ghost" size="icon" @click="$emit('close')">
          <XIcon class="w-5 h-5" />
        </Button>
      </div>

      <div class="p-4 flex-grow">
        <OfferFilters is-mobile @on-search="handleSearch" />
      </div>

      <div class="p-4 border-t sticky bottom-0 bg-white flex justify-end gap-2">
        <Button variant="outline" @click="$emit('close')">Cancelar</Button>
        <Button @click="$emit('close')" class="bg-primary text-white"
          >Aplicar filtros</Button
        >
      </div>
    </div>
  </div>
</template>
