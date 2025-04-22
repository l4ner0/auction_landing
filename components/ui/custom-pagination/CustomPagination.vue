<template>
  <div class="w-full flex flex-col md:flex-row justify-between items-center gap-4">
    <div class="flex flex-row items-center">
      <span class="text-[#475569] text-sm md:text-base">Total de registros</span>
      <div class="ml-2 bg-white rounded-[8px] text-primary w-[34px] h-[36px] flex justify-center items-center">
        {{ total }}
      </div>
    </div>
    <div v-if="isMobile" class="flex items-center gap-2">
      <button
        @click="props.page > 1 ? emit('update:page', props.page - 1) : () => {}"
        :disabled="props.page === 1"
        class="bg-primary text-white rounded-[8px] w-[36px] h-[36px] flex justify-center items-center transition-opacity duration-200 ease-in-out hover:opacity-70 disabled:opacity-50"
      >
        <CustomIcons name="ArrowLeft" class="rotate-180 w-5 h-5" />
      </button>
      <div class="bg-white text-primary rounded-[8px] px-3 h-[36px] flex items-center">
        {{ props.page }} de {{ totalPages }}
      </div>
      <button
        @click="props.page < totalPages ? emit('update:page', props.page + 1) : () => {}"
        :disabled="props.page === totalPages"
        class="bg-primary text-white rounded-[8px] w-[36px] h-[36px] flex justify-center items-center transition-opacity duration-200 ease-in-out hover:opacity-70 disabled:opacity-50"
      >
        <CustomIcons name="ArrowLeft" class="w-5 h-5" />
      </button>
    </div>
    <div v-else class="flex flex-row gap-x-[6px] overflow-x-auto whitespace-nowrap">
      <button
        @click="props.page > 1 ? emit('update:page', props.page - 1) : () => {}"
        :disabled="props.page === 1"
        :class="cn(activeBtnClass({ size: 'md', status: props.page === 1 ? 'active' : 'inactive' }), 'w-[120px]')"
      >
        <CustomIcons name="ArrowLeft" class="rotate-180 mr-1 w-6 h-6" />
        <span>Atrás</span>
      </button>

      <template v-for="item in getPageNumbers()" :key="item">
        <button
          v-if="item === '...'"
          class="px-2"
        >
          ...
        </button>
        <button
          v-else
          :class="activeBtnClass({
            status: props.page === item ? 'active' : 'inactive',
          })"
          @click="emit('update:page', item)"
        >
          {{ item }}
        </button>
      </template>

      <button
        @click="props.page < totalPages ? emit('update:page', props.page + 1) : () => {}"
        :disabled="props.page === totalPages"
        :class="cn(activeBtnClass({ size: 'md', status: props.page === totalPages ? 'active' : 'inactive' }), 'w-[120px]')"
      >
        <span>Siguiente</span>
        <CustomIcons name="ArrowLeft" class="ml-1 w-6 h-6" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import CustomIcons from "@/components/ui/custom-icons/CustomIcons.vue";
import { cva } from "class-variance-authority";
import { cn } from '@/lib/utils';

const btnSyles = "flex justify-center items-center rounded-[8px] h-[36px]";
const activeBtnClass = cva([btnSyles, "w-[34px]"], {
  variants: {
    status: {
      active: "bg-primary text-white",
      inactive: "bg-white text-primary hover:bg-primary hover:text-white",
    },
    size: {
      sm: "w-[34px]",
      md: "w-[78px]",
    },
  },
  defaultVariants: {
    status: "inactive",
    size: "sm",
  },
});

const isMobile = ref(false);

onMounted(() => {
  checkIfMobile();
  window.addEventListener('resize', checkIfMobile);
});

const checkIfMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

const page = defineModel("page");
const props = defineProps(["total", "limit", "page"]);
const emit = defineEmits(["update:page"]);

const totalPages = computed(() => Math.ceil(props.total / props.limit));

const getPageNumbers = () => {
  const pages = [];
  const currentPage = props.page;
  
  if (totalPages.value <= 7) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
    return pages;
  }

  pages.push(1);
  
  if (currentPage > 3) {
    pages.push('...');
  }
  
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages.value - 1, currentPage + 1);
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  if (currentPage < totalPages.value - 2) {
    pages.push('...');
  }
  
  if (totalPages.value > 1) {
    pages.push(totalPages.value);
  }
  
  return pages;
};
</script>

