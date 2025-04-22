<script setup lang="ts">
import { RangeSlider } from "@/components/ui/custom-range-slider";
import Label from "../ui/label/Label.vue";

// Añadir prop para controlar si es mobile o desktop
const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false
  }
});

const rangePrice = ref([0, 12000]);
const generalSearch = ref("");
const emit = defineEmits(["onSearch"]);
const categoryManagementService = useCategoryManagementService();

const { data: categories } = await categoryManagementService.viewCategories();
const selectedCategory = ref<any | null>(null);
const subCategories = ref<{ id: string; name: string }[] | null>(null);
const selectedSubCategory = ref<any | null>(null);

watch(selectedCategory, async () => {
  if (selectedCategory.value) {
    selectedSubCategory.value = null;
    subCategories.value = null;
    const { data: subCategoriesData } =
      await categoryManagementService.viewSubCategories(
        selectedCategory.value.id
      );
    console.log(`subCategoriesData`, subCategoriesData);
    subCategories.value = subCategoriesData.value;
  }
});

watch(generalSearch, () => {
  emit("onSearch", {
    rangePrice,
    generalSearch,
    selectedCategory,
    selectedSubCategory,
  });
});

watch(rangePrice, () => {
  emit("onSearch", {
    rangePrice,
    generalSearch,
    selectedCategory,
    selectedSubCategory,
  });
});

watch(selectedCategory, () => {
  emit("onSearch", {
    rangePrice,
    generalSearch,
    selectedCategory,
    selectedSubCategory,
  });
});

watch(selectedSubCategory, () => {
  emit("onSearch", {
    rangePrice,
    generalSearch,
    selectedCategory,
    selectedSubCategory,
  });
});

const emitRangePrice = (value: number[]) => {
  console.log(`Emit range price`, value);
  emit("onSearch", {
    rangePrice: value,
    generalSearch,
    selectedCategory,
    selectedSubCategory,
  });
};

const cleanFilters = () => {
  rangePrice.value = [0, 12000];
  generalSearch.value = "";
  selectedCategory.value = null;
  selectedSubCategory.value = null;
  subCategories.value = null;
};
</script>
<template>
  <div
    :class="[
      isMobile ? 'block w-full' : 'hidden xl:block w-[304px]', 
      'bg-white border-2 border-[#F3F8FC] rounded-[8px] p-4',
      isMobile ? '' : 'h-[1368px] mb-[48px]'
    ]"
  >
    <div class="flex flex-row justify-between">
      <h3 class="font-bold text-[#2872A1] text-[18px] mb-[12px]">
        FILTROS RÁPIDOS
      </h3>
      <Button size="xs" @click="cleanFilters()"> Limpiar </Button>
    </div>
    <div class="grid w-full max-w-sm items-center gap-1.5 mt-4">
      <Label for="generalSearch">
        <span>Buscar por nombre</span>
        <span class="ml-[6px] text-[#F6313C]">*</span>
      </Label>
      <div class="relative">
        <Input
          id="generalSearch"
          v-model="generalSearch"
          type="text"
          placeholder="Buscar"
          class="pl-10 placeholder-[#94A3B8] text-[16px]"
        />
        <div class="absolute left-[12px] top-1/2 transform -translate-y-1/2">
          <CustomIcons name="search" class="w-[24px] h-[24px]" />
        </div>
      </div>
    </div>

    <div>
      <ul
        class="border border-[#F3F8FC] rounded-[8px] shadow px-[12px] py-[16px] mt-[24px]"
      >
        <h4 class="font-[600] text-[18px] mb-[16px] leading-[24px]">
          Categorías
        </h4>
        <div class="h-[300px] overflow-y-auto">
          <li
            v-for="(category, index) in categories"
            :key="category.id"
            class="flex items-center bg-white px-[8px] pb-[10px]"
          >
            <input
              type="radio"
              :id="`cat${category.id}`"
              name="categoria"
              class="mr-[8px]"
              v-model="selectedCategory"
              :value="category"
            />
            <label
              class="font-[400] text-[#152A3C] text-[14px] leading-[16px]"
              :for="`cat${category.id}`"
              >{{ category.name }}</label
            >
          </li>
        </div>
      </ul>
    </div>

    <div v-if="subCategories">
      <ul
        class="border border-[#F3F8FC] rounded-[8px] shadow px-[12px] py-[16px] mt-[24px]"
      >
        <h4 class="font-[600] text-[18px] mb-[16px] leading-[24px]">
          Sub Categorías
        </h4>

        <div class="h-[300px] overflow-y-auto">
          <li
            v-for="(subCategory, index) in subCategories"
            :key="subCategory.id"
            class="flex items-center bg-white px-[8px] pb-[10px]"
          >
            <input
              type="radio"
              :id="`subcat${subCategory.id}`"
              name="subcategoria"
              class="mr-[8px]"
              v-model="selectedSubCategory"
              :value="subCategory"
            />
            <label
              class="font-[400] text-[#152A3C] text-[14px] leading-[16px]"
              :for="`subcat${subCategory.id}`"
              >{{ subCategory.name }}</label
            >
          </li>
        </div>
      </ul>
    </div>
    <div class="mt-[16px]">
      <div
        class="border border-[#F3F8FC] rounded-[8px] shadow px-[12px] py-[16px] mt-[24px]"
      >
        <h4 class="font-[600] text-[18px] mb-[16px]">Rango de precios</h4>
        <RangeSlider
          v-model="rangePrice"
          @update:model-value="emitRangePrice"
          :max-value="12000"
        />
      </div>
    </div>
  </div>
</template>