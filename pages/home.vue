<script setup lang="ts">
import CustomIcons from "@/components/ui/custom-icons/CustomIcons.vue";
import EventList from "~/components/event/EventList.vue";
import Advantage from "@/components/landing/Advantage.vue";
import Questions from "@/components/landing/Questions.vue";
import Contact from "@/components/landing/Contact.vue";
import CarruselHome from "@/components/landing/CarruselHome.vue";
import dayjs from "dayjs";
import type { IEventLItem } from "~/types/Event";
import { goodType } from "~/constants/events";

const router = useRouter();
const handleAllEvents = async () => {
  router.push("/events");
};
const { data } = await useLandingAPI<any>(
  "/event-management/find-events-paginated-for-participant",
  {
    query: {
      limit: 8,
    },
    default: () => ({}),
  },
);
const filteredEvents = computed(() =>
  data.value.data.map((item: IEventLItem) => ({
    name: item.name,
    endDate: dayjs(item.endDate).format("DD MMM, YYYY"),
    closingTime: `${item.closingTime}:00`,
    id: item.id,
    logo: item.organization.logoFiles.length
      ? item.organization.logoFiles[0].path
      : "/default-logo.png",
    description: item.description,
    goodType: item.goodType,
  })),
);
const handleGoodTypeDetail = async (goodType: string) => {
  router.push(`/events?goodType=${goodType}`);
};
</script>

<template>
  <div>
    <CarruselHome />
    <section class="grid justify-center pt-[24px] md:pt-[48px] pb-[32px]">
      <div
        class="max-w-[1440px] px-[20px] sm:px-[40px] md:px-[80px] text-[14px] md:text-[15px] lg:[18px] xl:text-[18px]"
      >
        <h2
          class="text-bluePrimary text-[15px] md:text-[18px] leading-[24px] font-[700] mb-8"
        >
          NAVEGA POR LAS CATEGORÍAS
        </h2>
        <div
          class="xl:max-h-[172px] max-w-[1280px] text-[#2872A1] font-[500] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 text-center"
        >
          <button
            v-for="[id, name] in goodType"
            :key="id"
            class="flex flex-col items-center mt-[8px] leading-[28px] gap-y-[16px] hover:bg-slate-100 rounded-sm"
            @click="() => handleGoodTypeDetail(id)"
            rel="noopener noreferrer"
          >
            <CustomIcons :name="id" class="w-[56px] h-[56px]" />
            <p>{{ name }}</p>
          </button>
        </div>
      </div>
    </section>
    <section class="grid justify-items-center pt-[48px] pb-[32px]">
      <div
        class="w-full max-w-[1440px] px-[20px] sm:px-[40px] md:px-[40px] lg:px-[80px] flex-col md:flex-row lg:flex-row flex items-center justify-between text-[18px] gap-y-[8px] md:gap-y-[0px]"
      >
        <h2 class="text-bluePrimary leading-[24px] text-left font-[700]">
          Destacados del día
        </h2>
        <button
          @click="handleAllEvents()"
          class="flex items-center gap-x-[10px] text-[14px] font-[500] text-[#388EBF]"
        >
          Ver todos los eventos
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 2.66666L7.06 3.60666L10.78 7.33332H2.66667V8.66666H10.78L7.06 12.3933L8 13.3333L13.3333 7.99999L8 2.66666Z"
              fill="#388EBF"
            />
          </svg>
        </button>
      </div>
      <div
        class="w-full max-w-[1440px] px-[20px] md:px-[80px] flex justify-center"
      >
        <EventList v-if="filteredEvents.length" :events="filteredEvents" />
      </div>
    </section>
    <!-- <div></div> -->
    <Advantage />
    <Questions id="questions" />
    <Contact id="contact" />
  </div>
</template>
