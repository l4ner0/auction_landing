<script setup lang="ts">
import CustomIcons from "@/components/ui/custom-icons/CustomIcons.vue";
import type { IEventLItem } from "@/types/Event";
import type { OfferListItem } from "@/types/Offer";
import dayjs from "dayjs";
import AttachmentsModal from "~/components/event/AttachmentsModal.vue";
import type { CarouselApi } from "~/components/ui/carousel";
import Thumbnails from "~/components/ui/thumbnails/Thumbnails.vue";
import { useToast } from "~/components/ui/toast";

const { toast } = useToast();
const router = useRouter();
const route = useRoute();
const activeTab = ref<string>("info");
const eventDetail = ref<any>({});
const now = dayjs();
const lastOffer = ref(0);
const showAttachmentsModal = ref(false);
const selectedAttachments = ref<
  Array<{ id: string; name: string; path: string }>
>([]);

interface MediaFile {
  path: string;
  name: string;
}
const { data: eventList } = await useLandingAPI<IEventLItem | {}>(
  `/event-management/get-event-detail-for-participant?id=${route.params.eventId}`,
  {
    default: () => ({}),
  },
);
eventDetail.value = eventList.value;
const { data: offerDetail } = await useLandingAPI<any>(
  `/offer-management/get-offer-detail-for-participant?id=${route.params.offerId}`,
  {
    query: {},
    default: () => ({}),
  },
);
offerDetail.value = offerDetail.value;
const formattedEndDate = computed(() =>
  dayjs(eventDetail.value.endDate).format("DD/MM/YY"),
);

lastOffer.value = getLastBidOffer(offerDetail.value.bids);

const formatTime = computed(() => {
  const time = eventDetail.value.closingTime;
  if (!time) return "";
  return dayjs(`2000-01-01 ${time}`).format("h:mm A");
});
const formattedFinishDate = computed(() =>
  dayjs(offerDetail.value.endTime).format("DD/MM/YY HH:mm:ss"),
);

const startedAt = computed(() => dayjs(eventDetail.value.startedAt));

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
  } catch {
    console.error("Cannot copy");
  }
};
const annexesFiles = computed(() => offerDetail.value.annexesFiles || []);
const downloadFile = (filePath: string, fileName: string) => {
  fetch(filePath)
    .then((response) => {
      if (response.ok) {
        return response.blob();
      } else {
        throw new Error("Failed to fetch file");
      }
    })
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(link.href);
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};
const attachedMedia = computed(
  () =>
    offerDetail.value.attachedFiles?.map((file: MediaFile) => ({
      src: file.path,
      alt: file.name,
      isVideo: file.path.endsWith(".mp4"),
    })) || [],
);
const selectedMedia = ref(attachedMedia.value[0]);
const selectMedia = (media: { src: string; alt: string; isVideo: boolean }) => {
  selectedMedia.value = media;
};
const showArrows = computed(() => attachedMedia.value.length > 3);
const isLooping = computed(() => attachedMedia.value.length >= 3);
const useCountDown = (offer: Ref<OfferListItem>) => {
  const endMiliseconds = computed(() => getRemainingTime(offer.value.endTime));
  const countDownkey = ref(0);
  watch(offer, (newVal) => {
    countDownkey.value += 1;
  });
  return { countDownkey, endMiliseconds };
};
const { countDownkey, endMiliseconds } = useCountDown(offerDetail);

const targetSegment = computed(() => {
  const urlPath = route.path;
  const parts = urlPath.split("/");
  return parts[4];
});

const virtualAuditoriumUrl = () => {
  window.location.href = `${useRuntimeConfig().public.appUrl}/dashboard/participant/virtual-auditorium/offers/${targetSegment.value}`;
};

const sevenDaysBefore = startedAt.value.subtract(7, "day");

const isAfterSevenDays = now.isAfter(sevenDaysBefore);

const isDisabled = computed(() => {
  if (!isAfterSevenDays) {
    return true;
  }
  return false;
});

const openAttachmentsModal = () => {
  selectedAttachments.value = eventDetail.value.termsAndConditionsFiles || [];
  showAttachmentsModal.value = true;
};
</script>

<template>
  <div>
    <section class="px-[20px] md:px-[80px] max-w-[1440px] mx-auto">
      <div class="mt-[48px] mb-[32px]">
        <Button variant="ghost" @click="router.back">
          <CustomIcons
            name="BackArrow"
            class="w-[16px] h-[16px] text-[#2872A1]"
          />
          <span
            class="ml-[8px] text-[#2872A1] text-[20px] font-[700] leading-[24px]"
            >DETALLE DE LA OFERTA</span
          >
        </Button>
      </div>
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

          <div class="flex flex-col md:flex-row gap-x-[16px]">
            <Button
              type="button"
              @click="openAttachmentsModal"
              class="text-[#F97316] bg-white px-4 py-2 rounded hover:bg-[#F97316] hover:text-white"
              >Términos y condiciones</Button
            >
            <Button
              type="button"
              @click="virtualAuditoriumUrl"
              class="text-[16px] font-[600] bg-white text-primary border border-primary hover:bg-accent"
              >Auditorio virtual</Button
            >
            <Toaster />
          </div>
        </div>
      </div>
      <AttachmentsModal
        v-model:is-open="showAttachmentsModal"
        :attachments="selectedAttachments"
      />
    </section>

    <section
      class="w-full flex justify-center max-w-[1440px] px-[20px] md:px-[80px] xl:mx-auto"
    >
      <div
        class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2"
      >
        <!-- Columna Izquierda: Carrusel de imágenes -->
        <Thumbnails :files="offerDetail.attachedFiles" class="" />

        <!-- Columna Central: Imagen grande y detalles del auto -->

        <!-- Columna Derecha: Cuenta regresiva y detalles adicionales -->
        <div class="w-full flex flex-col shadow-[0px_0px_4px_0px_#0000001A]">
          <Countdown
            :key="countDownkey"
            v-slot="{ days, hours, minutes, seconds, totalSeconds }"
            :time="endMiliseconds"
          >
            <div
              class="text-[#FFFFFF] text-[14px] leading-[16.41px] font-[500] bg-[#20445E] rounded-t-[8px] text-center py-[23px]"
            >
              <p class="pb-[16px]">Cierra en:</p>
              <!-- Contador en cajitas -->
              <div class="flex items-center space-x-2 justify-center">
                <div
                  class="w-[42px] md:w-[51px] h-[30px] md:h-[34px] border border-white rounded-[8px] flex items-center justify-center text-[14px] md:text-[16px] relative"
                >
                  {{ days }}<span class="text-[#F6313C] ml-[3px]">d</span>
                </div>
                <span>:</span>
                <div
                  class="w-[42px] md:w-[51px] h-[30px] md:h-[34px] border border-white rounded-[8px] flex items-center justify-center text-[14px] md:text-[16px] relative"
                >
                  {{ hours }}<span class="text-[#F6313C] ml-[3px]">h</span>
                </div>
                <span>:</span>
                <div
                  class="w-[42px] md:w-[51px] h-[30px] md:h-[34px] border border-white rounded-[8px] flex items-center justify-center text-[14px] md:text-[16px] relative"
                >
                  {{ minutes }}<span class="text-[#F6313C] ml-[3px]">m</span>
                </div>
                <span>:</span>
                <div
                  class="w-[42px] md:w-[51px] h-[30px] md:h-[34px] border border-white rounded-[8px] flex items-center justify-center text-[14px] md:text-[16px] relative"
                >
                  {{ seconds }}<span class="text-[#F6313C] ml-[3px]">s</span>
                </div>
              </div>
            </div>
          </Countdown>
          <div class="px-[16px] pb-[16px]">
            <div class="flex items-center pt-[20px] pb-[8px] gap-x-[6px]">
              <CustomIcons name="calendar-today" />
              <p class="text-[#454446] text-[14px] font-[600] leading-[26px]">
                Fecha de cierre
                <span class="font-[400]"> {{ formattedFinishDate }}</span>
              </p>
            </div>
            <h2
              class="text-[#152A3C] text-[17px] lg:text-[18px] xl:text-[20px] font-[700] pb-[16px] uppercase tracking-tight"
            >
              {{ offerDetail.title }} - MARCA:{{
                offerDetail.carBrand.name
              }}
              MODELO:{{ offerDetail.carModel.name }} - AÑO
              {{ offerDetail.year }}
            </h2>
            <div
              class="grid text-center gap-y-[8px] font-[400] text-[#152A3C] text-[14px] mt-4"
            >
              <p class="leading-[24px]">Última oferta:</p>
              <p class="font-[700] text-[22px] md:text-[24px] leading-[32px]">
                USD ${{ offerDetail.currentValue }}
              </p>
              <p class="leading-[20px]">
                Próxima oferta sugerida:
                <span class="font-bold"
                  >USD {{ offerDetail.currentValue + 50 }},00</span
                >
              </p>
              <!-- <button class="text-[#2872A1] font-[500] my-2">
                Estimar importes y comisiones
              </button> -->
            </div>
            <div class="flex justify-end rounded-[8px] pt-[32px]">
              <Button
                @click="virtualAuditoriumUrl"
                class="text-[14px] md:text-[16px] py-[15px] px-[24px]"
              >
                Haz tu pre oferta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div
      class="flex flex-col max-w-[1440px] px-[20px] md:px-[80px] mt-[32px] mb-[48px] xl:mx-auto"
    >
      <!-- Tabs -->
      <div
        class="flex justify-center font-[500] text-[14px] md:text-[16px] gap-4 border-b-2 pb-[16px] border-[#D0D0D1] mt-[8px] md:mt-[32px]"
      >
        <button
          :class="activeTab === 'info' ? 'text-bluePrimary' : 'text-[#D0D0D1]'"
          @click="activeTab = 'info'"
          class="hover:underline hover:underline-offset-[22px] hover:text-bluePrimary leading-[24px]"
        >
          Información
        </button>
        <button
          :class="
            activeTab === 'description' ? 'text-bluePrimary' : 'text-[#D0D0D1]'
          "
          @click="activeTab = 'description'"
          class="hover:underline hover:underline-offset-[22px] hover:text-bluePrimary leading-[24px]"
        >
          Descripción
        </button>
        <button
          :class="activeTab === 'annex' ? 'text-bluePrimary' : 'text-[#D0D0D1]'"
          @click="activeTab = 'annex'"
          class="hover:underline hover:underline-offset-[22px] hover:text-bluePrimary leading-[24px]"
        >
          Anexos
        </button>
      </div>
      <div
        class="grid text-[#152A3C] font-[500] text-[14px] md:text-[16px] mt-[24px] pb-[48px] px-[24px] leading-[26px] gap-y-[12px]"
      >
        <div v-if="activeTab === 'info'">
          <p>
            Ubicación:
            <span class="font-[400]">{{
              offerDetail.address.district.city.state.name
            }}</span>
          </p>
          <p>
            Organización:
            <span class="font-[400]">{{
              offerDetail.event.organization.name
            }}</span>
          </p>
          <p class="font-[400]">
            Oferta inicial
            <span class="text-[32px] font-[700] leading-[40px]"
              >${{ offerDetail.initialValue }}</span
            >
          </p>
        </div>
        <div
          v-if="activeTab === 'description'"
          class="text-[14px] text-[#000000] text-justify"
        >
          <p>{{ offerDetail.description }}</p>
        </div>
        <div v-if="activeTab === 'annex'">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-[24px] gap-y-[24px] text-[14px] font-[600] text-[#20445E]"
          >
            <div
              v-for="(file, index) in annexesFiles"
              :key="file.id"
              class="text-ellipsis overflow-hidden flex items-center justify-between rounded-[8px] bg-[#F3F8FC] w-full max-w-[389px] h-[70px] px-[12px]"
            >
              <p class="truncate-2-lines w-[80%]">{{ file.name }}</p>
              <button @click="downloadFile(file.path, file.name)">
                <CustomIcons name="Download-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
::placeholder {
  color: #94a3b8;
}
</style>
