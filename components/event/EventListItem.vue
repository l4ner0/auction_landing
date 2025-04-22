<script setup lang="ts">
import { goodType } from '~/constants/events';

interface Card {
  name: string;
  endDate: number;
  closingTime: number;
  id: string;
  logo: string;
  description: string;
  goodType: string
}
const props = defineProps<{ event: Card }>();
const { event } = toRefs(props);
const router = useRouter();
const handleEventsDetail = async (event: Card) => {
  router.push(`/events/${event.id}`);
};

</script>
<template>
  <div
    class="w-[100%] max-w-[305px] bg-[#FFFFFF] rounded-[10px] shadow-[0px_0px_15px_0px_#080E1C0F] p-4"
  >
    <div class="flex justify-center w-[179px] rounded-[8px] bg-[#E6F0F8]">
      <CustomIcons name="calendar-today" class="" />
      <h3 class="font-[600] text-[#152A3C] text-[12px] leading-[26px] ml-[6px]">
        Cierre: {{ event.endDate }} {{ event.closingTime }}
      </h3>
    </div>
    <!-- Contenedor de imagen -->
    <div class="h-24 mt-4 rounded-md overflow-hidden">
      <img
        :src="event.logo"
        alt="Imagen del evento"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Información del evento -->
    <p class="mt-4 text-[#152A3C] text-sm font-semibold">N°{{ event.id }} - {{ event.name }}</p>
    <p class="text-[#86868A] text-sm font-medium my-2">
      {{ event.description }}
    </p>
    <div>
      <p class="text-[#152A3C] text-[12px] font-medium my-2">
        {{ goodType.get(event.goodType)}}
      </p>
    </div>
    <!-- Botón -->
    <div class="flex justify-end">
      <button
        @click="handleEventsDetail(event)"
        class="px-4 py-2 text-sm text-[#388EBF] font-medium hover:text-white hover:bg-bluePrimary rounded-md"
      >
        Ver detalle
      </button>
    </div>
  
    <!-- <div class="flex max-w-[273px] h-[56px] mt-[12px] mb-[12px] gap-x-[8px]"> -->
    <!--   <div class="h-24"> -->
    <!--     <img -->
    <!--       :src="event.logo" -->
    <!--       alt="Imagen del auto" -->
    <!--       class="w-full h-full object-cover rounded-md" -->
    <!--     /> -->
    <!--   </div> -->
    <!--   <p -->
    <!--     class="text-[14px] md:text-[15px] xl:text-[18px] font-[600] text-[#152A3C] ml-[8px]" -->
    <!--   > -->
    <!--     {{ event.id }} -->
    <!--   </p> -->
    <!-- </div> -->
    <!-- <p -->
    <!--   class="h-[56px] text-[#86868A] text-[14px] md:text-[15px] xl:text-[18px] font-[500]" -->
    <!-- > -->
    <!--   {{ event.description }} -->
    <!-- </p> -->
    <!-- <div class="flex justify-end"> -->
    <!--   <button -->
    <!--     @click="handleEventsDetail(event)" -->
    <!--     class="mt-[12px] px-4 py-2 text-[14px] text-[#388EBF] font-[500] hover:text-white hover:bg-bluePrimary hover:rounded-[8px]" -->
    <!--   > -->
    <!--     Ver detalle -->
    <!--   </button> -->
    <!-- </div> -->
  </div>
</template>
