<template>
  <div>
    <div
      class="grid justify-center justify-items-center md:justify-items-start"
    >
      <div class="max-w-[1280px] mx-4 sm:mx-6 md:mx-10 lg:mx-20">
        <h2
          class="text-center md:text-left text-[#2872A1] mt-6 md:mt-12 mb-4 text-sm sm:text-base lg:text-lg font-bold"
        >
          SUBASTAS
        </h2>
        <h1
          class="text-center md:text-left text-bluePrimary mb-4 sm:mb-8 text-xl sm:text-2xl md:text-4xl font-bold leading-8 sm:leading-10 md:leading-[70px]"
        >
          Todos los
          <span class="text-[#F6313C]">Eventos</span>
        </h1>
      </div>
      <form
        @submit.prevent="fetchFilteredEvents"
        class="flex flex-col justify-center lg:flex-row text-bluePrimary text-sm mx-4 sm:mx-6 md:mx-10 lg:mx-20 gap-4 py-4 md:py-8"
      >
        <div class="flex flex-col sm:flex-row sm:gap-4 w-full">
          <!-- Tipo de Bien -->
          <div class="flex flex-col w-full sm:w-auto">
            <label class="font-medium text-sm mb-2">Tipo de bien</label>
            <Select v-model="selectedTipoBien">
              <SelectTrigger
                class="w-full sm:w-56 lg:w-72 leading-6 text-base font-normal px-3 py-2 border border-[#CBD5E1] rounded-md text-[#94A3B8]"
              >
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="option in goodTypeOptions"
                  :key="option.id"
                  :value="option.id"
                  @Change="fetchFilteredEvents"
                  class="text-center rounded-md font-normal text-sm p-2 text-[#152A3C] hover:bg-[#F1F5F9]"
                >
                  {{ option.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <!-- Tipo de Evento -->
          <div class="flex flex-col w-full sm:w-auto">
            <label class="font-medium text-sm mb-2">Tipo de evento</label>
            <Select v-model="selectedTipoEvento">
              <SelectTrigger
                class="w-full sm:w-56 lg:w-72 leading-6 text-base font-normal px-3 py-2 border border-[#CBD5E1] rounded-md text-[#94A3B8]"
              >
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="option in eventTypesOptions"
                  :key="option.id"
                  :value="option.id"
                  class="text-center rounded-md font-normal text-sm p-2 text-[#152A3C] hover:bg-[#F1F5F9]"
                >
                  {{ option.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <!-- Organización -->
          <div class="flex flex-col w-full sm:w-auto">
            <label class="font-medium text-sm mb-2">Organización</label>
            <Select v-model="selectedOrganizacion">
              <SelectTrigger
                class="w-full sm:w-56 lg:w-72 leading-6 text-base font-normal px-3 py-2 border border-[#CBD5E1] rounded-md text-[#94A3B8]"
              >
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="option in organizationOptions"
                  :key="option.id"
                  :value="option.id"
                  class="text-center rounded-md font-normal text-sm p-2 text-[#152A3C] hover:bg-[#F1F5F9]"
                >
                  {{ option.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div class="flex items-end mt-4 lg:mt-0">
          <Button
            type="button"
            @click="resetFilters"
            class="text-base font-semibold bg-white text-primary border border-primary hover:bg-accent px-4 py-2 rounded-md"
          >
            Borrar filtros
          </Button>
        </div>
      </form>
      <section
        class="w-full max-w-[1440px] px-4 sm:px-6 md:px-10 lg:px-20 mb-4 sm:mb-8 md:mb-16"
      >
        <div class="flex justify-center">
          <EventList v-if="filteredEvents.length" :events="filteredEvents" />
          <div
            v-else
            class="flex flex-col items-center my-5 md:my-11 mb-6 md:pb-11"
          >
            <img
              src="/assets/img/warning-events.png"
              alt="Warning"
              class="w-full max-w-[280px] sm:max-w-[320px] max-h-[200px] sm:max-h-[224px] mb-2 sm:mb-4"
            />
            <p
              class="text-sm sm:text-base text-center text-[#20445E] font-medium"
            >
              ¡Upss! Por ahora no existen eventos con el filtro seleccionado
            </p>
          </div>
        </div>
        <CustomPagination
          :total="totalEvents"
          v-model:page="page"
          :limit="limit"
        />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import EventList from "~/components/event/EventList.vue";
import { eventType, goodType } from "@/constants/events";
import CustomPagination from "~/components/ui/custom-pagination/CustomPagination.vue";
import dayjs from "dayjs";
import { EventStatus, type IEventLItem } from "~/types/Event";
import { routerKey, type LocationQueryValue } from "vue-router";

const route = useRoute();
const router = useRouter();

const queryGoodType = ref(route.query.goodType || "");
const queryEventType = ref(route.query.eventType || "");
const queryOrganization = ref(route.query.organization || "");
const goodTypeOptions = Array.from(goodType).map(([id, name]) => ({
  id,
  name,
}));
const eventTypesOptions = Array.from(eventType).map(([id, name]) => ({
  id,
  name,
}));

const apiOrganization = useApiOrganization();

const { data: organizationOptions } =
  await apiOrganization.viewOrganizationIdAndNameList();

const selectedTipoBien = ref(queryGoodType.value);
const selectedTipoEvento = ref(queryEventType.value);
const selectedOrganizacion = ref(queryOrganization.value);
const filterOptions = ref(
  JSON.stringify([
    { field: "goodType", type: "equal", value: selectedTipoBien.value },
    { field: "type", type: "equal", value: selectedTipoEvento.value },
    {
      field: "status",
      type: "in",
      value: [EventStatus.Published, EventStatus.InProgress],
    },
    {
      field: "organization.id",
      type: "equal",
      value: selectedOrganizacion.value,
    },
  ]),
);
const page = ref(1);
const limit = ref(12);
const { data } = await useLandingAPI<any>(
  "/event-management/find-events-paginated-for-participant",
  {
    query: {
      filterOptions,
      page,
      limit,
    },
    default: () => ({}),
  },
);
const totalEvents = computed(() => data.value.count);

const filteredEvents = computed(() =>
  data.value.data.map((item: IEventLItem) => ({
    name: item.name,
    endDate: dayjs(item.finishedAt).format("DD MMM, YYYY"),
    closingTime: dayjs(item.finishedAt).format("HH:mm"),
    id: item.id,
    logo: item.organization.logoFiles.length
      ? item.organization.logoFiles[0].path
      : "/default-logo.png",
    description: item.description,
    goodType: item.goodType,
  })),
);
const fetchFilteredEvents = async () => {
  filterOptions.value = JSON.stringify([
    {
      field: "goodType",
      type: "equal",
      value: selectedTipoBien.value,
    },
    {
      field: "type",
      type: "equal",
      value: selectedTipoEvento.value,
    },
    {
      field: "organization.id",
      type: "equal",
      value: selectedOrganizacion.value,
    },
  ]);
  router.push({
    query: {
      goodType: selectedTipoBien.value,
      eventType: selectedTipoEvento.value,
      organization: selectedOrganizacion.value,
    },
  });
};
const resetFilters = () => {
  selectedTipoBien.value = "";
  selectedTipoEvento.value = "";
  selectedOrganizacion.value = "";
  filterOptions.value = "[]";
};

watch([selectedTipoBien, selectedTipoEvento, selectedOrganizacion], () => {
  fetchFilteredEvents();
});
</script>
