<script setup lang="ts">
import CustomIcons from "@/components/ui/custom-icons/CustomIcons.vue";
import OfferFilters from "~/components/offer/OfferFilter.vue";
import FilterModal from "~/components/offer/FilterModal.vue";
import type { IEventLItem } from "@/types/Event";
import { ref, computed } from "vue";
import OfferList from "@/components/offer/OfferList.vue";
import dayjs from "dayjs";
import { useToast } from "~/components/ui/toast";
import AttachmentsModal from "~/components/event/AttachmentsModal.vue";
import Button from "~/components/ui/button/Button.vue";
import { Trash } from "lucide-vue-next";

// Base state and hooks
const { toast } = useToast();
const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();

// UI control states
const isFiltersOpen = ref(false);
const showAttachmentsModal = ref(false);
const selectedAttachments = ref<Array<{ id: string; name: string; path: string }>>([]);

// Event data
const eventDetail = ref<any>({});
const now = dayjs();

// Pagination & filtering
const page = ref(1);
const limit = ref(4);
const selectedSort = ref("appraisal-asc");
const filterOptions = ref(
  `[{"field": "event.id", "type": "like", "value": "${route.params.eventId}"}]`
);
const sortOptions = ref(
  JSON.stringify([{ field: "initialValue", order: "asc" }])
);

// Sort options
const sortOptionsList = [
  { label: "Menor a mayor", value: "appraisal-asc" },
  { label: "Mayor a menor", value: "appraisal-desc" },
  { label: "Ordenar de A-Z", value: "title-asc" },
];

// Fetch event details
const { data: eventList } = await useLandingAPI<IEventLItem | {}>(
  `/event-management/get-event-detail-for-participant?id=${route.params.eventId}`,
  { default: () => ({}) }
);
eventDetail.value = eventList.value;

// Fetch offers
const { data } = await useLandingAPI<any>(
  `/offer-management/find-offers-paginated-for-participant`,
  {
    query: {
      filterOptions,
      page,
      limit,
      sortOptions,
    },
    default: () => ({ data: [], count: 0, limit: 4 }),
  }
);

// Computed properties
const formattedEndDate = computed(() =>
  dayjs(eventDetail.value.endDate).format("DD/MM/YY")
);
const startedAt = computed(() => dayjs(eventDetail.value.startedAt));
const formatTime = computed(() => {
  const time = eventDetail.value.closingTime;
  if (!time) return "";
  return dayjs(`2000-01-01 ${time}`).format("h:mm A");
});
const offerData = computed(() => data.value.data || []);
const hasOffers = computed(() => offerData.value.length > 0);

const sevenDaysBefore = startedAt.value.subtract(7, "day");
const isAfterSevenDays = now.isAfter(sevenDaysBefore);
const isDisabled = computed(() => !isAfterSevenDays);

// Methods
const copyURL = async () => {
  try {
    const fullPath = window?.location.href;
    await navigator.clipboard.writeText(fullPath);
    toast({
      title: "Copiado",
      description: "Enlace copiado al portapapeles",
      variant: "default",
      class: "border-blue-500",
    });
  } catch (error) {
    console.error("Cannot copy URL:", error);
  }
};

const toggleFilters = () => {
  isFiltersOpen.value = !isFiltersOpen.value;
};

const openAttachmentsModal = () => {
  selectedAttachments.value = eventDetail.value.termsAndConditionsFiles || [];
  showAttachmentsModal.value = true;
};

const auditorioURL = () => {
  window.location.href = `${config.public.appUrl}/dashboard/participant/virtual-auditorium`;
};

const cleanSort = () => {
  selectedSort.value = "appraisal-asc";
  sortOptions.value = JSON.stringify([{ field: "initialValue", order: "asc" }]);
};

const onSort = async () => {
  const sortMapping = {
    "appraisal-asc": [{ field: "initialValue", order: "asc" }],
    "appraisal-desc": [{ field: "initialValue", order: "desc" }],
    "title-asc": [{ field: "title", order: "asc" }],
  };

  sortOptions.value = JSON.stringify(
    sortMapping[selectedSort.value as keyof typeof sortMapping] ||
      sortMapping["appraisal-asc"]
  );
};

const onSearch = async (event: {
  rangePrice: Ref<number[]>;
  generalSearch: Ref<string>;
  selectedCategory: Ref<{ id: string } | null>;
  selectedSubCategory: Ref<{ id: string } | null>;
}) => {
  const staticFilters = [
    { field: "event.id", type: "like", value: route.params.eventId },
    { field: "quickSearch", type: "like", value: event.generalSearch.value },
    {
      field: "carBrand.id",
      type: "equal",
      value: event.selectedCategory.value?.id || "",
    },
    {
      field: "carModel.id",
      type: "equal",
      value: event.selectedSubCategory.value?.id || "",
    },
  ];

  if (event.rangePrice.value) {
    staticFilters.push({
      field: "currentValue",
      type: "between",
      value: event.rangePrice.value as any,
    });
  }

  filterOptions.value = JSON.stringify(staticFilters);
  
  // Close mobile filters if they were open
  if (isFiltersOpen.value) {
    isFiltersOpen.value = false;
  }
};
</script>

<template>
  <div>
    <!-- Header Section -->
    <section class="px-[20px] md:px-[80px] max-w-[1440px] mx-auto">
      <div class="mt-[48px] mb-[32px]">
        <Button variant="ghost" @click="router.back">
          <CustomIcons
            name="BackArrow"
            class="w-[16px] h-[16px] text-[#2872A1]"
          />
          <span
            class="ml-[8px] text-[#2872A1] text-[20px] font-[700] leading-[24px]"
            >DETALLE DEL EVENTO</span
          >
        </Button>
      </div>

      <!-- Event Details Card -->
      <div class="max-w-[1280px] mx-auto grid gap-[16px] mt-[32px] mb-[48px]">
        <div
          class="bg-white border border-[#F3F8FC] rounded-lg px-[16px] py-[24px] max-w-[1280px] shadow-[0px_0px_4px_0px_#0000001A]"
        >
          <div class="flex flex-wrap justify-between items-center mb-[24px]">
            <div class="flex items-center">
              <CustomIcons name="calendar-today" class="mb-[1px]" />
              <h3
                class="gap-x-[6px] text-[#152A3C] text-[14px] leading-[26px] ml-[6px] mr-[4px] font-[400]"
              >
                <span class="font-[600]">Cierra: </span>
                {{ formattedEndDate }}
              </h3>
              <CustomIcons name="time" class="mb-[1px]" />
              <h3
                class="gap-x-[6px] font-[400] text-[#152A3C] text-[14px] leading-[26px] ml-[6px]"
              >
                <span class="font-[600]">Hora </span>
                {{ formatTime }}
              </h3>
            </div>
            <button
              class="flex items-center gap-x-[6px] text-[#20445E] hover:underline"
              :disabled="isDisabled"
              :class="{
                'hover:no-underline opacity-50 cursor-not-allowed': isDisabled,
              }"
              @click="copyURL"
            >
              <CustomIcons name="link" />
              Compartir enlace
            </button>
          </div>

          <h3
            class="font-[600] text-[#000000] text-[28px] leading-[36px] mb-[8px]"
          >
            {{ eventDetail.name }}
          </h3>
          <p
            class="text-[#000000] text-[14px] leading-[24px] mt-[8px] mb-[29px]"
          >
            {{ eventDetail.description }}
          </p>

          <div class="flex flex-col md:flex-row gap-x-[16px] gap-y-[12px]">
            <Button
              type="button"
              @click="openAttachmentsModal"
              class="text-[#F97316] bg-white px-4 py-2 rounded hover:bg-[#F97316] hover:text-white"
            >
              Términos y condiciones
            </Button>
            <Button
              type="button"
              @click="auditorioURL"
              class="text-[16px] font-[600] bg-white text-primary border border-primary hover:bg-accent"
            >
              Auditorio virtual
            </Button>
          </div>
        </div>
      </div>
      <AttachmentsModal
        v-model:is-open="showAttachmentsModal"
        :attachments="selectedAttachments"
      />
    </section>

    <!-- Mobile Filters Button -->
    <div class="px-[20px] md:px-[80px] xl:hidden flex justify-end p-4">
      <Button
        @click="toggleFilters"
        class="text-[16px] font-[600] bg-white text-primary border border-primary hover:bg-accent"
      >
        Filtros
        <svg
          class="ml-2"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.75 2H2.25V3.5318L5.75 7.5315V15.316L7.24997 14.9141V6.9682L4.21497 3.5H11.7845L8.74997 6.9682V14.5122L10.25 14.1103V7.531L13.75 3.5318V2Z"
            fill="currentColor"
          ></path>
        </svg>
      </Button>
    </div>

    <!-- Mobile Filters Modal -->
    <Teleport to="body">
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <FilterModal 
        
          v-if="isFiltersOpen" 
          @close="toggleFilters" 
          @on-search="onSearch"
        />
      </transition>
    </Teleport>

    <!-- Main Content Section -->
    <section
      class="flex flex-col xl:flex-row justify-center md:px-[80px] max-w-[1440px] mx-auto mb-32"
    >
      <!-- Desktop Filters Sidebar - Only visible on XL screens and up -->
      <div class="hidden xl:block pr-[24px]">
        <OfferFilters @on-search="onSearch" />
      </div>

      <div
        class="w-[100%] max-w-[952px] h-auto lg:h-[1368px] border-2 border-[#F3F8FC] rounded-[8px] mx-[20px] md:mx-[0px]"
      >
        <!-- Sort Controls -->
        <div
          class="flex h-[72px] items-center text-[#152A3C] justify-between mb-[16px] gap-x-[10px] px-[16px]"
        >
          <Button
            variant="outline"
            @click="cleanSort()"
            size="icon"
            title="Limpiar filtros"
          >
            <Trash class="w-4 h-4" />
          </Button>
          <div class="flex items-center gap-x-[10px]">
            <label class="font-[600] text-[14px] md:text-[16px]"
              >Ordenar por:</label
            >
            <Select v-model="selectedSort" @update:model-value="onSort">
              <SelectTrigger
                class="w-[150px] md:w-[200px] text-[12px] md:text-[16px] font-[400] border border-[#F3F8FC] rounded-md p-2 text-[#152A3C]"
              >
                <SelectValue placeholder="Menor a mayor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="(option, i) in sortOptionsList"
                  :key="i"
                  :value="option.value"
                  class="flex justify-center text-center rounded-[8px] font-[500] text-[12px] md:text-[14px] p-[5px] text-[#152A3C] hover:bg-[#F1F5F9]"
                >
                  {{ option.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- Offers List or Empty State -->
        <template v-if="hasOffers">
          <OfferList :offers="offerData" class="cursor-pointer" />
        </template>

        <div
          v-else
          class="flex flex-col items-center justify-center p-8 h-[400px]"
        >
          <CustomIcons name="search" class="w-16 h-16 text-gray-300 mb-4" />
          <h3 class="text-xl font-semibold text-gray-700 mb-2">
            No se encontraron ofertas
          </h3>
          <p class="text-gray-500 text-center max-w-md">
            No hay ofertas disponibles para este evento. Intente modificar los
            filtros de búsqueda o vuelva más tarde.
          </p>
        </div>

        <!-- Pagination -->
        <CustomPagination
          v-if="hasOffers"
          class="mt-5 mb-[19px] px-[16px]"
          :total="data.count"
          :limit="data.limit"
          v-model:page="page"
        />
      </div>
    </section>

    <!-- Toast Notification -->
    <Toaster />
  </div>
</template>

<style scoped>
::placeholder {
  color: #94a3b8;
}

@media (max-width: 1279px) {
  .filter-enter-active,
  .filter-leave-active {
    transition: all 0.3s ease;
  }

  .filter-enter-from,
  .filter-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>