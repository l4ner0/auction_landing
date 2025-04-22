<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    class?: string;
    maxValue?: number;
    modelValue?: [number, number];
  }>(),
  {
    maxValue: 1200,
    modelValue: () => [0, 1200],
  },
);

const emit = defineEmits(["update:modelValue"]);
const range = ref<[number, number]>([...props.modelValue]);

// Sincroniza el valor del slider cuando cambia modelValue desde el exterior
watch(
  () => props.modelValue,
  (value) => {
    if (value && Array.isArray(value) && value.length === 2) {
      range.value = [...value];
    }
  },
  { deep: true },
);

// Computed para asegurar valores válidos
const clampedRange = computed(() => [
  Math.min(range.value[0], range.value[1]),
  Math.max(range.value[0], range.value[1]),
]);

// Emitir cambios en el modelo
const updateRange = (value: [number, number]) => {
  range.value = [...value];
  emit("update:modelValue", clampedRange.value);
};
</script>

<template>
  <div>
    <Slider
      :model-value="range"
      @update:modelValue="updateRange"
      :max="props.maxValue"
      :step="1"
      :class="cn('bg-white', props.class)"
    />
    <br />
    <div class="flex justify-between p-2">
      <div class="w-[111px]">
        <label
          for="minValue"
          class="flex text-sm font-medium text-gray-900 mb-1"
        >
          Desde <span class="ml-1 text-red-500">*</span>
        </label>
        <input
          id="minValue"
          type="number"
          v-model.number="range[0]"
          @input="updateRange([+range[0], range[1]])"
          class="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div class="w-[111px]">
        <label
          for="maxValue"
          class="flex text-sm font-medium text-gray-900 mb-1"
        >
          Hasta <span class="ml-1 text-red-500">*</span>
        </label>
        <input
          id="maxValue"
          type="number"
          v-model.number="range[1]"
          @input="updateRange([range[0], +range[1]])"
          class="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
    </div>
  </div>
</template>
