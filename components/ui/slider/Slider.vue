<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from 'radix-vue'
import { cn } from '@/lib/utils'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<SliderRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<SliderRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SliderRoot
    :class="cn(
      'relative flex w-full touch-none select-none items-center data-[orientation=vertical]:flex-col data-[orientation=vertical]:w-2 data-[orientation=vertical]:h-full',
      props.class,
    )"
    v-bind="forwarded"
  >
    <SliderTrack class="relative hover:cursor-pointer h-2 w-full data-[orientation=vertical]:w-2 grow overflow-hidden rounded-full bg-gray-200">
      <SliderRange class="absolute h-full data-[orientation=vertical]:w-full bg-bluePrimary/95" />
    </SliderTrack>
    <SliderThumb
      v-for="(_, key) in modelValue"
      :key="key"
      class="block h-6 w-6 rounded-full border-[1px] border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus:cursor-pointer hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderRoot>
</template>
