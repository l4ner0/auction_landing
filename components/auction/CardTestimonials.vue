<script setup lang="ts">
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
interface Comment {
  name: string;
  authoProfileImageUrl: any;
  rating: number;
  comment: string;
}
const comments = ref<Comment[]>([]);

const staticComments = [
  {
    imageUrl: "/comments/TESTIMONIOS-WEB-Ana-sofia.png",
  },
  { imageUrl: "/comments/TESTIMONIOS-WEB-Carlos-Ramirez.png" },
  { imageUrl: "/comments/TESTIMONIOS-WEB-Jose-pacheco.png" },
  { imageUrl: "/comments/TESTIMONIOS-WEB-Maria-lopez.png" },
];
const fetchComments = async () => {
  try {
    const { data } = await useLandingAPI<Comment[]>("/landing/get-comments", {
      default: () => [],
    });
    comments.value = data.value;
  } catch (error) {
    console.error("Error al cargar comentarios", error);
  }
};
await fetchComments();
const generateStars = (rating: number) => {
  return Array.from({ length: rating });
};
</script>
<template>
  <section class="flex justify-center mt-[50px] mb-[60px]">
    <Carousel
      :plugins="[Autoplay({ delay: 3500, stopOnInteraction: false })]"
      class="w-full max-w-[1440px] px-[20px] md:px-[80px]"
      :opts="{ align: 'center', loop: true }"
    >
      <CarouselContent class="max-w-[1280px]">
        <CarouselItem
          v-for="(staticComment, index) in staticComments"
          :key="index"
          class="w-full md:basis-1/2 lg:basis-[374px]"
        >
          <img
            :src="staticComment.imageUrl"
            alt="Foto"
            class="w-full h-[246px] object-cover"
          />
          <!-- <div -->
          <!--   class="p-4 bg-[#F3F8FC] rounded-[8px] w-full md:w-[350px] h-auto lg:h-[246px] text-left flex flex-col" -->
          <!-- > -->
          <!--   <div -->
          <!--     class="flex gap-x-[12px] text-left border-b-[1px] border-b-[#C7E0F0]" -->
          <!--   > -->
          <!--     <img -->
          <!--       :src="comment.authoProfileImageUrl.path" -->
          <!--       alt="Foto" -->
          <!--       class="rounded-full mb-[8px] w-[50px] h-[50px]" -->
          <!--     /> -->
          <!--     <div> -->
          <!--       <h3 -->
          <!--         class="text-[#152A3C] font-[600] text-[20px] leading-[23px] pt-[7px]" -->
          <!--       > -->
          <!--         {{ comment.name }} -->
          <!--       </h3> -->
          <!--       <div class="flex"> -->
          <!--         <img -->
          <!--           v-for="(star, index) in generateStars(comment.rating)" -->
          <!--           :key="index" -->
          <!--           src="/assets/img/star.png" -->
          <!--           alt="Star" -->
          <!--           class="w-[15px] h-[15px]" -->
          <!--         /> -->
          <!--       </div> -->
          <!--     </div> -->
          <!--   </div> -->
          <!--   <p -->
          <!--     class="text-[#152A3C] font-[400] font-Roboto text-[14px] leading-[20px] px-[4px] py-[8px]" -->
          <!--   > -->
          <!--     {{ comment.comment }} -->
          <!--   </p> -->
          <!-- </div> -->
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </section>
</template>
