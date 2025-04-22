<script setup lang="ts">
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useMediaQuery, watchOnce } from "@vueuse/core";

const emblaMainApi = ref<CarouselApi>();
const emblaThumbnailApi = ref<CarouselApi>();
//const images = ref<{ imageUrl: string; url: string }[]>([]);
const selectedIndex = ref(0);
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
watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return;
  emblaMainApi.on("select", onSelect);
  emblaMainApi.on("reInit", onSelect);
});
const appUrl = useRuntimeConfig().public.appUrl;
const isMobile = useMediaQuery("(max-width: 768px)");
const fetchCarouselImages = async () => {
  // try {
  //   const { data } = await useLandingAPI<any>("/landing/get-carrousel", {
  //     default: () => [],
  //   });
  //   images.value = data.value;
  // } catch (error) {
  //   console.error("Error al cargar las imágenes del carrusel", error);
  // }

  images.value = isMobile.value ? mobileImages : desktopImages;
};

const desktopImages = [
  {
    imageUrl: {
      name: "CUARTA-SUBASTA-ONLINE.png",
      path: `/sliders/CUARTA-SUBASTA-ONLINE.png`,
    },
    url: `/events/EVE-4`,
  },
  {
    imageUrl: {
      name: "SLIDER-WEB-6807X1867-PX-1.png",
      path: `/sliders/SLIDER-WEB-6807X1867-PX-1.png`,
    },
    url: `/auctions`,
  },
  {
    imageUrl: {
      name: "SLIDER-WEB-6807X1867-PX-2.png",
      path: `/sliders/SLIDER-WEB-6807X1867-PX-2.png`,
    },
    url: `${appUrl}/auth/sign-in`,
  },
  {
    imageUrl: {
      name: "SLIDER-WEB-1200X500-PX-2.png",
      path: `/sliders/SLIDER-WEB-1200X500-PX-2.png`,
    },
    url: `${appUrl}/auth/sign-in`,
  },

  {
    imageUrl: {
      name: "SLIDER-WEB-1200X500-PX-1.png",
      path: `/sliders/SLIDER-WEB-1200X500-PX-1.png`,
    },
    url: `/events`,
  },
];

const mobileImages = [
  {
    imageUrl: {
      name: "CUARTA-SUBASTA-ONLINE.png",
      path: `/sliders/CUARTA-SUBASTA-ONLINE.png`,
    },
    url: `/events/EVE-4`,
  },
  {
    imageUrl: {
      name: "FORMATO-MOBILE-1080X600PX-1.png",
      path: `/sliders/FORMATO-MOBILE-1080X600PX-1.png`,
    },
    url: `/events`,
  },
  {
    imageUrl: {
      name: "FORMATO-MOBILE-1080X600PX-2.png",
      path: `/sliders/FORMATO-MOBILE-1080X600PX-2.png`,
    },
    url: `${appUrl}/auth/sign`,
  },

  //Video
  {
    imageUrl: {
      name: "FORMATO-MOBILE-1080X600PX-3.png",
      path: `/sliders/FORMATO-MOBILE-1080X600PX-3.png`,
    },
    url: `${appUrl}/auth/sign`,
  },

  {
    imageUrl: {
      name: "FORMATO-MOBILE-1080X600PX-5.png",
      path: `/sliders/FORMATO-MOBILE-1080X600PX-5.png`,
    },
    url: `/auctions`,
  },

  {
    imageUrl: {
      name: "FORMATO-MOBILE-1080X600PX-6.png",
      path: `/sliders/FORMATO-MOBILE-1080X600PX-6.png`,
    },
    url: `${appUrl}/auth/sign`,
  },
];

const images = computed(() => {
  if (isMobile.value) return mobileImages;
  return desktopImages;
});

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

await fetchCarouselImages();
</script>

<template>
  <section class="w-full flex justify-center relative">
    <button
      @click="scrollPrev"
      class="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 p-2 text-white rounded-full text-[100px] hover:text-slate-200"
    >
      &#8249;
      <!-- Símbolo de flecha izquierda -->
    </button>
    <Carousel
      :plugins="[Autoplay({ delay: 3500, stopOnInteraction: false })]"
      :opts="{ align: 'start', loop: true }"
      @init-api="(val) => (emblaMainApi = val)"
      class="relative"
    >
      <CarouselContent>
        <CarouselItem
          v-for="(image, index) in images"
          :key="index"
          class="pl-0"
        >
          <NuxtLink
            :to="image.url"
            target="_blank"
            rel="noopener noreferrer"
            class="block"
          >
            <div>
              <Card>
                <CardContent class="flex items-center justify-center p-0">
                  <img
                    :src="image.imageUrl.path"
                    alt="Imagen de carrusel"
                    class="w-full h-auto object-contain"
                  />
                </CardContent>
              </Card>
            </div>
          </NuxtLink>
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
      class="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 p-2 text-white rounded-full text-[100px] hover:text-slate-200"
    >
      &#8250;
      <!-- Símbolo de flecha derecha -->
    </button>
  </section>
</template>
