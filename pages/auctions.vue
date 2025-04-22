<template>
    <section>
        <div class="grid justify-center">
            <div class="max-w-[1280px] mx-[20px] md:mx-[80px]">
                <h1 class="text-center text-bluePrimary mb-[0px] mt-[32px] md:my-[32px] text-[32px] sm:text-[48px] font-[700] leading-[40px] sm:leading-[70px]">
                    Subastas
                </h1>
            </div>
            <div class="lg:max-w-[1280px] grid grid-cols-1 lg:grid-cols-2 gap-y-[24px] lg:gap-x-[24px] justify-center mx-[20px] sm:mx-[40px] lg:mx-[80px] mt-[0px] lg:my-[48px]">
                <div class="max-w-[625px]">
                    <h2 class="text-left text-[#2872A1] mt-[24px] lg:mt-[31px] mb-[16px] text-[16px] lg:text-[18px] font-[700]">
                        SUBASTAS</h2>
                    <h1 class="text-left text-bluePrimary mb-[28px] text-[32px] lg:text-[48px] font-[700] leading-[40px] lg:leading-[70px]">
                        Subastas online seguras y
                        <span class="text-[#F6313C]">de confianza</span>
                    </h1>
                    <p class="lg:max-w-[625px] text-[#68686C] text-[14px] lg:text-[16px] font-[400] text-justify leading-[28px]">
                        En DeOcasion, nos especializamos en subastas online, proporcionando una forma emocionante y eficiente de adquirir productos al mejor precio. Ofrecemos una amplia gama de artículos, desde bienes de consumo hasta artículos especializados, con un proceso de subasta justo y competitivo. Priorizamos la seguridad de nuestros usuarios mediante rigurosos protocolos para proteger tu información y garantizar transacciones seguras, asegurando una experiencia confiable y sin preocupaciones.
                    </p>
                </div>
                <div class="lg:max-w-[632px] h-auto lg:h-[438px]">
                    <img class="h-auto object-cover" src="/assets/img/subastas_1.png" alt="Nosotros">
                </div>
            </div>
        </div>
        <div class="grid justify-center">
            <div class="lg:max-w-[1280px] grid grid-cols-1 lg:grid-cols-2 gap-y-[24px] lg:gap-x-[24px] justify-center mx-[20px] sm:mx-[40px] lg:mx-[80px] my-[48px]">
                <div class="lg:order-none order-last lg:max-w-[632px] h-auto lg:h-[438px]">
                    <img class="h-auto object-cover" src="/assets/img/subastas_2.png" alt="Nosotros">
                </div>
                <div class="max-w-[625px]">
                    <h2 class="text-left text-[#2872A1] mt-[24px] lg:mt-[48px] mb-[16px] text-[16px] lg:text-[18px] font-[700]">SUBASTAS</h2>
                    <h1 class="text-left text-bluePrimary mb-[28px] text-[32px] lg:text-[48px] font-[700] leading-[40px] lg:leading-[70px]">Respaldo financiero
                        <span class="text-[#F6313C]">sólido</span>
                    </h1>
                    <p class="lg:max-w-[625px] text-[#68686C] text-[14px] lg:text-[16px] font-[400] text-justify leading-[28px]">
                        Contamos con un respaldo financiero con más de 16 años en el sector financiero, lo que avala nuestra estabilidad y
                        capacidad para ofrecer un servicio excepcional. Esta sólida base financiera nos permite
                        innovar y mejorar continuamente, asegurando que nuestros usuarios disfruten de una
                        experiencia de subasta sin igual.
                    </p>
                </div>
            </div>
        </div>
        <CardAuctions />
        <div class="">
            <h2 class="text-center text-[#2872A1] pt-[48px] mb-[10px] text-[16px] lg:text-[18px] font-[700]">TESTIMONIOS
            </h2>
            <h1
                class="text-center text-bluePrimary text-[38px] md:text-[48px] font-[700] leading-[40px] md:leading-[70px] mx-[20px] md:mx-[0px]">
                Lo que
                dicen <span class="text-[#F6313C]">los clientes</span></h1>
            <CardTestimonials />
        </div>
    </section>
</template>
<script setup lang="ts">
import CardAuctions from '~/components/auction/CardAuctions.vue';
import CardTestimonials from '@/components/auction/CardTestimonials.vue';
</script>
