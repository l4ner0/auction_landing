<script setup lang="ts">
import Autoplay from "embla-carousel-autoplay";
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { watchOnce } from "@vueuse/core";

interface Card {
  title: string;
  description: string;
  id: string;
  initialValue: string;
  updatedAt: string;
  district: string;
  attachedFiles: { id: string; name: string; path: string }[];
  bids: any[];
  endTime: string;
  address: any;
}
interface MediaFile {
  id: string;
  path: string;
  name: string;
}
[];

const emblaMainApi = ref<CarouselApi>();
const emblaThumbnailApi = ref<CarouselApi>();
const props = defineProps<{ offer: Card }>();
const { offer } = toRefs(props);
const router = useRouter();
const route = useRoute();
const selectedIndex = ref(0);
const images = ref<MediaFile[]>(offer.value.attachedFiles);
const lastOffer = ref(0);
function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  const newIndex = emblaMainApi.value.selectedScrollSnap();
  if (selectedIndex.value !== newIndex) {
    selectedIndex.value = newIndex;
    emblaThumbnailApi.value.scrollTo(newIndex);
  }
}
function onThumbClick(index: number) {
  if (!emblaMainApi.value) return;
  emblaMainApi.value.scrollTo(index);
  selectedIndex.value = index;
}

const useCountDown = (offer: Ref<Card>) => {
  const endMiliseconds = computed(() => getRemainingTime(offer.value.endTime));
  const countDownkey = ref(0);
  watch(offer, (newVal) => {
    countDownkey.value += 1;
  });
  return { countDownkey, endMiliseconds };
};
const { countDownkey, endMiliseconds } = useCountDown(offer);

lastOffer.value = getLastBidOffer(offer.value.bids);
watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return;
  emblaMainApi.on("select", onSelect);
  emblaMainApi.on("reInit", onSelect);
});

const timeRemaining = ref("00:00:00");
let timer: number | undefined;

const calculateTimeRemaining = () => {
  try {
    const now = new Date().getTime();
    const target = new Date(offer.value.updatedAt).getTime();

    if (isNaN(target)) {
      console.error("Invalid updatedAt date format");
      timeRemaining.value = "00:00:00";
      clearInterval(timer);
      return;
    }

    const difference = target - now;

    if (difference <= 0) {
      timeRemaining.value = "00:00:00";
      clearInterval(timer);
      return;
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    timeRemaining.value = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  } catch (error) {
    console.error("Error calculating time remaining:", error);
    timeRemaining.value = "00:00:00";
    clearInterval(timer);
  }
};

onMounted(() => {
  calculateTimeRemaining();
  timer = setInterval(calculateTimeRemaining, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const handleOfferDetail = (offer: Card) => {
  router.push(`/events/${route.params.eventId}/offers/${offer.id}`);
};

const scrollPrev = () => {
  if (emblaMainApi.value) {
    emblaMainApi.value.scrollPrev();
  }
};

const scrollNext = () => {
  if (emblaMainApi.value) {
    emblaMainApi.value.scrollNext();
  }
};
</script>

<template>
  <div
    class="flex flex-col sm:flex-row items-center justify-center bg-white border border-[#F3F8FC] rounded-lg shadow w-full max-w-[920px] mx-auto my-4 p-4 sm:p-6 transition-shadow hover:shadow-lg gap-4"
  >
    <div class="relative rounded-lg overflow-hidden">
      <button
        @click="scrollPrev"
        class="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 p-2 text-white rounded-full text-[40px] hover:text-slate-200"
      >
        &#8249;
        <!-- Símbolo de flecha izquierda -->
      </button>
      <Carousel
        :plugins="[Autoplay({ delay: 5000, stopOnInteraction: false })]"
        :opts="{ align: 'start', loop: true }"
        @init-api="(val) => (emblaMainApi = val)"
        class="relative max-h-[500px] sm:w-[365px] h-[200px] sm:h-[239px] rounded-lg"
      >
        <CarouselContent class="rounded-lg">
          <CarouselItem
            v-for="(image, index) in images"
            :key="index"
            class="pl-0"
          >
            <!-- <NuxtLink
              :to="image.path"
              target="_blank"
              rel="noopener noreferrer"
              class="block h-full"
            > -->
            <div class="h-full">
              <Card class="h-full">
                <CardContent
                  class="flex h-full items-center justify-center p-0"
                >
                  <img
                    :src="image.path"
                    alt="Imagen de carrusel"
                    class="w-full sm:w-[365px] h-[200px] sm:h-[239px] object-cover rounded-lg mb-4 sm:mb-0"
                  />
                </CardContent>
              </Card>
            </div>
            <!-- </NuxtLink> -->
          </CarouselItem>
        </CarouselContent>
        <Carousel
          class="hidden md:flex absolute space-x-2 bottom-[32px] w-full justify-center ml-[50%] translate-x-[-50%]"
          @init-api="(val) => (emblaThumbnailApi = val)"
        >
          <CarouselContent class="flex gap-x-[6px] ml-0">
            <CarouselItem
              v-for="(image, index) in images"
              :key="index"
              class="pl-0 basis-1/7 cursor-pointer"
              @click="onThumbClick(index)"
            >
              <div
                class="w-3 h-3 rounded-full border border-white transition-colors duration-300"
                :class="{
                  'bg-white': index === selectedIndex,
                  'bg-transparent': index !== selectedIndex,
                }"
              ></div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </Carousel>
      <button
        @click="scrollNext"
        class="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 p-2 text-white rounded-full text-[40px] hover:text-slate-200"
      >
        &#8250;
        <!-- Símbolo de flecha derecha -->
      </button>
    </div>

    <!-- <img
      :src="offerImage"
      alt="Imagen de la oferta"
      class="w-full sm:w-[365px] h-[200px] sm:h-[239px] object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6"
    /> -->
    <div class="w-full sm:flex-1 flex flex-col h-full justify-between">
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 sm:mb-0"
      >
        <Countdown
          :key="countDownkey"
          v-slot="{ totalDays, days, hours, minutes, seconds, totalSeconds }"
          :time="endMiliseconds"
        >
          <span
            class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-[#EFF6FF] text-[#2563EB] mb-2 sm:mb-0"
          >
            Cierra en {{ String(days).padStart(2, "0")
            }}<span class="ml-[3px]">días</span>
          </span>
        </Countdown>
        <div class="flex items-center text-sm text-[#454446]">
          <CustomIcons name="location" class="mr-2" />
          {{ offer.address.district.city.state.name }}
        </div>
      </div>
      <div>
        <NuxtLink
          class="font-bold text-[#152A3C] text-xl sm:text-2xl leading-tight hover:underline uppercase"
          :to="`/events/${route.params.eventId}/offers/${offer.id}`"
        >
          {{ offer.title }}
        </NuxtLink>

        <!-- Title and Brand/Model -->
        <div class="offer-card__info mt-4">
          <p class="offer-card__brand-model">
            <span class="brand">Marca:</span> {{ props.offer.carBrand.name }} |
            <span class="model">Modelo:</span> {{ props.offer.carModel.name }}
          </p>
        </div>
        <p class="text-[#000000] text-sm sm:text-base leading-relaxed">
          {{ offer.description }}
        </p>
      </div>

      <div class="pt-4 border-t border-[#E6E6E7]">
        <h4 class="font-semibold text-sm text-[#1E3A8A] mb-1">Valor actual</h4>
        <p class="font-bold text-2xl sm:text-3xl text-[#1E3A8A] leading-tight">
          USD$
          {{ offer.currentValue }}
        </p>
      </div>
    </div>
  </div>
</template>
